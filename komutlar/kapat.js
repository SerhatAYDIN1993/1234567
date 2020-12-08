const { MessageEmbed } = require("discord.js")
const { COLOR, botadı } = require("../ayarlar.json");
const discord = require("discord.js");
const db = require('quick.db');

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

    if (!serverQueue) {
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:octagonal_sign: Sesli Odada Olmadığım İçin İşlem Yapılamıştır...\n:white_check_mark: Çalma Listesine Şarkı Eklemek İçin** _***${prefix}çal ŞARKIADI***_  **Yazabilirsin.**`)
      return message.channel.send(embed);
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    
    message.member.voice.channel.leave();
    return message.channel.send(`deneme`);
  }

    


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['AYRIL','Ayrıl'],
  };
  exports.help = {
    name: "ayrıl",
    description: "Botun Şarkı Çalmasını Kapatır.",
  usage: '&çalan'  
  };