
const { MessageEmbed } = require("discord.js")
const { QUEUE_LIMIT, COLOR, botadı } = require("../ayarlar.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {
    var p = await db.fetch(`prefix2`)
    var prefix = await db.fetch(`prefix.${message.guild.id}`) || p;
    const komutlogkanal = db.fetch(`muzik.SunucuID=${message.guild.id}`);
    const kanal = client.channels.cache.get(komutlogkanal)
    let embed = new MessageEmbed()
    .setColor(COLOR);
 

            //////////LOG KANAL AYARLAMA//////////

      embed.setDescription(`- **${botadı} -  :clipboard:  KOMUTLAR..\n
      \n1) ${prefix}çal ŞARKIADI =  Yazdığınız Şarkıyı Çalma Listesine Ekler Ve Çalar.
      \n2) ${prefix}durdur =  Yazdığınızda Şarkıyı Durdurur.
      \n3) ${prefix}devamet = Yazdığınızda Şarkıyı Kaldığı Yerden Başlatır.
      \n4) ${prefix}geç = Yazdığınız Zaman Bir Sonraki Şarkıya Gçer.
      \n5) ${prefix}çalan =  Yazdığınızda Çalan Şarkının Adını Gösterir.
      \n6) ${prefix}liste = Yazdığınız Zaman Çalma Listesini Gösterir.
      \n7) ${prefix}tekrarla = Yazdığınız Zaman Çalma Listesi Bittiği Zaman En Baştan Çalmaya Devam Eder.(Tekrar Yazdığınızda Döngü Kapanır.).
      \n8) ${prefix}ses SEVİYE =  Botun Ses Seviyesi Ayarlanır.Minimum 20 , Maksimum 200'dür.
      \n9) ${prefix}ayrıl =  Yazdığınız Zaman Çalma Listesi Temizlenir Ve Bot Odadan Çıkar.
      \n- **${botadı} -  :clipboard: Müzik Komutu Kanal Ayarları*`);
      return message.channel.send(embed);
  
};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['muzik','Muzik','Müzik'],
}

exports.help = {
    name: 'müzik',
    description: 'Müzik komutlarını gösterir.',
    usage: 'müzik komutları',
}