// Require the necessary discord.js classes
const { Client, GatewayIntentBits,  Routes, VoiceChannel, GuildChannel, GuildMember, Base, Guild, CachedManager, DataManager, VoiceState, VoiceStateManager, GuildManager } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();
const rest = new REST({ version: '10' }).setToken(process.env.token);
const maps = require('./maps.json');
const commands = require('./commands.json');
// const botlines = require ('.botlines.json');
// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
	],
});

// const guild = await interaction.client.guilds.fetch(process.env.guildId);


// let rarity be one of 4 values
// uncommon, rare, epic, legendary
// uncommon 60, rare 25, epic 10, legendary 5
// uncommon 27/50
// rare 13/50
// epic 8/50
// legendary 2/50
// function getBotLineRarity() {
// 	let rarity = '';
// 	const numerator = randomInt(1, 50);
// 	const ratio = numerator / 50;
// 	const percent = ratio * 100;
// 	if (percent <= 100 && percent > 46 ) {
// 		rarity = 'uncommon';
// 	}
// 	else if (percent <= 46 && percent > 20 ) {
// 		rarity = 'rare';
// 	}
// 	else if (percent <= 20 && percent > 4) {
// 		rarity = 'epic';
// 	}
// 	else if (percent <= 4) {
// 		rarity = 'legendary'
// 	}
// 	else {
// 		rarity = 'error'
// 	}
// 	return rarity;
// }

// function getRandomBotLine(context, result) {
// 	const rarity = getBotLineRarity();
// 	let j = [];
// 	for (let i in botlines) {
// 		if (botlines[i][rarity] && botlines[i][context] && botlines[i][result]) {
// 			j.push(i);
// 		}
// 	}
// 	const length = j.length;
// 	const roll = j[randomInt(0, length)];
// 	return roll;
// }

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

function randomTeams(randomTeamsInteraction) {
	let channel = randomTeamsInteraction.member.voice.channel;
	console.log(channel.members);
	return
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

function rollReply(rollInteraction) {
	const interaction = rollInteraction;
	const roll = randomInt(interaction.options.getInteger('minval'), interaction.options.getInteger('maxval'));
	return [interaction.member.nickname, 'rolled', roll.toString()+'.', '('+interaction.options.getInteger('minval'), '-', interaction.options.getInteger('maxval')+')'].join(' ')
}

// When the client is ready, run this code (only once) telling the console the bot is ready
client.once('ready', () => console.log(`${client.user.tag} is ready!`));

client.on('interactionCreate', async interaction => {
	if (Boolean(interaction.options["_hoistedOptions"][0])) {
		console.log('options is true')
	}
	if (!(Boolean(interaction.options["_hoistedOptions"][0]))) {
		console.log('options is false')
	}
	if (interaction.commandName === 'roll') {
		await interaction.reply({ content: rollReply(interaction) });
	}
	if (interaction.commandName === 'randomteams') {
		randomTeams(interaction);
		await interaction.reply({ content: 'called randomTeams()'});
	}
	if (interaction.commandName === 'randommap') {
		await interaction.reply({ content: randomMapReply('ranked')})
	}
	if (interaction.options["_hoistedOptions"][0] === 'armsRace') {
		await interaction.reply({ content: randomMapReply('armsRace') });
	}
	if (interaction.options["_hoistedOptions"][0] === 'casual') {
		await interaction.reply({ content: randomMapReply('casual') });
	}
	if (interaction.options["_hoistedOptions"][0] === 'competitive') {
		await interaction.reply({ content: randomMapReply('competitive') });
	}
	if (interaction.options["_hoistedOptions"][0] === 'deathmatch') {
		await interaction.reply({ content: randomMapReply('deathmatch') });
	}
	if (interaction.options["_hoistedOptions"][0] === 'flyingScoutsman') {
		await interaction.reply({ content: randomMapReply('flyingScoutsman') });
	}
	if (interaction.options["_hoistedOptions"][0] === 'retakes') {
		await interaction.reply({ content: randomMapReply('retakes') });
	}
	if (interaction.options["_hoistedOptions"][0] === 'wingman') {
		await interaction.reply({ content: randomMapReply('wingman') });
	}
});
	
async function main() {
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