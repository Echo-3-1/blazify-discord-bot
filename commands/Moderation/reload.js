const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "reload",
        description: "reloads a bot command!",
        usage: "!reload",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["creload"],
    run: async (bot, message, args) => {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)")
    if(message.author.id != "560805847517888512")
  return message.channel.send("You are not the bot the owner!")

    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)
}
    }

