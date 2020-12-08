const { MessageEmbed } = require("discord.js");
const { COLOR, botadı } = require("../ayarlar.json");
const db = require('quick.db');

      exports.run = async (client, message, args) => {
        var p = await db.fetch(`prefix2`)
        var prefix = await db.fetch(`prefix.${message.guild.id}`) || p;
    let embed = new MessageEmbed().setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setDescription(`- **${botadı} -   :no_entry:  HATALI İŞLEM YAPILDI.  :no_entry:\n\n:notes: Ses Kanalında Değilsin.Ses Kanalına Girmen Gerekmektedir.:exclamation: **`)
      return message.channel.send(embed);
    }

    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setDescription(`**${botadı}\nÇalma Listesi Boş.**`);
      return message.channel.send(embed);
    }
    
     if(isNaN(args[0])) {
      embed.setDescription(`**${botadı}\nÇıkarmak İstediğin Şarkının Liste Numarasını Gir.**`)
      return message.channel.send(embed)
    }
   
    if(args[0] > serverQueue.songs.length) {
      embed.setDescription(`**${botadı}  ⚠ DİKKAT UYARI VAR..\n\n:musical_note: Çalma Listesinde Şarkı Olmadığı İçin Şarkı Çıkartma İşlemi Yapılamıyor...\n:white_check_mark: Çalma Listesine Şarkı Eklemek İçin** _***${prefix}çal ŞARKIADI***_  **Yazabilirsin.**`)
      return message.channel.send(embed)
    }
    
    
    serverQueue.songs.splice(args[0] - 2, 2)
    embed.setDescription(`**${botadı}\nŞarkı Çalma Listesinden Çıkartıldı...**`)
    return message.channel.send(embed)
  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Düşür','DÜŞÜR'],
  };
  exports.help = {
    name: "düşür",
    description: "Şarkıyı Çalma Listesinden Çıkartır...",
  usage: '&çalan'  
  };