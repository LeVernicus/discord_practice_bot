const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randommap')
		.setDescription('Random a CSGO map, given a game mode. (default ranked)')
		.addSubcommand(subcommand =>
			subcommand
				.setName('armsrace')
				.setDescription('filters maps by Arms Race'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('casual')
				.setDescription('filters maps by Casual'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('competitive')
				.setDescription('filters maps by Competitive'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('deathmatch')
				.setDescription('filters maps by Deathmatch'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('flyingscoutsman')
				.setDescription('filters maps by Flying Scoutsman'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('ranked')
				.setDescription('filters maps by Ranked'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('retakes')
				.setDescription('filters maps by Retakes'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('wingman')
				.setDescription('filters maps by Wingman'))
	// async execute(interaction) {
	// 	await interaction.reply('Pong!');
	// },
};