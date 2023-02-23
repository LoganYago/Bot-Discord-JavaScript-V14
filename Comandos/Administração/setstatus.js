const Discord = require("discord.js");

module.exports = {
    name: "setstatus",
    description: "[🛠] Permite-lhe configurar o estado do bot",
    permission: "Aucune",
    dm: false,
    category: "Systéme",
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "status",
            description: "Qual é o estado (online, dnd, idle invisible) ?",
            required: true,
            autocomplete: false
        },{
            type: Discord.ApplicationCommandOptionType.String,
            name: "bio",
            description: "O que é a bio ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, interaction) {

        try {

            const statues = interaction.options.getString("status");
            const biographie = interaction.options.getString("bio");

            bot.user?.setStatus(`${statues}`);

            bot.user?.setPresence({
                activities: [{
                    name: biographie
                }],
            });

            await interaction.reply({content: `Mudei o estatuto para \`${statues}\` e a biografia em \`${biographie}\``});

        } catch (error) {
            return console.log('*❌ - Ocorreu um erro no comando setstatus*', error)
        }
    }
}