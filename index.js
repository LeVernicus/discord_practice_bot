// Require the necessary discord.js classes
const { Client, GatewayIntentBits,  Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();
const rest = new REST({ version: '10' }).setToken(process.env.token);
const maps = require('./maps.json');
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

// When the client is ready, run this code (only once) telling the console the bot is ready
client.once('ready', () => console.log(`${client.user.tag} is ready!`));

client.on('interactionCreate', (interaction) => {
	if (interaction.commandName === 'roll') {
		// roll a number between the user provided minval, and user provided maxval, then return the result
		const roll = randomInt(interaction.options.getInteger('minval'), interaction.options.getInteger('maxval'));
		interaction.reply({ content: interaction.member.nickname + ' rolled the number ' + roll.toString() + '.' + ' (' + interaction.options.getInteger('minval') + '-' + interaction.options.getInteger('maxval') + ')' });
	}
	if (interaction.commandName === 'randommap' && interaction.options["_hoistedOptions"][0] === undefined) {
		let j = [];
		// iterate (i) through maps, if map competitive === true, then push map to new array (j) 
		for (let i in maps) {
			if (maps[i].competitive) {
				j.push(i);
			}
		}
		// once j is defined of only maps where competitive === true, roll a number randomInt() and assign the return array value to the roll
		const roll = j[randomInt(0, j.length)];
		// the new mapRoll is the value of the array element of the roll, which determines the map
		const mapRoll = maps[roll];
		interaction.reply({ content: mapRoll.internalName });
	} else {
		if (interaction.commandName === 'randommap' && interaction.options["_hoistedOptions"][0] === 'wingman') {
			console.log('its wingman')
			let j = [];
			// iterate (i) through maps, if map wingman === true, then push map to new array (j) 
			for (let i in maps) {
				if (maps[i].wingman) {
					j.push(i);
				}
			}
			// once j is defined of only maps where wingman === true, roll a number randomInt() and assign the return array value to the roll
			const roll = j[randomInt(0, j.length)];
			// the new mapRoll is the value of the array element of the roll, which determines the map
			const mapRoll = maps[roll];
			interaction.reply({ content: mapRoll.internalName });	
		}
	}
});
	
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
		await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), {
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

client.login(process.env.token);