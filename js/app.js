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
let turnCount = 1;
let isPlayerTurn = turnCount % 2 === 1;

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
function makeTurn() {
	if (isPlayerTurn) {
		displayOptions();
	} else {
		enemyTurn();
		//code that enemy does
	}
}

//Dice rolling that will impact the turns players make, for example damage,defense,evasion
function rollDice() {
	dice1 = Math.round(Math.random() * 5) + 1;
	dice2 = Math.round(Math.random() * 5) + 1;
	return [dice1, dice2];
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

//Function to display the buttons and gold
const playersGold = {
	one: 0,
	two: 0,
};

function displayOptions() {
	const rollDiceButton = document.createElement('button');
	rollDiceButton.textContent = 'Roll Dice';
	rollDiceButton.addEventListener('click', () => {
		const [dice1, dice2] = rollDice();
		const gold = dice1 * dice2;
		playersGold.one += gold;
		console.log(`You rolled ${dice1} and ${dice2}`);
		console.log(`You gained ${gold} gold.`);
		updateGold();
	});

	const attackButton = document.createElement('button');
	attackButton.textContent = 'Attack';
	attackButton.addEventListener('click', () => {
		// Implement the attack logic here
	});

	const skipTurnButton = document.createElement('button');
	skipTurnButton.textContent = 'Skip Turn';
	skipTurnButton.addEventListener('click', () => {
		// Do nothing
	});

	const shopButton = document.createElement('button');
	shopButton.textContent = 'Shop';
	shopButton.addEventListener('click', () => {
		// Implement the shop logic here
	});

	const playerGold = document.createElement('h4');
	const enemyGold = document.createElement('h4');
	playerGold.innerText = `Gold: ${playersGold.one}`;
	enemyGold.innerText = `Gold: ${playersGold.two}`;
	document.getElementById('pointsDiv').append(playerGold, enemyGold);

	if (playerOne === 'Vikings') {
		rollDiceButton.classList.add('red');
		attackButton.classList.add('red');
		skipTurnButton.classList.add('red');
		shopButton.classList.add('red');
		enemyGold.classList.add('red');
		playerGold.classList.add('yellow');
	} else {
		rollDiceButton.classList.add('yellow');
		attackButton.classList.add('yellow');
		skipTurnButton.classList.add('yellow');
		shopButton.classList.add('yellow');
		enemyGold.classList.add('yellow');
		playerGold.classList.add('red');
	}

	const buttonContainer = document.getElementById('buttonContainer');
	buttonContainer.append(attackButton, rollDiceButton, shopButton, skipTurnButton);
}

function updateGold() {
	const gold = document.querySelectorAll('h4');
	gold[0].innerText = `Gold: ${playersGold.two}`;
	gold[1].innerText = `Gold: ${playersGold.one}`;
}
const testSoldierViking = vikings[0];
const testSoldierSaxon = saxons[0];
