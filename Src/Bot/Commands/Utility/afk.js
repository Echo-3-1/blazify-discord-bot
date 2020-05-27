const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
class AFK extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "afk",
      description: "Makes a user AFK",
      usage: "b3afk sleeping..........",
      category: "Utility",
      cooldown: 1000,
      aliases: ["away"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableUtility} = guildSettings;
if(!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");

          let reason = args.join(" ") ? args.join(" ") : "AFKING";
          let afks = client.afk.get(message.author.id);

          if (!afks) {
              let data = {
                  id: message.author.id,
                  reason: reason
              };

              client.afk.set(message.author.id, data);
              return message.channel.send(`You are now afk. Reason: ${reason}`)
          }
      }
    }
module.exports = AFK;