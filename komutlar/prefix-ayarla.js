const Discord = require('discord.js');
const db = require('quick.db')
const { ayarlar, } = require('../ayarlar.json')

exports.run = async(client, message, args) => {
    
    var p = await db.fetch(`prefix2`)
    var prefix = await db.fetch(`prefix.${message.guild.id}`) || p;

 if(args[0] === "oto") {
  if(!args[1]) return message.channel.send(`Prefix Belirt.`);
  await db.set(`prefix2`, args[1])
  message.reply(`Prefix **${args[1]}** Olarak Ayarladım!`);
 }
   if(args[0] === "sıfırla") {
    await db.delete(`prefix2`)
    message.channel.send(`Sıfırlandı.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Prefix-Belirle","p-b","P-B"],
};

exports.help = {
  name: 'prefix-belirle',
  description: 'haftalık limiti.',
  usage: 'haftalıklimit',
};