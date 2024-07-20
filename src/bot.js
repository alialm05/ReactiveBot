const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Embed,
  ReactionCollector,
  ReactionEmoji,
  Collection,
} = require(`discord.js`);

const fs = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,

  ],
});

const clientId = "1147366054486626394";
const guildId = "873219802649468929";

let possibleEmojis = [
  '<:mikeohearn:1104757121179992176>',
  '<:ye:1056475497955086368>',
  '<:OHMYGOD:1070395307369705553>',
  '<:duh:1112938112277032981>',
  '<:ryley:1153368150788821092>',
  '<:barbet:1216120052865171506>',
  '<a:tongueout:1180052503186911312>',
  '<:barbet:1229912606119034972>',
]

let responses = {
  "hi" : "how you doing __",
  "reactive bot" : '<:duh:1112938112277032981>'
}

client.commands = new Collection();

require("dotenv").config();

const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
  
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token);
  //client.handleComponents();

   client.on("messageCreate", async msg => {

    let chatChannel = client.channels.cache.find(channel => channel.name == "💬┃chat")
    const permArray = msg.channel.permissionsFor(clientId).toArray() 

    if(permArray.includes("SendMessages") && permArray.includes("AddReactions")) {
            
      for (var m in responses){
        if (msg.content.toLowerCase() == m.toLowerCase()){
          
          //console.log(msg.channel.permissionsFor(clientId).toArray())

          m = m.toLowerCase()

          let member = msg.guild.members.cache.get(id => id == msg.author);
          let nickname = member ? member.displayName : msg.author.username;
    
          rp = responses[m].replace('__', `${msg.author}`)
          msg.channel.send(rp)
        
          
          
        }
      }

      if (client.user != msg.author && (msg.channel.name.includes("chat") || msg.channel.name.includes("gen")) ) {

        let randNum = Math.round(Math.random() * 1000)
        
        if (randNum >= 990) {
          msg.react('🔥');
        }
        else if (randNum >= 980 && randNum < 990) {
          msg.react('🤓');
          //console.log('7')
        }
        else if (randNum <= 5) {
          let randEmote = possibleEmojis[Math.floor(Math.random()*possibleEmojis.length)]
          msg.reply(randEmote)
        }
        
      //msg.reply('ok bro ..')
    } 

 
    } 
    else {
      //console.log("no perms")
    }

  } 
  
  ) 

})
();



// Reactive Metal YT Cahnnel: https://youtube.com/feeds/videos.xml?channel_id=UC7DJBz4y9ptwlSitP72Eq5w
// channel id: UC7DJBz4y9ptwlSitP72Eq5w