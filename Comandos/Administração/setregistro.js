const Discord = require("discord.js")

module.exports = {
    name: 'cargos',
    description: '[🛠] Comando para embed de cargos.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

 if (!interaction.channel.permissionsFor(interaction.user).has(["0x0000000000000008"])) {
            return interaction.reply({
                content: `**❌ | ${interaction.user}, Você precisa da permissão \`ADMINISTRATOR\` para usar este comando!**`,
                ephemeral: true,
            })
        } else {

        let embed = new Discord.EmbedBuilder()
            .setImage('https://i.imgur.com/lVijVzo.gif')
            .setThumbnail('https://i.imgur.com/aetLi6l.png')
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
            .setTimestamp()
            .setColor('Green')
            .setTitle(`・Bem-vindo(a)・`)
            .setDescription('*<a:direita:1073113336796938302> É necessário que você clique no botão anexado nesta mensagem para escolher sua facção!*')

        const dropdown = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('select2')
                    .setPlaceholder('💚 Clique Aqui!')
                    .addOptions(
                        {
                            label: 'Aliança',
                            description: 'Clique aqui para resgatar o cargo Aliança',
                            emoji: '<:ally:1069808312247386162>',
                            value: 'ally',
                        },
                        {
                            label: 'Horda',
                            description: 'Clique aqui para resgatar o cargo Horda',
                            emoji: '<:horde:1069808329964134420>',
                            value: 'horde',
                        },
                        {
                            label: 'Eventos/Sorteios',
                            description: 'Clique aqui para resgatar o cargo Eventos/Sorteios',
                            emoji: '<a:giveaway:1074123462030930140>',
                            value: 'eventos',
                        },
                        {
                            label: 'Beta',
                            description: 'Clique aqui para resgatar o cargo Beta',
                            emoji: '<:iconhunter:1071176973797302302>',
                            value: 'hunter',
                        },
                    ),
            );
            let canal = interaction.guild.channels.cache.get("1069709436140142653");

            canal.send({
                components: [dropdown],
                embeds: [embed],
            })
            await interaction.reply({
                ephemeral: true,
                content: `✅ **| ${interaction.user}, Enviei o dropdownRoles em ${canal} com sucesso!`,
            })
        }
    }
}