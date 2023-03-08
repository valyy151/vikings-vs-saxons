let vikingHealthSum = 0;
let saxonHealthSum = 0;

let diceThrowCount = 1;
let attackCount = 1;

let gameFinished = false;

let isPlayerTurn;

let saxonSprites;
let vikingSprites;

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
		setTimeout(() => vikingMusic.play(), 1500);
	} else {
		isPlayerTurn = false;
		yourTurnText.className = 'dexterity';
		enemyTurnText.className = 'strength';
		saxonMusic.play();
	}

	renderSoldiers(vikings);
	renderSoldiers(saxons);
	renderButtons();
	updateArmies();
	whoGoesFirst();

	setTimeout(() => decideTurn(), 6000);
});

//Button that refreshes the page
newGameButton.addEventListener('click', () => location.reload());

summonReinforcementsButton.addEventListener('click', () => {
	if (isPlayerTurn && playersGold.one >= 100) {
		playersGold.one -= 100;
		summonReinforcements();
		shopDiv.classList.toggle('hidden');
	} else return false;
});

healButton.addEventListener('click', () => {
	if (isPlayerTurn && playersGold.one >= 30) {
		playersGold.one -= 30;
		updateGold();
		printHealMessage(playerOne);
		healArmy(myArmy);
		shopDiv.classList.toggle('hidden');
	} else return false;
});

arrowBarrageButton.addEventListener('click', () => {
	if (isPlayerTurn && playersGold.one >= 10) {
		playersGold.one -= 10;
		updateGold();
		printArrowBarrageMessage(playerOne);
		arrowBarrage(enemyArmy);
		shopDiv.classList.toggle('hidden');
	} else return false;
});

volatileButton.addEventListener('click', () => {
	if (isPlayerTurn && playersGold.one >= 50) {
		playersGold.one -= 50;
		updateGold();
		printVolatileMessage(playerOne);
		volatileSelection(myArmy);
		shopDiv.classList.toggle('hidden');
	}
});

//Ends the current player's turn and switches to the other enemy's turn. It also calls enemyTurn() if it's the enemy's turn.
function endPlayerTurn() {
	if (totalHealthSaxon.innerText == 0 || totalHealthViking.innerText == 0) {
		return false;
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

		setTimeout(() => enemyRolled.remove(), 5000);
		setTimeout(() => enemyGained.remove(), 5000);

		setTimeout(() => updateGold(), 1200);
	}, 2000);

	setTimeout(() => {
		if (playersGold.two >= 50) {
			playersGold.two -= 50;
			printVolatileMessage(playerTwo);
			volatileSelection(enemyArmy);
			setTimeout(() => endPlayerTurn(), 8000);
		} else if (playersGold.two >= 30) {
			playersGold.two -= 30;
			printHealMessage(playerTwo);
			healArmy(enemyArmy);
			setTimeout(() => endPlayerTurn(), 4000);
		} else if (playersGold.two >= 15) {
			printAttackMessage(playerTwo);
			playersGold.two -= 15;
			enemyAttack();
		} else if (playersGold.two >= 10) {
			playersGold.two -= 10;
			printArrowBarrageMessage(playerTwo);
			arrowBarrage(myArmy);
			setTimeout(() => {
				endPlayerTurn();
			}, 9000);
		} else endPlayerTurn();
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

	const sprite = document.createElement('li');
	newSoldier.appendChild(sprite);

	return newSoldier;
}

//Renders all the soldiers in an army to the DOM. It creates a new ul element for each soldier using createSoldierElement(),
// and then appends the ul to the correct army div based on whether the army is the viking army or the saxon army.
function renderSoldiers(army) {
	army.forEach((soldier) => {
		const newSoldier = createSoldierElement(soldier);
		if (army === saxons) {
			newSoldier.children[3].classList.add('saxon-sprite');

			saxonArmy.appendChild(newSoldier);
		} else if (army === vikings) {
			newSoldier.children[3].classList.add('viking-sprite');

			vikingArmy.appendChild(newSoldier);
		}
	});

	saxonSprites = document.querySelectorAll('.saxon-sprite');
	vikingSprites = document.querySelectorAll('.viking-sprite');

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
		if (isPlayerTurn && attackCount === 0 && playersGold.one >= 15) {
			printAttackMessage(playerOne);
			setTimeout(() => {
				playersGold.one -= 15;
				battle(myArmy, enemyArmy);
				attackCount++;
				updateGold();
				setTimeout(() => endPlayerTurn(), (enemyArmy.length + 2) * 600);
			}, 2000);
		} else {
			console.log('Not enough gold');
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
			}, 5100);

			diceThrowCount++;
			setTimeout(() => updateGold(), 1200);
		}
	});

	endTurnButton.addEventListener('click', () => {
		if (isPlayerTurn && attackCount === 0) {
			endPlayerTurn();
		}
	});

	shopButton.addEventListener('click', () => {
		shopDiv.classList.toggle('hidden');
	});

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
		shopButton.classList.add('red');
		enemyGold.classList.add('strength');
		playerGold.classList.add('dexterity');
	} else {
		rollDiceButton.classList.add('yellow');
		attackButton.classList.add('yellow');
		endTurnButton.classList.add('yellow');
		shopButton.classList.add('yellow');
		shopButton.classList.add('yellow');
		enemyGold.classList.add('dexterity');
		playerGold.classList.add('strength');
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
		const vikingStrengthElement = document.querySelector(`#${viking.name} li:nth-child(2)`);

		if (parseInt(vikingHealthElement.textContent) <= 0) {
			vikingHealthElement.parentNode.remove();
		}

		vikingHealthElement.textContent = viking.health;
		vikingStrengthElement.textContent = viking.strength;
		vikingHealthSum += viking.health;
	});

	saxons.forEach((saxon) => {
		const saxonHealthElement = document.querySelector(`#${saxon.name} li:nth-child(3)`);
		const saxonStrengthElement = document.querySelector(`#${saxon.name} li:nth-child(2)`);

		if (parseInt(saxonHealthElement.textContent) <= 0) {
			saxonHealthElement.parentNode.remove();
		}

		saxonHealthElement.textContent = saxon.health;
		saxonStrengthElement.textContent = saxon.strength;
		saxonHealthSum += saxon.health;
	});

	totalHealthViking.textContent = vikingHealthSum;
	totalHealthSaxon.textContent = saxonHealthSum;
	if (gameFinished) {
		return;
	} else {
		if (totalHealthViking.textContent == 0) {
			setTimeout(() => {
				displayVictoryText('Saxons win!');
				section.style.display = 'none';
				footer.style.display = 'flex';
				gameFinished = true;
			}, 4000);
		} else if (totalHealthSaxon.textContent == 0) {
			setTimeout(() => {
				displayVictoryText('Vikings win!');
				section.style.display = 'none';
				footer.style.display = 'flex';
				gameFinished = true;
			}, 4000);
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
function battle(army1, army2) {
	let i = 0;

	const intervalId = setInterval(() => {
		if (i >= army2.length) {
			clearInterval(intervalId);
			updateArmies();
			return;
		}

		const attacker = army1[Math.floor(Math.random() * army1.length)];
		const target = army2[i];
		attacker.attack(target, 1600);

		if (target.health <= 0) {
			army2.splice(i, 1);
			i--;
		}

		i++;
		updateArmies();
	}, 500);
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

function whoGoesFirst() {
	const vikingHealth = parseInt(totalHealthViking.innerText);
	const saxonHealth = parseInt(totalHealthSaxon.innerText);
	const message = document.createElement('h2');
	if (vikingHealth < saxonHealth && playerOne === 'Vikings') {
		setTimeout(() => {
			message.innerText = 'You go first.';
			diceRollText.appendChild(message);
		}, 3000);
	} else if (saxonHealth < vikingHealth && playerOne === 'Saxons') {
		setTimeout(() => {
			message.innerText = 'You go first.';
			diceRollText.appendChild(message);
		}, 3000);
	} else {
		isPlayerTurn = false;

		setTimeout(() => {
			message.innerText = 'Enemy goes first.';
			diceRollText.appendChild(message);
		}, 3000);
	}

	setTimeout(() => message.remove(), 6000);
}

function renderDamageMessage(message, duration) {
	const damageElement = document.createElement('p');

	if (isPlayerTurn && playerOne === 'Vikings') {
		damageElement.classList.add('dexterity');
		damageElement.innerText = message;

		damageContainerPlayer.appendChild(damageElement);
	}

	if (isPlayerTurn && playerOne === 'Saxons') {
		damageElement.classList.add('strength');
		damageElement.innerText = message;

		damageContainerPlayer.appendChild(damageElement);
	}

	if (!isPlayerTurn && playerTwo === 'Vikings') {
		damageElement.classList.add('dexterity');
		damageElement.innerText = message;

		damageContainerEnemy.appendChild(damageElement);
	}
	if (!isPlayerTurn && playerTwo === 'Saxons') {
		damageElement.classList.add('strength');
		damageElement.innerText = message;

		damageContainerEnemy.appendChild(damageElement);
	}

	damageElement.style.transition = 'opacity 0.9s ease-in-out';

	damageElement.getBoundingClientRect();

	damageElement.style.opacity = 1;

	setTimeout(() => {
		damageElement.style.opacity = 0;

		// add transitionend event listener to remove the element after the transition
		damageElement.addEventListener('transitionend', () => {
			damageElement.remove();
		});
	}, duration);
}

function enemyAttack() {
	setTimeout(() => {
		battle(enemyArmy, myArmy);

		updateGold();

		setTimeout(() => endPlayerTurn(), (myArmy.length + 2) * 600);
	}, 2000);
}

function arrowBarrage(army) {
	updateGold();
	if (!isPlayerTurn) {
		army = myArmy;
	}
	let barragesLeft = 3;

	const intervalId = setInterval(() => {
		updateArmies();
		let index = 0;

		const soldierIntervalId = setInterval(() => {
			const soldier = army[index];

			if (soldier) {
				soldier.receiveDamage(5, 500);
				updateArmies();

				if (soldier.health <= 0) {
					army.splice(index, 1);
					updateArmies();
				} else {
					index++;
				}
			} else {
				clearInterval(soldierIntervalId);
			}
		}, 25);

		barragesLeft--;
		if (barragesLeft === 0 || army.length === 0) {
			clearInterval(intervalId);
			updateArmies();
		}
	}, 2000);

	updateArmies();
}

function healArmy(army) {
	setTimeout(() => {
		army.forEach((soldier) => (soldier.health = soldier.health + 25));
		updateArmies();
		updateGold();
	}, 3000);
}

function volatileSelection(army) {
	if (!isPlayerTurn) {
		army = enemyArmy;

		setTimeout(() => {
			const number = Math.floor(Math.random() * 3) + 1;
			if (number === 1) {
				damageBoost(army);
				printAttackBoostMessage(playerTwo);
			} else if (number === 2) {
				printEvasionBoostMessage(playerTwo);
				evasionBoost(army);
			} else if (number === 3) {
				printBlockBoostMessage(playerTwo);
				blockBoost(army);
			}
			updateGold();
		}, 4000);
	} else {
		setTimeout(() => {
			const number = Math.floor(Math.random() * 3) + 1;
			if (number === 1) {
				printAttackBoostMessage(playerOne);
				damageBoost(army);
			} else if (number === 2) {
				printEvasionBoostMessage(playerOne);
				evasionBoost(army);
			} else if (number === 3) {
				printBlockBoostMessage(playerOne);
				blockBoost(army);
			}
			updateGold();
		}, 4000);
	}
}

function summonReinforcements(army) {
	if (army === playerOne) {
		if (playerOne === 'Vikings') {
			vikingReinforcements.forEach((viking) => {
				const newSoldier = createSoldierElement(viking);
				vikings.push(viking);
				vikingArmy.appendChild(newSoldier);
			});
		}
		if (playerOne === 'Saxons') {
			saxonReinforcements.forEach((saxon) => {
				const newSoldier = createSoldierElement(saxon);
				saxons.push(saxon);
				saxonArmy.appendChild(newSoldier);
			});
		}
		yourArmyDiv.querySelectorAll('ul').forEach((ul) => (ul.style.flexDirection = 'column-reverse'));
	} else if (army === playerTwo) {
		if (playerTwo === 'Vikings') {
			vikingReinforcements.forEach((viking) => {
				const newSoldier = createSoldierElement(viking);
				vikings.push(viking);
				vikingArmy.appendChild(newSoldier);
			});
		}
		if (playerTwo === 'Saxons') {
			saxonReinforcements.forEach((saxon) => {
				const newSoldier = createSoldierElement(saxon);
				saxons.push(saxon);
				saxonArmy.appendChild(newSoldier);
			});
		}

		updateArmies();
		updateGold();
	}
}

function damageBoost(army) {
	army.forEach((soldier) => (soldier.strength = soldier.strength + 25));
	updateArmies();
}

function evasionBoost(army) {
	army.forEach((soldier) => (soldier.evasionChance = Number((soldier.evasionChance + 0.15).toFixed(2))));
	updateArmies();
}

function blockBoost(army) {
	army.forEach((soldier) => (soldier.blockDamageReduction = Number((soldier.blockDamageReduction - 0.5).toFixed(2))));
	updateArmies();
}

function printAttackMessage(attacker) {
	const message = document.createElement('h1');
	if (attacker === playerOne) {
		message.innerText = 'You decide to Attack enemy forces!';
	} else if (attacker === playerTwo) {
		message.innerText = 'Enemy decides to Attack your forces!';
	}

	diceRollText.append(message);

	setTimeout(() => {
		message.remove();
	}, 2000);
}

function printArrowBarrageMessage(attacker) {
	const message = document.createElement('h1');
	if (attacker === playerOne) {
		message.innerText = 'You decide to Rain the enemy with arrows!';
	} else if (attacker === playerTwo) {
		message.innerText = 'Enemy decides to Rain you with arrows!';
	}

	diceRollText.append(message);

	setTimeout(() => {
		message.remove();
	}, 2000);
}

function printHealMessage(attacker) {
	const message = document.createElement('h1');
	if (attacker === playerOne) {
		message.innerText = 'You decide to Heal your forces!';
	} else if (attacker === playerTwo) {
		message.innerText = 'Enemy decides to Heal his forces!';
	}

	diceRollText.append(message);

	setTimeout(() => {
		message.remove();
	}, 3000);
}

function printVolatileMessage(attacker) {
	const message = document.createElement('h1');
	if (attacker === playerOne) {
		message.innerText = 'You invoke Volatile Selection!';
	} else if (attacker === playerTwo) {
		message.innerText = 'Enemy invokes Volatile Selection!';
	}

	diceRollText.append(message);

	setTimeout(() => {
		message.remove();
	}, 4000);
}

function printEvasionBoostMessage(attacker) {
	const message = document.createElement('h1');
	if (attacker === playerOne) {
		message.innerText = 'You get 15% Evasion Boost on all soldiers!';
	} else if (attacker === playerTwo) {
		message.innerText = 'Enemy gets 15% Evasion Boost on all soldiers!';
	}

	diceRollText.append(message);

	setTimeout(() => {
		message.remove();
	}, 2000);
}

function printAttackBoostMessage(attacker) {
	const message = document.createElement('h1');
	if (attacker === playerOne) {
		message.innerText = 'You get +25 Damage Boost on all soldiers!';
	} else if (attacker === playerTwo) {
		message.innerText = 'Enemy gets +25 Damage Boost on all soldiers!';
	}

	diceRollText.append(message);

	setTimeout(() => {
		message.remove();
	}, 2000);
}

function printBlockBoostMessage(attacker) {
	const message = document.createElement('h1');
	if (attacker === playerOne) {
		message.innerText = 'You get +50 % Damage Block on all soldiers!';
	} else if (attacker === playerTwo) {
		message.innerText = 'Enemy gets +50 % Damage Block on all soldiers!';
	}
	diceRollText.append(message);

	setTimeout(() => {
		message.remove();
	}, 2000);
}

setInterval(() => {
	saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/saxon/ready_1.png')"));
	setTimeout(() => {
		saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/saxon/ready_2.png')"));
	}, 300);
	setTimeout(() => {
		saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/saxon/ready_3.png')"));
	}, 600);
}, 900);
setInterval(() => {
	vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/viking/ready_1.png')"));
	setTimeout(() => {
		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/viking/ready_2.png')"));
	}, 150);
	setTimeout(() => {
		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/viking/ready_3.png')"));
	}, 300);
	setTimeout(() => {
		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/viking/ready_4.png')"));
	}, 450);
	setTimeout(() => {
		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('../images/viking/ready_5.png')"));
	}, 600);
}, 750);
