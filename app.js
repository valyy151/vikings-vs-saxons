const startBattleButton = document.getElementById('startBattle');
const selectTeam = document.getElementById('selectTeam');

const header = document.querySelector('header');
const section = document.querySelector('section');

const vikingDiv = document.getElementById('vikingDiv');
const saxonDiv = document.getElementById('saxonDiv');

let player;
let enemy;
let playerDiv;

const teams = {
	1: { player: 'Vikings', enemy: 'Saxons', playerDiv: vikingDiv },
	2: { player: 'Saxons', enemy: 'Vikings', playerDiv: saxonDiv },
};

startBattleButton.addEventListener('click', () => {
	const team = teams[selectTeam.value];

	if (team) {
		player = team.player;
		enemy = team.enemy;
		playerDiv = team.playerDiv;

		console.log(`Your Team is ${player} and the Enemy Team is ${enemy}`);

		header.style.display = 'none';
		section.style.display = 'flex';
		playerDiv.style.order = 1;
	}
});
