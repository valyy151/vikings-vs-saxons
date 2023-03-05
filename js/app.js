let vikingHealthSum = 0;
let saxonHealthSum = 0;

let diceThrowCount = 1;
let attackCount = 1;

let gameFinished = false;

let isPlayerTurn;

const players = [
	{
		playerOne: 'Vikings',
		playerTwo: 'Saxons',
		yourArmyDiv: vikingDiv,
		myArmy: vikings,
		enemyArmy: saxons,
	},
	{
		playerOne: 'Saxons',
		playerTwo: 'Vikings',
		yourArmyDiv: saxonDiv,
		myArmy: saxons,
		enemyArmy: vikings,
	},
];

//Button that assigns which team you will be based on the choice you made
startBattleButton.addEventListener('click', () => {
	const team = players[selectTeam.value];

	playerOne = team.playerOne;
	playerTwo = team.playerTwo;
	yourArmyDiv = team.yourArmyDiv;
	myArmy = team.myArmy;
	enemyArmy = team.enemyArmy;

	console.log(`Your Team is ${playerOne} and the Enemy Team is ${playerTwo}`);

	header.style.display = 'none';
	section.style.display = 'flex';

	if (selectTeam.value === '0') {
		isPlayerTurn = true;
		yourTurnText.className = 'strength';
		enemyTurnText.className = 'dexterity';
	} else {
		isPlayerTurn = false;
		yourTurnText.className = 'dexterity';
		enemyTurnText.className = 'strength';
	}

	renderSoldiers(vikings);
	renderSoldiers(saxons);
	renderButtons();
	updateArmies();

	setTimeout(() => decideTurn(), 3000);
});

//Button that refreshes the page
newGameButton.addEventListener('click', () => {
	location.reload();
});

//Ends the current player's turn and switches to the other enemy's turn. It also calls enemyTurn() if it's the enemy's turn.
function endPlayerTurn() {
	if (totalHealthSaxon.innerText == 0 || totalHealthViking.innerText == 0) {
		return null;
	} else {
		isPlayerTurn = !isPlayerTurn;
		if (isPlayerTurn) {
			yourTurnText.style.visibility = 'visible';
			enemyTurnText.style.visibility = 'hidden';

			diceThrowCount = 0;
			attackCount = 0;
		} else {
			yourTurnText.style.visibility = 'hidden';
			enemyTurnText.style.visibility = 'visible';

			enemyTurn();
		}
	}
}

//Simulates the behavior of the enemy when it's their turn.
function enemyTurn() {
	const [dice1, dice2] = rollDice();
	const gold = dice1 * dice2;

	setTimeout(() => {
		const enemyRolled = document.createElement('h6');
		const enemyGained = document.createElement('h6');

		enemyRolled.innerText = `Enemy rolled ${dice1} and ${dice2} `;
		enemyGained.innerText = `Enemy gained ${gold} gold.`;
		playersGold.two += gold;

		setTimeout(() => diceRollText.append(enemyRolled), 100);
		setTimeout(() => diceRollText.append(enemyGained), 1200);

		setTimeout(() => {
			enemyRolled.remove();
		}, 5000);
		setTimeout(() => {
			enemyGained.remove();
		}, 5000);

		setTimeout(() => updateGold(), 1200);
	}, 2000);
	setTimeout(() => {
		if (playersGold.two >= 15) {
			playersGold.two -= 15;

			battle(enemyArmy, myArmy);

			updateGold();

			setTimeout(() => {
				endPlayerTurn();
			}, 2000);
		} else {
			endPlayerTurn();
		}
	}, 7000);
}

//Rolls two dice and returns an array with the results.
function rollDice() {
	dice1 = Math.round(Math.random() * 5) + 1;
	dice2 = Math.round(Math.random() * 5) + 1;
	return [dice1, dice2];
}

//Takes a soldier object as input and returns a new ul element representing that soldier.
function createSoldierElement(soldier) {
	const newSoldier = document.createElement('ul');
	newSoldier.setAttribute('id', soldier.name);

	const name = document.createElement('li');
	name.innerText = soldier.name;
	newSoldier.appendChild(name);

	const strength = document.createElement('li');
	strength.innerText = soldier.strength;
	strength.classList.add('strength');
	newSoldier.appendChild(strength);

	const health = document.createElement('li');
	health.innerText = soldier.health;
	health.classList.add('green');
	newSoldier.appendChild(health);

	return newSoldier;
}

//Renders all the soldiers in an army to the DOM. It creates a new ul element for each soldier using createSoldierElement(),
// and then appends the ul to the correct army div based on whether the army is the viking army or the saxon army.
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

//Creates four buttons for a game interface.
//These buttons allows the player to roll dice, attack, end turn, and access a shop)
function renderButtons() {
	const attackButton = document.createElement('button');
	const rollDiceButton = document.createElement('button');
	const endTurnButton = document.createElement('button');
	const shopButton = document.createElement('button');

	attackButton.textContent = 'Attack (15)';
	rollDiceButton.textContent = 'Roll Dice';
	endTurnButton.textContent = 'End Turn';
	shopButton.textContent = 'Shop';

	attackButton.addEventListener('click', () => {
		if (isPlayerTurn && attackCount === 0) {
			if (playersGold.one >= 15) {
				playersGold.one -= 15;
				battle(myArmy, enemyArmy);
				attackCount++;
				updateGold();
				setTimeout(() => endPlayerTurn(), 2000);
			} else {
				console.log('Not enough gold');
			}
		}
	});

	rollDiceButton.addEventListener('click', () => {
		if (diceThrowCount === 0 && isPlayerTurn) {
			const [dice1, dice2] = rollDice();
			const gold = dice1 * dice2;
			playersGold.one += gold;

			//  DOM element to hold the sentences
			const youRolled = document.createElement('h5');
			const youGained = document.createElement('h5');

			youRolled.innerText = `You rolled ${dice1} and ${dice2} `;
			youGained.innerText = `You gained ${gold} gold.`;

			setTimeout(() => diceRollText.append(youRolled), 100);
			setTimeout(() => diceRollText.append(youGained), 1200);

			setTimeout(() => {
				youRolled.remove();
			}, 4100);
			setTimeout(() => {
				youGained.remove();
			}, 6100);

			diceThrowCount++;
			setTimeout(() => updateGold(), 1200);
		}
	});

	endTurnButton.addEventListener('click', () => {
		if (isPlayerTurn && attackCount === 0) {
			endPlayerTurn();
		}
	});

	shopButton.addEventListener('click', () => {});

	const playerGold = document.createElement('h4');
	const enemyGold = document.createElement('h4');

	playerGold.innerText = `Gold: ${playersGold.one}`;
	enemyGold.innerText = `Gold: ${playersGold.two}`;

	document.getElementById('pointsDiv').append(playerGold, enemyGold);

	const buttonContainer = document.getElementById('buttonContainer');
	buttonContainer.append(attackButton, rollDiceButton, shopButton, endTurnButton);

	if (playerOne === 'Vikings') {
		rollDiceButton.classList.add('red');
		attackButton.classList.add('red');
		endTurnButton.classList.add('red');
		shopButton.classList.add('red');
		shopButton.classList.add('not-implemented');
		enemyGold.classList.add('red');
		playerGold.classList.add('yellow');
	} else {
		rollDiceButton.classList.add('yellow');
		attackButton.classList.add('yellow');
		endTurnButton.classList.add('yellow');
		shopButton.classList.add('yellow');
		shopButton.classList.add('not-implemented');
		enemyGold.classList.add('yellow');
		playerGold.classList.add('red');
	}
}

//Updates the health values of all the soldiers in both armies in the DOM.
//It iterates through the soldiers in each army and updates the corresponding li element with the soldier's current health value.
//It also removes any soldiers from the DOM whose health is zero or less.
function updateArmies() {
	let vikingHealthSum = 0;
	let saxonHealthSum = 0;

	vikings.forEach((viking) => {
		const vikingHealthElement = document.querySelector(`#${viking.name} li:nth-child(3)`);

		if (vikingHealthElement.innerText == 0) {
			vikingHealthElement.parentNode.remove();
		}

		vikingHealthElement.innerText = viking.health;
		vikingHealthSum += viking.health;
	});

	saxons.forEach((saxon) => {
		const saxonHealthElement = document.querySelector(`#${saxon.name} li:nth-child(3)`);

		if (saxonHealthElement.innerText == 0) {
			saxonHealthElement.parentNode.remove();
		}

		saxonHealthElement.innerText = saxon.health;
		saxonHealthSum += saxon.health;
	});

	totalHealthViking.innerText = vikingHealthSum;
	totalHealthSaxon.innerText = saxonHealthSum;
	if (gameFinished) {
		return;
	} else {
		if (totalHealthViking.innerText == 0) {
			displayVictoryText('Saxons win!');
			section.style.display = 'none';
			footer.style.display = 'flex';
			gameFinished = true;
		} else if (totalHealthSaxon.innerText == 0) {
			displayVictoryText('Vikings win!');
			section.style.display = 'none';
			footer.style.display = 'flex';
			gameFinished = true;
		}
	}
}

const playersGold = {
	one: 0,
	two: 0,
};

//Updates gold amount in the DOM
function updateGold() {
	const gold = document.querySelectorAll('h4');
	gold[0].innerText = `Gold: ${playersGold.two}`;
	gold[1].innerText = `Gold: ${playersGold.one}`;
}

//Simulates a battle between two armies by randomly selecting targets for soldiers in one army
//and removing them from the other army if their health drops to or below 0.
function battle(soldiers1, soldiers2) {
	for (let i = 0; i < soldiers1.length; i++) {
		const attacker = soldiers1[i];
		const targetIndex = Math.floor(Math.random() * soldiers2.length);
		const target = soldiers2[targetIndex];
		attacker.attack(target);
		if (target.health <= 0) {
			soldiers2.splice(targetIndex, 1);
			if (soldiers2.length === 0) {
				break; // stops the loop if all targets are dead
			}
		}
	}

	updateArmies();
}

function displayVictoryText(value) {
	const h1 = document.createElement('h1');
	h1.innerText = value;

	footer.appendChild(h1);
}

//Determines who will have the first turn based on whose army starts with less health
function decideTurn() {
	const vikingHealth = parseInt(totalHealthViking.innerText);
	const saxonHealth = parseInt(totalHealthSaxon.innerText);

	diceThrowCount = 0;
	attackCount = 0;

	if (vikingHealth < saxonHealth && playerOne === 'Vikings') {
		isPlayerTurn = true;
		yourTurnText.style.visibility = 'visible';
		enemyTurnText.style.visibility = 'hidden';
	} else if (saxonHealth < vikingHealth && playerOne === 'Saxons') {
		isPlayerTurn = true;
		yourTurnText.style.visibility = 'visible';
		enemyTurnText.style.visibility = 'hidden';
	} else {
		isPlayerTurn = false;
		yourTurnText.style.visibility = 'hidden';
		enemyTurnText.style.visibility = 'visible';
		enemyTurn();
	}
}
