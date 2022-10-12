// Require the necessary discord.js classes
const { Client, GatewayIntentBits,  Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token, clientId, guildId } = require('dotenv').config();
const rest = new REST({ version: '10' }).setToken(token);
const maps = require('./maps.json');
console.log('token');
// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// When the client is ready, run this code (only once)
client.once('ready', () => console.log(`${client.user.tag} is ready!`));

client.on('interactionCreate', (interaction) => {
	if (interaction.commandName === 'roll') {
		const roll = randomInt(interaction.options.getInteger('minval'), interaction.options.getInteger('maxval'));
		interaction.reply({ content: interaction.member.nickname + ' rolled the number ' + roll.toString() + '.' + ' (' + interaction.options.getInteger('minval') + '-' + interaction.options.getInteger('maxval') + ')' });
	}
	if (interaction.commandName === 'randommap') {
		const roll = randomInt(0, maps.length);
		interaction.reply({ content: maps[roll].internalName });
	}
});
/* 	else {
		let maps_filter = [null];
		for (let i = 0; i < maps.length; i++) {
			if (maps[i].competitive) {
				console.log(maps[i]);
				console.log(maps[i].internalName);
				console.log(maps[i].competitive);
				maps_filter += maps[i];
			}
		}
		const roll = randomInt(0, maps_filter.length);
		interaction.reply({ content: maps_filter[roll].internalName });
	} */

async function main() {
	const commands = [
		{
			name: 'roll',
			description: 'Roll a number between two minmax values',
			options: [
				{
					name: 'minval',
					description: 'Minimum value roll',
					type: 4,
					required: true,
				},
				{
					name: 'maxval',
					description: 'Maximum value roll',
					type: 4,
					required: true,
				},
			],
		},
		{
			name: 'randommap',
			description: 'Random a CSGO map, given a game mode, (default competitive)',
			options: [
				{
					name: 'mode',
					description: 'Gameplay mode',
					type: 3,
					required: false,
					choices: [
						{
							name: 'Competitive',
							value: 'competitive',
						},
						{
							name: 'Wingman',
							value: 'wingman',
						},
						{
							name: 'Casual',
							value: 'casual',
						},
						{
							name: 'Deathmatch',
							value: 'deathmatch',
						},
						{
							name: 'Armsrace',
							value: 'armsrace',
						},
						{
							name: 'Flying Scoutsman',
							value: 'flyingScoutsman',
						},
						{
							name: 'Retakes',
							value: 'retakes',
						},
					],
				},
			],
		},
	];
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
			body: commands,
		});
		// client.login(token)
	}
	catch (err) {
		console.log(err);
	}
}

main();

// Login to Discord with your client's token

client.login(token);