const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')

exports.run = async (client, message, args) => {
    var p = await db.fetch(`prefix2`)
    var prefix = await db.fetch(`prefix.${message.guild.id}`) || p;

    if(args[0] === 'müzik') {
        var deneme = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField(`[<Müzik Komutları>]`,`------`, true)
        .addField(`Şarkı Çalmak İçin `,`**Kullanım şekli =>** ${prefix}çal ŞARKI-ADI / ${prefix}play ŞARKI-ADI / ${prefix}p ŞARKI-ADI`)
        .addField(`Sırada Ki Şarkıya Geçmek İçin`,`**Kullanım şekli =>** ${prefix}geç / ${prefix}skip `)
        .addField(`Şarkıyı Durdurmak İçin`,`**Kullanım şekli =>** ${prefix}durdur / ${prefix}pause`)
        .addField(`Çalan Şarkıyı Görmek İçin`,`**Kullanım şekli =>** ${prefix}çalan / ${prefix}`)
        .addField(`Çalma Listesini Görmek İçin`,`**Kullanım şekli =>** ${prefix}liste / ${prefix}list`)
        .addField(`-`,`-`)
        .addField(`[<Destek Ekibi Komutları>]`,`------`)
        .addField(`Destek Kaydına Bir Kullanıcı Ekleme`,`**Kullanım şekli =>** ${prefix}ekle @KULLANICI-ADI`)
        .addField(`Destek Kaydından Bir Kullanıcı Çıkarma`,`**Kullanım şekli =>** ${prefix}çıkar @KULLANICI-ADI`)
        .addField(`Destek Kaydının Çözümlenmesi`,`**Kullanım şekli =>** ${prefix}kayıt-çözümlendi @KULLANICI-ADI`)
        .addField(`Destek Kaydını Açma`,`**Kullanım şekli =>** ${prefix}kaydı-aç @KULLANICI-ADI`)
        .addField(`Destek Kaydını Kapatma`,`**Kullanım şekli =>** ${prefix}kaydı-kapat @KULLANICI-ADI`)
        .setFooter(`${client.user.username} | Destek Sistemi`)
        return message.channel.send(deneme)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['otorol.'],
  };
  
  exports.help = {
    name: 'yardım',
    description: 'Sunucuya Giren Herkese Rol Verir.',
    usage: 'oto-rol @Rol-Adı'
  };