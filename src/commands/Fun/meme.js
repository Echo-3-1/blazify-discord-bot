
const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) => {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
  }