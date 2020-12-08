
const { MessageEmbed } = require("discord.js")
const { QUEUE_LIMIT, COLOR, botadı } = require("../ayarlar.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {
if(args[0] === 'ayarla') {
        const asd = await db.fetch(`muzik.SunucuID=${message.guild.id}`);
        if(asd) { 
            const ayarlanmış = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Zaten Daha Önceden Müzik Kanalını Ayarlamışsın.\nÖnce Sıfırlaman Lazım.\n**__Örnek Kullanım :__ \n${prefix}müzik-kanalı sıfırla** Yaparak Ayarlanmış Olan Kanalı Sıfırlayabilirsin.\nDaha Önce Ayarladığın Kanal : ${client.channels.cache.get(asd)}`);
          return message.channel.send(ayarlanmış);}
        const ment = message.mentions.channels.first()
        if(!args[1]) { 
            const kanaletiket = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Müzik Kanalı İçin Kanal Etiketlemen Lazım.\n**__Örnek Kullanım :__ \n${prefix}müzik-kanalı ayarla #KANAL-ADI** Yaparak Müzik Kanalını Ayarlayabilirsin.`);
          return message.channel.send(kanaletiket);}
        if(!ment) { 
            const kanalyok = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Etiketlediğin kanalı bulamıyorum.`)
          return message.channel.send(kanalyok);}
        db.set(`muzik.SunucuID=${message.guild.id}`, ment.id)  
            const kanalayarlandı = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Müzik Komutlarının Kullanılacağı Kanal ${ment} Olarak Ayarlandı.`)
         message.channel.send(kanalayarlandı); 
        }

          if(args[0] === 'sıfırla') {
            const asd = await db.fetch(`muzik.SunucuID=${message.guild.id}`)
            if(!asd) { 
                const kanalayarlı = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Sistemin kanalı zaten ayarlı değil.`)
              return message.channel.send(kanalayarlı);} 
            db.delete(`muzik.SunucuID=${message.guild.id}`)
                 const kanalayarlı = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Müzik Komutlarının Kullanılacağı Kanal Sıfırlandı.`)
               message.channel.send(kanalayarlı);
            } 

        };


        exports.conf = {
            enabled: true,
            guildOnly: true,
            aliases: ['muzik-kanalı','Muzik-Kanalı','Müzik-Kanalı'],
        }
        
        exports.help = {
            name: 'müzik-kanalı',
            description: 'Müzik komutlarını gösterir.',
            usage: 'müzik komutları',
        }