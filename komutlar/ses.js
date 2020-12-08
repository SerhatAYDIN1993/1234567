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
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:musical_note: Çalma Listesinde Şarkı Olmadığı İçin Ses Ayarı İşlemi Yapılamıyor...\n:white_check_mark: Çalma Listesine Şarkı Eklemek İçin** _***${prefix}çal ŞARKIADI***_  **Yazabilirsin.**`)
      return message.channel.send(embed);
    }
    
    if(!args[0]) {
      embed.setDescription(`- **${botadı} -  :white_check_mark:  İŞLEM BAŞARILI..\n\n:loud_sound: Mevcut Ses Seviyesi : ${serverQueue.volume}**`)
      return message.channel.send(embed)
    }
    
    if(isNaN(args[0])) {    
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:pencil2: Lütfen Sadece Sayı Giriniz... :question:**`)
      return message.channel.send(embed)
    }
    if(args[0] < 20) {
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\nSes Seviyesini Minimum __20__ Yapabilirsiniz...** :joy:`)
      return message.channel.send(embed)
    }
    if(args[0] > 200) {
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\nSes Seviyesini Maksimum __200__ Yapabilirsiniz...** :joy:`)
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 200)
    embed.setDescription(`- **${botadı} -  :white_check_mark:  İŞLEM BAŞARILI..\n\n:loud_sound: Ses Seviyesi : ${args[0]} Olarak Ayarlandı...**`)
    message.channel.send(embed)
    

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Ses','SES'],
  };
  exports.help = {
    name: "ses",
    description: "Şarkının ses seviyesini yönetme",
  usage: '&çalan'  
  };