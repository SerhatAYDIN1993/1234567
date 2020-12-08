const Discord = require('discord.js');
const db = require('quick.db');
const { surum, prefix, surum1 } = require('../ayarlar.json');



module.exports = async(client, message, args) => {
   client.user.setStatus('dnd') 
  // dnd == rahatsız etme , idle == boşta 
var oyun = [

             `${surum}`,
             `${surum1}`,
         
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
        client.user.setActivity(oyun[random]);
      
        }, 15 * 1000);

};