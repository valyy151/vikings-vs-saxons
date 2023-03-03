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

let isPlayerTurn = true;

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

function rollDice() {
	dice1 = Math.round(Math.random() * 19) + 1;
	dice2 = Math.round(Math.random() * 19) + 1;
	return [dice1, dice2];
}

class Viking {
	constructor(name, health, strength) {
		this.name = name;
		this.health = health;
		this.strength = strength;
	}

	attack(target) {
		const damage = Math.floor(Math.random() * this.strength) + 1;
		target.health -= damage;
		console.log(`${this.name} attacked ${target.name} and dealt ${damage} damage.`);
	}

	defend() {}

	evade() {}
}

class Saxon {
	constructor(name, health, strength) {
		this.name = name;
		this.health = health;
		this.strength = strength;
	}

	attack(target) {
		const damage = Math.floor(Math.random() * this.strength) + 1;
		target.health -= damage;
		console.log(`${this.name} attacked ${target.name} and dealt ${damage} damage.`);
	}

	defend() {}

	evade() {}
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Creation of the armies

const vikingNames = [
	'Bjorn',
	'Eirik',
	'Freya',
	'Gudrun',
	'Hilda',
	'Ivar',
	'Jorgen',
	'Kari',
	'Leif',
	'Magnus',
	'Njal',
	'Olaf',
	'Ragnar',
	'Sven',
	'Thorstein',
	'Ulf',
	'Valdis',
	'Wulfgar',
	'Ylva',
	'Zephyr',
];
const saxonNames = [
	'Aelfric',
	'Beornwulf',
	'Ceolwulf',
	'Dunstan',
	'Eadgar',
	'Frithuwulf',
	'Godwin',
	'Hengist',
	'Ivo',
	'Jocelyn',
	'Kentigern',
	'Leofric',
	'Morcar',
	'Oswin',
	'Penda',
	'Quenby',
	'Raedwald',
	'Seaxburh',
	'Theobald',
	'Uhtred',
];

const vikings = vikingNames.map((name) => new Viking(name, getRandomNumber(75, 125), getRandomNumber(10, 25)));
const saxons = saxonNames.map((name) => new Saxon(name, getRandomNumber(75, 125), getRandomNumber(10, 25)));

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
