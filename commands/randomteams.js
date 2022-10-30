const { SlashCommandBuilder, bold, blockQuote } = require('discord.js');

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

function randomTeams(randomTeamsInteraction, channelId) {
	// console.log(randomTeamsInteraction);
	console.log(channelId);
	const channelFrom = randomTeamsInteraction.guild.channels.cache.get(channelId)
	// let channel = randomTeamsInteraction.guild.channels.cache.get('1030907869677232271')
	if (!randomTeamsInteraction.member.permissions.has('MOVE_MEMBERS')) return
	let bowl = [];
	for (let guildMember of channelFrom.members.values()) {
		bowl.push(guildMember);
	}
	bowl = shuffle(bowl);
	console.log(bowl[0].user.username);
	return bowl;
}

function getRandomTeamAssignments(bowl){
	originalBowlSize = bowl.length;
	let assignments = [];
	// Generate assignment objects based on size (bowl) of the channel participants
	// If voicechannel size is not an even number of participants return extra player on T side
	if ((originalBowlSize % 2) != 0) {
		let oddLength = ((originalBowlSize / 2) + 0.5);
		console.log('oddLength is true');
		for (i = 0; i < oddLength; i++){
			assignments[i] = ({
				tside: true,
				ctside: false
			})
		}
		for (j = oddLength; j < originalBowlSize; j++) {
			assignments[j] = ({
				tside: false,
				ctside: true
			})
		}
	}
	// If voicechannel is even size then assign even number of participants to ctside or tside
	if ((originalBowlSize % 2) == 0) {
		let evenLength = (originalBowlSize / 2);
		console.log('evenlength is true');
		for (i = 0; i < evenLength; i++){
			assignments[i] = {
				tside: true,
				ctside: false
			}
		}
		for (j = evenLength; j < originalBowlSize; j++) {
			assignments[j] = {
				tside: false,
				ctside: true
			}
		}
	}
	console.log(assignments);
	return assignments;
}

function getRandomTNames(bowl, assignments){
	let Tnames = [];
	for (i = 0; i<bowl.length; i++) {
		if(assignments[i].tside) {
			console.log(i);
			console.log(bowl[i].user.username+' is T.');
			Tnames.push(bowl[i].user.username);
		}
	}
	console.log(Tnames);
	return Tnames;
}
// return the array of names for CTside based on the original array from voicechat (bowl)
function getRandomCTNames(bowl, assignments){
	let CTnames = [];
	for (i = 0; i<bowl.length; i++) {
		if(assignments[i].ctside) {
			console.log(i);
			console.log(bowl[i].user.username+' is CT.');
			CTnames.push(bowl[i].user.username);
		}
	}
	console.log(CTnames);
	return CTnames;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomteams')
		.setDescription('ValveCat suggests teams based on the current voicechat participants.'),
	async execute(interaction) {
		if ((interaction.member.voice.channel.members).size < 2) { 
			await interaction.reply({ content: "Not enough participants!"})
		}
		if ((interaction.member.voice.channel.members).size >= 2) {
			let channelId = interaction.member.voice.channelId;
			const bowl = randomTeams(interaction, channelId);
			console.log('bowlsize is '+bowl.length);
			const assignments = getRandomTeamAssignments(bowl);
			console.log('bowlsize is '+bowl.length);
			randomTNames = getRandomTNames(bowl, assignments);
			randomCTNames = getRandomCTNames(bowl, assignments);
			randomTreply = randomTNames.map(username => {
				return username+' is T';
			});
			randomCTreply = randomCTNames.map(username => {
				return username+' is CT'
			})
			await interaction.reply({ content: blockQuote(bold(randomTreply.join('\r\n')+'\r\n\r\n'+randomCTreply.join('\r\n'))) });
		}
	},
};