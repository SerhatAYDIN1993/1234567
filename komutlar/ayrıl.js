const Discord  = require("discord.js"); // [package required: discord.js]


exports.run = async (client, message, args, level) => {

  message.member.voice.channel.leave();
  return message.channel.send(`:negative_squared_cross_mark: Şimdi bu kanaldan çıkış yaptım.Yakında geri döneceğim.Müzik dinlemeye hazır ol!`);
};



exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ['ayrıl'],
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "ayrıl",
  description: "Joins the VC that you are in.",
  usage: "ayrıl",
  usageDelim: "",
};