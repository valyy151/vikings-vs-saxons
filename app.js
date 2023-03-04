const startBattleButton = document.getElementById('startBattle');
const selectTeam = document.getElementById('selectTeam');

const header = document.querySelector('header');
const section = document.querySelector('section');

const vikingDiv = document.getElementById('vikingDiv');
const saxonDiv = document.getElementById('saxonDiv');

const vikingArmy = document.getElementById('vikingArmy');
const saxonArmy = document.getElementById('saxonArmy');

const totalHealthViking = document.getElementById('totalHealthViking');
const totalHealthSaxon = document.getElementById('totalHealthSaxon');

const players = {
	1: { playerOne: 'Vikings', playerTwo: 'Saxons', yourArmyDiv: vikingDiv },
	2: { playerOne: 'Saxons', playerTwo: 'Vikings', yourArmyDiv: saxonDiv },
};

let playerOne;
let playerTwo;
let yourArmyDiv;
let playerOneHealth;
let playerTwoHealth;

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

		playGame();
		renderSoldiers(vikings);
		renderSoldiers(saxons);
		updateArmies();
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
	dice1 = Math.round(Math.random() * 5) + 1;
	dice2 = Math.round(Math.random() * 5) + 1;
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
		target.receiveDamage(damage);

		console.log(`${this.name} attacked ${target.name}.`);
		updateArmies();
	}

	receiveDamage(damage) {
		const defendAttack = this.defend();
		console.log('Damage: ', damage);
		if (defendAttack) {
			damage = parseInt(damage * 0.8);
			console.log(`Attack Defended! Received ${damage} damage.`);
		} else if (!defendAttack) {
			console.log(`Received ${damage} damage.`);
		}

		this.health -= damage;
		if (this.health <= 0) {
			console.log(`${this.name} has died.`);
			updateArmies();
		}
	}

	defend() {
		const number = Math.floor(Math.random() * 10) + 1;
		if (number >= 8) {
			return true;
		} else return false;
	}

	evade() {}

	berserk() {}
}

class Saxon {
	constructor(name, health, strength) {
		this.name = name;
		this.health = health;
		this.strength = strength;
	}

	attack(target) {
		const damage = Math.floor(Math.random() * this.strength) + 1;
		target.receiveDamage(damage);

		console.log(`${this.name} attacked ${target.name}.`);
		updateArmies();
	}

	receiveDamage(damage) {
		const defendAttack = this.defend();
		console.log('Damage: ', damage);
		if (defendAttack) {
			damage = parseInt(damage * 0.8);
			console.log(`Attack Defended! Received ${damage} damage.`);
		} else if (!defendAttack) {
			console.log(`Received ${damage} damage.`);
		}

		this.health -= damage;
		if (this.health <= 0) {
			console.log(`${this.name} has died.`);
			updateArmies();
		}
	}
	defend() {
		const number = Math.floor(Math.random() * 10) + 1;
		if (number >= 8) {
			return true;
		} else return false;
	}

	evade() {}

	poison() {}
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

// Function to create a new soldier element
function createSoldierElement(soldier) {
	const newSoldier = document.createElement('ul');
	newSoldier.setAttribute('id', soldier.name);

	const name = document.createElement('li');
	name.innerText = soldier.name;
	newSoldier.appendChild(name);

	const strength = document.createElement('li');
	strength.innerText = soldier.strength;
	strength.classList.add('red');
	newSoldier.appendChild(strength);

	const health = document.createElement('li');
	health.innerText = soldier.health;
	health.classList.add('green');
	newSoldier.appendChild(health);

	return newSoldier;
}

// Function to render the soldiers to the DOM
function renderSoldiers(army) {
	army.forEach((soldier) => {
		const newSoldier = createSoldierElement(soldier);
		if (army === saxons) {
			saxonArmy.appendChild(newSoldier);
		} else if (army === vikings) {
			vikingArmy.appendChild(newSoldier);
		}
	});

	// Set styles for the army display
	yourArmyDiv.style.order = 1;
	yourArmyDiv.style.flexDirection = 'column-reverse';
	yourArmyDiv.querySelectorAll('ul').forEach((ul) => (ul.style.flexDirection = 'column-reverse'));
}

// Function to update the soldiers' health values in the DOM

function updateArmies() {
	let vikingHealthSum = 0;
	let saxonHealthSum = 0;

	vikings.forEach((viking) => {
		const vikingHealthElement = document.querySelector(`#${viking.name} li:nth-child(3)`);
		vikingHealthElement.innerText = viking.health;
		vikingHealthSum += viking.health;
	});

	saxons.forEach((saxon) => {
		const saxonHealthElement = document.querySelector(`#${saxon.name} li:nth-child(3)`);
		saxonHealthElement.innerText = saxon.health;
		saxonHealthSum += saxon.health;
	});

	totalHealthViking.innerText = vikingHealthSum;
	totalHealthSaxon.innerText = saxonHealthSum;
}

const testSoldierViking = vikings[0];
const testSoldierSaxon = saxons[0];
