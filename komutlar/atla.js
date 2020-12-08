const { MessageEmbed } = require("discord.js")
const { COLOR, botadı } = require("../ayarlar.json");
const a = require('../index.js')
const db = require('quick.db')

      exports.run = async(client, message, args) => {
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
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:musical_note: Çalma Listesinde Şarkı Olmadığı İçin Şarkı Açamıyorum...\n:white_check_mark: Çalma Listesine Şarkı Eklemek İçin** _***${prefix}çal ŞARKIADI***_  **Yazabilirsin.**`)
      return message.channel.send(embed);
    }
     if(!args[0]) {
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:pencil2: Çalmak İstediğin Şarkının Numarasını Girin. :question:**`)
      return message.channel.send(embed)
    }
    
      if(isNaN(args[0])) {
      embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:pencil2:  Lütfen Yalnızca Sayısal Değerler Kullanın. :question:**`)
      return message.channel.send(embed)
    }
    
  if(serverQueue.songs.length < args[0]) {
    embed.setDescription(`- **${botadı} -  ⚠ DİKKAT UYARI VAR..\n\n:white_check_mark:İstediğin Şarkı Çalma Listesinde Bulunmamaktadır.Çalma Listesine Şarkı Eklemek İçin** _***${prefix}çal ŞARKIADI***_  **Yazabilirsin.**`)
    return message.channel.send(embed)  
                                         }
    serverQueue.songs.splice(0, Math.floor(args[0] - 1))
    serverQueue.connection.dispatcher.end()
    
    embed.setDescription(`- **${botadı} -  :white_check_mark: İŞLEM BAŞARILI..\n:notes: Seçtğiniz Şarkıya Atlandı.**`)
    message.channel.send(embed)
    
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Atla','ATLA'],
    category: "Müzik"

    };
    exports.help = {
    name: "atla",
    description: "İstediğiniz Şarkıya Geçer.",
    usage: '&atla numara'  
    };