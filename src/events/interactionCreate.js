const { Interaction, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) {
      if (interaction.isButton()) {

        const buttonId = interaction.customId
        const member = interaction.member
        //const {buttons} = client
        //const button = buttons.get(customId)

        if (!buttonId) return new Error("You havent pressed a button")

        try {
          
          if (member.roles.cache.has(interaction.guild.roles.cache.find(r => r.name === 'Verified ✅'))) return new Error('member already verified')

          // verify
          if (buttonId != "button2verify") {
            if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
              await member.kick({reason: `Unfortunately You Havent Passed the Verification Check in **${interaction.guild.name}** \n Therefore You are **Kicked**`})
              console.log("failed")
              return new Error("incorrect choice")
            }
            return;
          }

          //await button.execute(interaction, client)
          console.log("passed")
          const role = interaction.guild.roles.cache.find(r => r.name === 'Verified ✅');
                console.log("got role")
                member.roles.add(role);
                await interaction.user.send(`Congratualtions, You are Now Verified ✅ in **${interaction.guild.name}**`).catch(err => {return;})
              
        }
        catch (error) {
          console.log(error)
        }

        interaction.deferUpdate().then(console.log("button pressed sucess")).catch(console.error)

       }
       else return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
    
  },
};
