const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');
const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "seal",
        description: "Sends a picture of a seal!",
        usage: "",
        category: "images",
        accessableby: "Members",
    run: async (bot, message, args) => {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(enableFun) {
        let msg = await message.channel.send("Generating...")

        fetch("https://apis.duncte123.me/seal")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(" whoops. I broke, try again!")

            let embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} Seal!`, message.guild.iconURL)
            .setImage(body.data.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}
}
