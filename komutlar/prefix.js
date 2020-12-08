const { MessageEmbed, Discord }= require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  message.delete();
let a = ayarlar.prefix
    let p = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
 let o = await db.fetch(`prefix.${message.guild.id}`)
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send();
 
if(args[0] === "ayarla") {
if(!args[1]) return message.channel.send();
db.set(`prefix.${message.guild.id}`, args[1])
message.channel.send();
}
    if(args[0] === "sıfırla") {
    if(!a) {
       return message.channel.send();
    }
    db.set(`prefix.${message.guild.id}`, a)
   return message.channel.send();
  }
  
 if(!args[0]) return message.channel.send();

  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['p'],
    permLevel: 0
};
  
  exports.help = {
    name: 'prefix',
    description: 'Komuttan sonra yazdığınız şekli prefix olarak dbye kaydedip message.jsde eğer prefixle başlamassa return mantık bu',
    usage: 'prefix <giriceğiniz şey>'
};