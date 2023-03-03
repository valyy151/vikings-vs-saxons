const startBattleButton = document.getElementById('startBattle');
const selectTeam = document.getElementById('selectTeam');

const header = document.querySelector('header');
const section = document.querySelector('section');

const vikingDiv = document.getElementById('vikingDiv');
const saxonDiv = document.getElementById('saxonDiv');

const players = {
	1: { playerOne: 'Vikings', playerTwo: 'Saxons', yourArmyDiv: vikingDiv },
	2: { playerOne: 'Saxons', playerTwo: 'Vikings', yourArmyDiv: saxonDiv },
};

let playerOne;
let playerTwo;
let yourArmyDiv;

//Button that assigns which team you will be based on the choice you made
startBattleButton.addEventListener('click', () => {
	const team = players[selectTeam.value];

	if (team) {
		playerOne = team.playerOne;
		playerTwo = team.playerTwo;
		yourArmyDiv = team.yourArmyDiv;

		console.log(`Your Team is ${playerOne} and the Enemy Team is ${playerTwo}`);

		header.style.display = 'none';
		section.style.display = 'flex';
		yourArmyDiv.style.order = 1;
		playGame();
	}
});

//Based on whose turn it is, the game runs once and changes the turn to the opposite player
let isPlayerTurn = true;

function playGame() {
	if (isPlayerTurn) {
		makeTurn(playerOne);
	} else {
		makeTurn(playerTwo);
	}

	isPlayerTurn = !isPlayerTurn;
}

//Based on whose turn it is, one set of functions will run for the player, the other one for the enemy
function makeTurn(player) {
	if (player === playerOne) {
		//code that player does
	} else {
		//code that enemy does
	}
}

//Dice rolling that will impact the turns players make, for example damage,defense,evasion
let dice1;
let dice2;

function rollDice() {
	dice1 = Math.round(Math.random() * 5) + 1;
	dice2 = Math.round(Math.random() * 5) + 1;
	return [dice1, dice2];
}
