const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const { COLOR, botadı } = require("../ayarlar.json");

      exports.run = async (client, message, args) => {
        var p = await db.fetch(`prefix2`)
        var prefix = await db.fetch(`prefix.${message.guild.id}`) || p;
        let embed = new MessageEmbed()
        .setColor(COLOR);
    

      const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setDescription(`- **${botadı} -   :no_entry:  HATALI İŞLEM YAPILDI.  :no_entry:\n\n:notes: Ses Kanalında Değilsin.Ses Kanalına Girmen Gerekmektedir.:exclamation: **`)
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  embed.setDescription(`- **${botadı} -  :white_check_mark:  İŞLEM BAŞARILI..\n\n:musical_note: Şarkı Kaldığın Yerden Devam Ediyor.**`)
  return message.channel.send(embed)
 }
    embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:warning: Herhangi Bir Şarkı Durdurulmamış.**`)
    message.channel.send(embed)
    
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Devam','Devamet','DEVAMET','DevamEt'],
    };
    exports.help = {
      name: "devamet", 
      description: "Durdurulan Şarkıyı Devam Ettirir.",
    usage: '&çalan'  
    };