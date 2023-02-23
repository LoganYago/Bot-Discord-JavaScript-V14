const schema = require("../../Database/currencySchema");
const discord = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "removersaldo", // Coloque o nome do comando
  description: "[🛠] Remova moedas da carteira de um usuário", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options:[
    {
        name: "membro", // nome da opção
        description: "Selecione um usuário", // descrição
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "quantia", // nome da opção
        description: "Digite o valor que deseja remover", // descrição
        type: Discord.ApplicationCommandOptionType.Integer,
        required: true,
    },
  ],

run: async(client, interaction) => {

    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.ManageGuild
    );
    let user = interaction.options.getUser("membro");
    let amount = interaction.options.getInteger("quantia");

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "Houve um erro ao executar este comando...",
        ephemeral: true,
      });
    }

    if (!permission) {
      await interaction.reply({
        content: "Você não tem permissões para usar este comando...",
        ephemeral: true,
      });
    } else if (amount > data.wallet) {
      await interaction.reply({
        content: "Este usuário não tem tantas moedas em sua carteira...",
        ephemeral: true,
      });
    } else {
      data.wallet -= amount * 1;
      await data.save();

      const removecoinsEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `Você removeu **<a:nemesis_coin:1073108866956529724> ${amount.toLocaleString()}** de **${
            user.username
          }\'s** carteira`
        );

      await interaction.reply({
        embeds: [removecoinsEmbed],
      });
    }
  },
};