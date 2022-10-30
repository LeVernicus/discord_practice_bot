const { SlashCommandBuilder, bold, blockQuote } = require('discord.js');

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
				.setRequired(true)),
	async execute(interaction) {
		const roll = Math.floor(Math.random() * (interaction.options.getInteger('maxval') - interaction.options.getInteger('minval') + 1) + interaction.options.getInteger('minval'));
		await interaction.reply(bold(blockQuote([
			interaction.user.username,
			'rolls', 
			roll.toString()+'.',
			'('+interaction.options.getInteger('minval'),
			'out of',
			interaction.options.getInteger('maxval')+')',
		].join(' '))));
	}
};