const { SlashCommandBuilder, bold, blockQuote } = require('discord.js');
const maps = require('./maps.json');

function rollFilteredMap(mode) {
	console.log(mode);
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
	console.log(roll);
	// the new mapRoll is the value of the array element of the roll, which determines the map
	return roll;
	// interaction.reply({ content: mapRoll.internalName });
}

function randomMapReply(select) {
	roll = rollFilteredMap(select);
	try{
		console.log(maps[roll]);
		let mapReply = maps[roll].internalName;
		return mapReply
	}
	catch (err) {
		console.log(err);
	}
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('randommap')
		.setDescription('Random a CSGO map, given a game mode. (default ranked)')
		.addStringOption(option =>
			option.setName('mode')
				.setDescription('ranked,competitive,wingman,casual,deathmatch,armsrace,flyingscoutsman,retakes')),
	async execute(interaction) {
		if(!Boolean(interaction.options["_hoistedOptions"][0])){
			const randomMap = randomMapReply('ranked');
			await interaction.reply({ content: bold(blockQuote('suggests '+randomMap)) });
		}
		if(Boolean(interaction.options["_hoistedOptions"][0])){
			console.log(interaction.options["_hoistedOptions"][0].value);
			const mode = interaction.options["_hoistedOptions"][0].value;
			const randomMap = randomMapReply(mode);
			await interaction.reply({ content: bold(blockQuote('suggests '+randomMap))});
		}
		
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
	}
};