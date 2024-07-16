const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("../../events/interactionCreate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("This is a test command!"),
  async execute(interaction, client) {
    await interaction.reply({ content: "the bot is working!" });
  },
};
