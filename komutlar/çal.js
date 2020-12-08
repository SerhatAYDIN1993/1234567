const { MessageEmbed } = require("discord.js")
const { Util } = require("discord.js");
const db = require('quick.db');
const { YOUTUBE_API_KEY, QUEUE_LIMIT, COLOR, botadı } = require("../ayarlar.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const moment = require('moment');
const ms = require('parse-ms');

const { play } = require("../system/music.js");

  exports.run = async (client, message, args) => {
    var p = await db.fetch(`prefix2`)
    var prefix = await db.fetch(`prefix.${message.guild.id}`) || p;
    let embed = new MessageEmbed()
    .setColor(COLOR);

    //FIRST OF ALL WE WILL ADD ERROR MESSAGE AND PERMISSION MESSSAGE
    if (!args.length) {
      //IF AUTHOR DIDENT GIVE URL OR NAME
      embed.setDescription(`- **${botadı} -   :no_entry:  HATALI İŞLEM YAPILDI.  :no_entry:\n\n:white_check_mark: Örnek Kullanım : ${prefix}çal ŞARKI-İSMİ**`)
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;
        
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setDescription(`- **${botadı} -   :no_entry:  HATALI İŞLEM YAPILDI.  :no_entry:\n\n:notes: Ses Kanalında Değilsin.Ses Kanalına Girmen Gerekmektedir.:exclamation: **`)
      return message.channel.send(embed);
    }

    //WE WILL ADD PERMS ERROR LATER :(

    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:musical_note: Çalma Listesinde Şarkı Olmadığı İçin Şarkı Açamıyorum...\n:white_check_mark: Çalma Listesine Şarkı Eklemek İçin** _***${prefix}çal ŞARKIADI***_  **Yazabilirsin.**`)
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };
    
    const voteConstruct = {
      vote: 0,
      voters: []
    }

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
        songData = await ytdl.getInfo(args[0]);
        song = {
          title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          durationm: songData.minutes,
         };
      } catch (error) {
        if (message.include === "copyright") {
          return message
            .reply("**DİKKAT** : Telifli Şarkı Çalıyor...")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        const result = await youtube.searchVideos(targetsong, 1);
        songData = await ytdl.getInfo(result[0].url);
        song = {
          title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          durationm: songData.minutes,
          duration: songData.seconds
        };
      } catch (error) {
        console.log(error)
        if(error.errors[0].domain === "usageLimits") {
          embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\nYouTube API Sınırı Doldu Ve Şuan da Yeni Müzik Eklenemiyor.\nLütfen Daha Fazla Denemeyin.\nBot Yetkilisine Durumu Bildirin veya 24 Saat Bekleyiniz...**`)
          embed.setFooter(`${message.author.tag} tarafından istendi.[${moment().format('DD-MM-YYYY HH:mm:ss')}]`)
          return message.channel.send(embed);
        }
      }
    }

    if (serverQueue) {
        if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
         embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\nÇalma Listesine _${QUEUE_LIMIT}_ Adet Şarkı Ekleyebilirsin. _Limit Doldu._**`)
         return message.channel.send(embed);
    }
      serverQueue.songs.push(song);
      embed.setDescription(`- **${botadı} -  ✅ İŞLEM BAŞARILI..\n\n:notes: ${song.title} Adlı Şarkı Listeye Eklendi.**`)
      
      return serverQueue.textChannel
        .send(embed)
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);
       message.client.vote.set(message.guild.id, voteConstruct);
    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`${botadı} Ses Kanalına Katılamadı : ${error}`);
        message.client.queue.delete(message.guild.id);
        return message.channel
          .send({
            embed: {
              description: `😭 | ${botadı} Ses Kanalına Katılamadı : ${error}`,
              color: "#ff2050"
            }
          })
          .catch(console.error);
      }
    }
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Çal','ÇAL','p','play','P','Play','PLAY'],
    };
    exports.help = {
    name: "çal",
    description: "Belirttiğin isimde şarkı çalar",
    usage: '&atla numara'  
    };