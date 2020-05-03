const { getImage } = require("../../functions.js");
const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "gglimgn",
    description: "Display's the economy leaderboard for the guild",
    usage: "!leaderboard",
    category: "economy",
    accessableby: "Members",
    aliases: ["board"],
    run: async (client, message, args) => {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(enableFun) {
        image(message);
function image(message) {
    var options = {
      url: "http://results.dogpile.com/serp?qc=images&q=" + "gaming",

      method: "GET",

      headers: {
        Accept: "text/html",

        "User-Agent": "Chrome"
      }
    };

    request(options, function(error, response, responseBody) {
      if (error) {
        return;
      }

      $ = cheerio.load(responseBody);

      var links = $(".image a.link");

      var urls = new Array(links.length)
        .fill(0)
        .map((v, i) => links.eq(i).attr("href"));

      console.log(urls);

      if (!urls.length) {
        return;
      }

      // Send result

      message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
  }
}
}
}
