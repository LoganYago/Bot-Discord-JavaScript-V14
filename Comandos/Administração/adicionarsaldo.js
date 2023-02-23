const schema = require("../../Database/currencySchema");
const Discord = require("discord.js");
const discord = require("discord.js");

module.exports = {
  name: "adicionarsaldo", // Coloque o nome do comando
  description: "[🛠] Adicione moedas em uma carteira de usuário.", // Coloque a descrição do comando
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
        description: "Digite o valor que deseja adicionar", // descrição
        type: Discord.ApplicationCommandOptionType.Integer,
        required: true,
    }
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
    } else {
      data.wallet += amount * 1;
      await data.save();

      const addcoinsEmbed = new Discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `Tu adicionaste **<a:nemesis_coin:1073108866956529724> ${amount.toLocaleString()}** em **${
            user.username
          }'s** carteira`
        );

      await interaction.reply({
        embeds: [addcoinsEmbed],
      });
    }
  },
};