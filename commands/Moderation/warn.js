const Discord = require('discord.js');
const mongoose = require("mongoose");
const Warn = require("../../models/warn.js")
const lgc = require("../../config.json").logChannel;
const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "warn",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
    await message.delete();
    let user = message.mentions.members.first() || message.author;
    if(!user)return message.channel.send("You must specify a valid person")
let rip = args.slice(1).join(" ")
if(!args[1])return message.channel.send("Please specify a reason, why to be warned")
Warn.findOne(
  { userID: user.id, guildID: message.guild.id },
  (err, warns) => {
    if (err) console.log(err);
    if (!warns) {
      const newWarn = new Warn({
        userID: user.id,
        userName: user.username,
        guildID: message.guild.id,
        warns: rip,
      });
      newWarn.save().catch(err => console.log(err));
      let lChannel = message.guild.channels.cache.get(lgc)
        return lChannel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} a warning for ${rip}.`)
     } else {
        warns.warns += `
        -------------------------------
        **-${rip}**`
        warns.save().catch(err => console.log(err));
        let lChannel = message.guild.channels.find(channel => channel.name === "logs")
        return lChannel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} a warning for ${rip}.`)
  }
  })
}
}

