const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {

    data:new SlashCommandBuilder()
    .setName("setup-verification")
    .setDescription("verification system setup"),

    async execute(interaction) {

        await interaction.deferReply();

        try {
            
            const{ channelFrom, client, options, member} = interaction;

            let verifyChannel = interaction.guild.channels.cache.find(channel => channel.name == "✅┃verify")

            //const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){

                await interaction.editReply({content: "you do not have permissions to set up a verification channel"})

            }
            else
            {
            
            let target = interaction.options.getUser('user') || interaction.member;
            let targetAvatar = target.displayAvatarURL({size : 512})
            let userId = target.userId

            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('button1verify')
                .setLabel('1')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('button2verify')
                .setLabel('2')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('button3verify')
                .setLabel('3')
                .setStyle(ButtonStyle.Primary
                    ),
                new ButtonBuilder()
                .setCustomId('button4verify')
                .setLabel('4')
                .setStyle(ButtonStyle.Primary)

            )

            const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Press the button with the option matching the picture that is standing upright`)
            .setImage('https://media.discordapp.net/attachments/1165359479345393876/1165364768895410267/verify12.png')
            .setTitle(`Verification`)


            const msg = await verifyChannel.send({ embeds: [embed], components: [buttons] })
            await interaction.reply("verification system has been set up");
            //msg.react('1️⃣')
            //msg.react('2️⃣')
            //msg.react('3️⃣')
            //msg.react('4️⃣')

            const collector = interaction.channel.createMessageComponentCollector()

            collector.on('collect', async i => {
                await i.update({ embeds: [embed], components: [buttons] })
            })

            }

        } catch (e) {
            if (e) {
                await interaction.editReply({ content: `Interaction Failed with Status Code **${e}**`, ephemeral: true});
            }
            else {
                await interaction.editReply({ content: `Interaction Failed`, ephemeral: true});
            }
        }

    }


}