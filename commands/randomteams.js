const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomteams')
		.setDescription('ValveCat suggests teams based on the current voicechat participants.')
	// async execute(interaction) {
	// 	await interaction.reply('Pong!');
	// },
};