const { MessageEmbed } = require("discord.js");
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

    if (!serverQueue) {
      embed.setDescription(`- **${botadı} -   ⚠ DİKKAT UYARI VAR..\n\n:musical_note: Çalma Listesinde Şarkı Olmadığı İçin Listeleme İşlemi Yapılamıyor...\n:white_check_mark: Çalma Listesine Şarkı Eklemek İçin** _***${prefix}çal ŞARKIADI***_  **Yazabilirsin.**`)
            return message.channel.send(embed);
    }

    embed.setDescription(`- **${botadı} -  :white_check_mark:  İŞLEM BAŞARILI..**\n
      ${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join(`\n`)}`,
      { split: true }
    );
    
    message.channel.send(embed);
  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Liste','LİSTE'],
  };
  exports.help = {
    name: "liste",
    description: "Çalma Listesini Gösterir...",
  usage: '&çalan'  
  };