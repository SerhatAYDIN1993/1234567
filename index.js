
const fs = require('fs');
const http = require('http');
const express = require('express');
const ayarlar = require('./ayarlar.json');
const moment = require('moment');
const app = express();
const ms = require('parse-ms');
const db = require('quick.db');
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });

var botadı = ayarlar.botadı;


const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

var botadı = ayarlar.botadı;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();
client.vote = new Map();
client.on("warn", info => console.log(info));

client.on("error", console.error)

client.on("ready", () => {
    console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${botadı} Başlatıldı...`)
  })

  fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`\n${files.length} Adet Genel Komutu Yüklenecek.`);
    files.forEach(f => {/*CODEMASTER*/
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen Genel Komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
                    });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
         /*CODEMASTER*/   reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    return permlvl;/*CODEMASTER CAPTAİN MAMİ*/
};

  
 

client.login(ayarlar.token)
