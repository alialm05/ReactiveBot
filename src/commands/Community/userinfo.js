const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('get-user-info')
    .setDescription('see the user information of the requested user')
    .addUserOption(option => option.setName('username').setDescription('the user you want to get information from').setRequired(true)),

    async execute(interaction){

        await interaction.deferReply();

        try {


            const{ channel, client, options, member} = interaction;
            const user = interaction.options.getUser('username') || interaction.user;
            const Member = await interaction.guild.members.fetch(user.id);
            const icon = user.displayAvatarURL();
    
            const tag = user.tag;
    
            let joinDate = user.createdAt
            let serverJoinDate = Member.joinedAt

            let shortennedJD = moment(joinDate).format('MMM. D, YYYY');
            let shortennedSJD = moment(serverJoinDate).format('MMM. D, YYYY');

            const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(`${tag}`)
            .setThumbnail(icon)
            .addFields({name: "Member", value: `${user}`, inline: true })
            .addFields({name: "Roles", value: `${Member.roles.cache.map(r => r).join(" ")}`, inline: false })
            .addFields({name: "Discord Join Date:", value: `${shortennedJD}`, inline: false })
            .addFields({name: "Server Join Date:", value: `${shortennedSJD}`, inline: false })
            .setTimestamp()
    
            await interaction.editReply({ embeds: [embed] });

        } catch (e) {
            
            await interaction.editReply({ content: `interaction failed`, ephemeral: true});
        }




    }



}