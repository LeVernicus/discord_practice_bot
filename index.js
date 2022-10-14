// Require the necessary discord.js classes
const { Client, GatewayIntentBits,  Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();
const rest = new REST({ version: '10' }).setToken(process.env.token);
const maps = require('./maps.json');
const botlines = require ('.botlines.json');
// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// let rarity be one of 4 values
// uncommon, rare, epic, legendary
// uncommon 60, rare 25, epic 10, legendary 5
// uncommon 27/50
// rare 13/50
// epic 8/50
// legendary 2/50
function getBotLineRarity() {
	let rarity = '';
	const numerator = randomInt(1, 50);
	const ratio = numerator / 50;
	const percent = ratio * 100;
	if (percent <= 100 && percent > 46 ) {
		rarity = 'uncommon';
	}
	else if (percent <= 46 && percent > 20 ) {
		rarity = 'rare';
	}
	else if (percent <= 20 && percent > 4) {
		rarity = 'epic';
	}
	else if (percent <= 4) {
		rarity = 'legendary'
	}
	else {
		rarity = 'error'
	}
	return rarity;
}

function getRandomBotLine(context, result) {
	const rarity = getBotLineRarity();
	let j = [];
	for (let i in botlines) {
		if (botlines[i][rarity] && botlines[i][context] && botlines[i][result]) {
			j.push(i);
		}
	}
	const length = j.length;
	const roll = j[randomInt(0, length)];
	return roll;
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


function randomMapReply(select) {
	roll = rollFilteredMap(select);
	try{
		mapReply = maps[roll].internalName;
		return mapReply;
	}
	catch (err) {
		console.log(err);
	}
}

function rollFilteredMap(mode) {
	let j = [];
	// iterate (i) through maps, if map mode === true, then push map to new array (j) 
	for (let i in maps) {
		if (maps[i][mode]) {
			j.push(i);
		}
	}
	// once j is defined of only maps where mode === true, roll a number randomInt() and assign the return array value to the roll
	const length = j.length;
	const roll = j[randomInt(0, length)];
	// the new mapRoll is the value of the array element of the roll, which determines the map
	return roll;
	// interaction.reply({ content: mapRoll.internalName });
}


// When the client is ready, run this code (only once) telling the console the bot is ready
client.once('ready', () => console.log(`${client.user.tag} is ready!`));

client.on('interactionCreate', (interaction) => {
	const boolOption = Boolean(interaction.options["_hoistedOptions"][0] != null);
	if (interaction.commandName === 'roll') {
		// roll a number between the user provided minval, and user provided maxval, then return the result
		const roll = randomInt(interaction.options.getInteger('minval'), interaction.options.getInteger('maxval'));
		// const botLine = getRandomBotLine('roll',roll);
		interaction.reply({ content: interaction.member.nickname + ' rolled the number ' + roll.toString() + '.' + ' (' + interaction.options.getInteger('minval') + '-' + interaction.options.getInteger('maxval') + ')' });
	}
	else if (interaction.commandName === 'randommap' && boolOption === false) {
		interaction.reply({ content: randomMapReply('ranked')})
	}
	else if (interaction.commandName === 'randommap' && boolOption === true) {
		option1 = interaction.options["_hoistedOptions"][0].value;
		if (interaction.commandName === 'randommap' && option1 === 'armsRace') {
			interaction.reply({ content: randomMapReply(option1) });
		}
		else if (interaction.commandName === 'randommap' && option1 === 'casual') {
			interaction.reply({ content: randomMapReply(option1) });
		}
		else if (interaction.commandName === 'randommap' && option1 === 'competitive') {
			interaction.reply({ content: randomMapReply(option1) });
		}
		else if (interaction.commandName === 'randommap' && option1 === 'deathmatch') {
			interaction.reply({ content: randomMapReply(option1) });
		}
		else if (interaction.commandName === 'randommap' && option1 === 'flyingScoutsman') {
			interaction.reply({ content: randomMapReply(option1) });
		}
		else if (interaction.commandName === 'randommap' && option1 === 'retakes') {
			interaction.reply({ content: randomMapReply(option1) });
		}
		else if (interaction.commandName === 'randommap' && option1 === 'wingman') {
			interaction.reply({ content: randomMapReply(option1) });
		}
		else {
			interaction.reply({ content: 'A slash command error occurred!' });
		}
	}
	else if {

	}
	else {
		interaction.reply({ content: 'A slash command error occurred!' });
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
							name: 'Competitive',
							value: 'competitive',
						},
						{
							name: 'Deathmatch',
							value: 'deathmatch',
						},
						{
							name: 'Armsrace',
							value: 'armsRace',
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
		{
			name: 'randomteams',
			description: 'random ct/t teams based on voicechat participants'
		}
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