const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js");
const formatSeconds = require("ms");
const db = require("quick.db");
const { QUEUE_LIMIT, COLOR, botadı } = require("../ayarlar.json");

module.exports = {

  
    async play(song, message) {
      var p = await db.fetch(`prefix2`)
      var prefix = await db.fetch(`prefix.${message.guild.id}`) || p;
    const queue = message.client.queue.get(message.guild.id);
let embed = new MessageEmbed()
.setColor(COLOR);


if (!song) {
  message.client.queue.delete(message.guild.id);
  embed.setDescription(`- **${botadı} -  :white_check_mark:  İŞLEM BAŞARILI..\n\nÇalma Listesi Temizlendi.\nÇalma Listesine Tekrardan Şarkı Eklemek İçin**  _${prefix}çal ŞARKIADI_  **Yazabilirsin.**\n**Diğer Komutları** _***${prefix}p*** veya ***${prefix}play ŞARKIADI***_`);
  return queue.textChannel
    .send(embed)
    .catch(console.error);
}

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send(`- **${botadı} - \nBu Videoda Telif Hakkı Var.**`);
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);
  
    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    embed.setTitle(`- **${botadı} -  :microphone2: Şarkı Başladı**`)   
    embed.setDescription(`\n${song.title}`)
    
    
    queue.textChannel
      .send(embed)
      .catch(err => message.channel.send(`- **${botadı} -  ŞARKI AÇILMIYOR...`));
  }
};
