// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, Events, bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, Routes, VoiceChannel, GuildChannel, GuildMember, Base, Guild, CachedManager, DataManager, VoiceState, VoiceStateManager, GuildManager } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();
const rest = new REST({ version: '10' }).setToken(process.env.token);
const commands = require('./commands.json');
// const maps = require('./maps.json');
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

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

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


function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
  
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	return array;
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// call a filtered map and return its internalName
function randomMapReply(select) {
	roll = rollFilteredMap(select);
	try{
		mapReply = maps[roll].internalName;
		return bold(blockQuote('*suggests '+mapReply+'*'));
	}
	catch (err) {
		console.log(err);
	}
}

// function randomTeams(randomTeamsInteraction, channelId) {
// 	// console.log(randomTeamsInteraction);
// 	console.log(channelId);
// 	const channelFrom = randomTeamsInteraction.guild.channels.cache.get(channelId)
// 	// let channel = randomTeamsInteraction.guild.channels.cache.get('1030907869677232271')
// 	if (!randomTeamsInteraction.member.permissions.has('MOVE_MEMBERS')) return
// 	let bowl = [];
// 	for (let guildMember of channelFrom.members.values()) {
// 		bowl.push(guildMember);
// 	}
// 	bowl = shuffle(bowl);
// 	console.log(bowl[0].user.username);
// 	return bowl;
// }

// function getRandomTeamAssignments(bowl){
// 	originalBowlSize = bowl.length;
// 	let assignments = [];
// 	// Generate assignment objects based on size (bowl) of the channel participants
// 	// If voicechannel size is not an even number of participants return extra player on T side
// 	if ((originalBowlSize % 2) != 0) {
// 		let oddLength = ((originalBowlSize / 2) + 0.5);
// 		console.log('oddLength is true');
// 		for (i = 0; i < oddLength; i++){
// 			assignments[i] = ({
// 				tside: true,
// 				ctside: false
// 			})
// 		}
// 		for (j = oddLength; j < originalBowlSize; j++) {
// 			assignments[j] = ({
// 				tside: false,
// 				ctside: true
// 			})
// 		}
// 	}
// 	// If voicechannel is even size then assign even number of participants to ctside or tside
// 	if ((originalBowlSize % 2) == 0) {
// 		let evenLength = (originalBowlSize / 2);
// 		console.log('evenlength is true');
// 		for (i = 0; i < evenLength; i++){
// 			assignments[i] = {
// 				tside: true,
// 				ctside: false
// 			}
// 		}
// 		for (j = evenLength; j < originalBowlSize; j++) {
// 			assignments[j] = {
// 				tside: false,
// 				ctside: true
// 			}
// 		}
// 	}
// 	console.log(assignments);
// 	return assignments;
// }
// // return the array of names for Tside based on the original array from voicechat (bowl)
// function getRandomTNames(bowl, assignments){
// 	let Tnames = [];
// 	for (i = 0; i<bowl.length; i++) {
// 		if(assignments[i].tside) {
// 			console.log(i);
// 			console.log(bowl[i].user.username+' is T.');
// 			Tnames.push(bowl[i].user.username);
// 		}
// 	}
// 	console.log(Tnames);
// 	return Tnames;
// }
// // return the array of names for CTside based on the original array from voicechat (bowl)
// function getRandomCTNames(bowl, assignments){
// 	let CTnames = [];
// 	for (i = 0; i<bowl.length; i++) {
// 		if(assignments[i].ctside) {
// 			console.log(i);
// 			console.log(bowl[i].user.username+' is CT.');
// 			CTnames.push(bowl[i].user.username);
// 		}
// 	}
// 	console.log(CTnames);
// 	return CTnames;
// }

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
	return (bold(blockQuote([
		interaction.member.nickname,
		'rolls', 
		roll.toString()+'.',
		'('+interaction.options.getInteger('minval'),
		'out of',
		interaction.options.getInteger('maxval')+')'
	].join(' '))));
}

// When the client is ready, run this code (only once) telling the console the bot is ready
client.once('ready', () => console.log(`${client.user.tag} is ready!`));

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	// let channelId = interaction.member.voice.channelId;
	// if (Boolean(interaction.options["_hoistedOptions"][0])) {
	// 	console.log('options is true')
	// }
	// if (!(Boolean(interaction.options["_hoistedOptions"][0]))) {
	// 	console.log('options is false')
	// }
	// if (interaction.commandName === 'roll' && interaction.options.getInteger('minval') !== 0) {
	// await interaction.reply({ content: rollReply(interaction) });
	// }
	// if (interaction.options.getInteger('minval') === 0) {
	// 	await interaction.reply({ content: 'minval cannot be zero, snitch. Stop trying to break the bot! :rage:'})
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'ranked') {
	// 	await interaction.reply({ content: randomMapReply('ranked')})
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'armsrace') {
	// 	await interaction.reply({ content: randomMapReply('armsRace') });
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'casual') {
	// 	await interaction.reply({ content: randomMapReply('casual') });
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'competitive') {
	// 	await interaction.reply({ content: randomMapReply('competitive') });
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'deathmatch') {
	// 	await interaction.reply({ content: randomMapReply('deathmatch') });
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'flyingscoutsman') {
	// 	await interaction.reply({ content: randomMapReply('flyingScoutsman') });
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'retakes') {
	// 	await interaction.reply({ content: randomMapReply('retakes') });
	// }
	// if (interaction.options["_hoistedOptions"][0] === 'wingman') {
	// 	await interaction.reply({ content: randomMapReply('wingman') });
	// }
	// if (interaction.commandName === 'randomteams' && ((interaction.member.voice.channel.members).size <= 1))
	// {
	// 	await interaction.reply({ content: 'Channel has too few players!'});
	// }

});

client.login(process.env.token);