const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {

    data:new SlashCommandBuilder()
    .setName("see-avatar")
    .setDescription("View a Users Avatar")
    .addUserOption((option) =>
    option.setName('user')
    .setDescription('requested user')
    .setRequired(true)
    
    ),

    async execute(interaction) {

        await interaction.deferReply();

        try {
            
            const{ channel, client, options, member} = interaction;
            let target = interaction.options.getUser('user') || interaction.member;
            let targetAvatar = target.displayAvatarURL({size : 512})


            const embed = new EmbedBuilder()
            .setColor("Red")
            .setImage(`${targetAvatar}`)
            .setTitle(`${target.tag}'s Profile Picture`)

            
            await interaction.editReply({ embeds: [embed] });

        } catch (e) {
            
            await interaction.editReply({ content: `Interaction Failed with Status Code **${e.response.status}**`, ephemeral: true});
        }

    }


}