const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a number between two minmax values.')
		.addIntegerOption(option =>
			option.setName('minval')
				.setDescription('Minimum value for the roll')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('maxval')
				.setDescription('Maximum value for the roll')
				.setRequired(true))
	// async execute(interaction) {
	// 	await interaction.reply('Pong!');
	// },
};