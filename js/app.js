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

//Renders all the soldiers in an army to the DOM. It creates a new ul element for each soldier,
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

//Creates four buttons for a game interface, and gold counter on the side.
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
			playersGold.one -= 15;
			updateGold();
			hornSound1.volume = 0.5;
			hornSound1.play();
			printMessage(playerOne, 'decide to Attack enemy forces!', 4000);
			setTimeout(() => {
				battle(myArmy, enemyArmy);
				attackCount++;
				setTimeout(() => endPlayerTurn(), (enemyArmy.length + 4) * 700);
			}, 2000);
		} else {
			console.log('Not enough gold');
		}
	});

	rollDiceButton.addEventListener('click', () => {
		if (diceThrowCount === 0 && isPlayerTurn) {
			const [dice1, dice2] = rollDice();
			let gold = dice1 * dice2;
			if (dice1 === dice2) {
				gold = gold * 2;
			}
			playersGold.one += gold;

			//  DOM element to hold the sentences
			const youRolled = document.createElement('h5');
			const youGained = document.createElement('h5');

			youRolled.innerText = `You rolled ${dice1} and ${dice2} `;
			youGained.innerText = `You gained ${gold} gold.`;

			setTimeout(() => {
				diceSound.play();
				diceRollText.append(youRolled);
			}, 100);
			setTimeout(() => {
				coinSound.play();
				diceRollText.append(youGained);
			}, 1200);

			setTimeout(() => {
				youRolled.remove();
			}, 4100);
			setTimeout(() => {
				youGained.remove();
			}, 4100);

			diceThrowCount++;
			setTimeout(() => updateGold(), 1200);
		}
	});

	endTurnButton.addEventListener('click', () => {
		if (isPlayerTurn) {
			endPlayerTurn();
		}
	});

	shopButton.addEventListener('click', () => {
		if (shopClosed) {
			shopOpenSound.currentTime = 0.4;
			shopOpenSound.play();
			shopDiv.classList.toggle('hidden');
			shopClosed = !shopClosed;
		} else if (!shopClosed) {
			shopCloseSound.currentTime = 0.3;
			shopCloseSound.play();
			shopDiv.classList.toggle('hidden');
			shopClosed = !shopClosed;
		}
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
		enemyGold.classList.add('strength2');
		playerGold.classList.add('dexterity2');
	} else {
		rollDiceButton.classList.add('yellow');
		attackButton.classList.add('yellow');
		endTurnButton.classList.add('yellow');
		shopButton.classList.add('yellow');
		shopButton.classList.add('yellow');
		enemyGold.classList.add('dexterity2');
		playerGold.classList.add('strength2');
	}
}

//Decides the first turn of the game
function decideTurn(player) {
	diceThrowCount = 0;
	attackCount = 0;

	setTimeout(() => {
		if (player === playerOne) {
			isPlayerTurn = true;
			yourTurnSound.play();
			yourTurnText.style.visibility = 'visible';
			enemyTurnText.style.visibility = 'hidden';
		} else if (player === playerTwo) {
			isPlayerTurn = false;
			enemyTurnSound.currentTime = 0.8;
			enemyTurnSound.play();
			yourTurnText.style.visibility = 'hidden';
			enemyTurnText.style.visibility = 'visible';
			enemyTurn();
		}
	}, 3000);
}

//Renders message saying which player will have the first turn, runs decideTurn() after that.
function whoGoesFirst() {
	const vikingHealth = parseInt(totalHealthViking.innerText);
	const saxonHealth = parseInt(totalHealthSaxon.innerText);
	const message = document.createElement('h2');
	if (vikingHealth < saxonHealth && playerOne === 'Vikings') {
		setTimeout(() => {
			message.innerText = 'You go first.';
			diceRollText.appendChild(message);
			decideTurn(playerOne);
		}, 3000);
	} else if (saxonHealth < vikingHealth && playerOne === 'Saxons') {
		setTimeout(() => {
			message.innerText = 'You go first.';
			diceRollText.appendChild(message);
			decideTurn(playerOne);
		}, 3000);
	} else {
		isPlayerTurn = false;

		setTimeout(() => {
			decideTurn(playerTwo);
			message.innerText = 'Enemy goes first.';
			diceRollText.appendChild(message);
		}, 3000);
	}

	setTimeout(() => message.remove(), 6000);
}

//Updates the health values of all the soldiers in both armies in the DOM.
//It also removes any soldiers from the DOM whose health is zero or less.
function updateArmies() {
	let vikingHealthSum = 0;
	let saxonHealthSum = 0;

	vikings.forEach((viking) => {
		const vikingHealthElement = document.querySelector(`#${viking.name} li:nth-child(3)`);
		const vikingStrengthElement = document.querySelector(`#${viking.name} li:nth-child(2)`);
		const vikingSprite = document.querySelector(`#${viking.name} li:nth-child(4)`);
		if (vikingHealthElement !== null) {
			vikingHealthElement.textContent = viking.health;
			vikingStrengthElement.textContent = viking.strength;
			if (parseInt(vikingHealthElement.textContent) <= 0) {
				vikingHealthElement.textContent = 0;

				setTimeout(() => vikingHealthElement.parentNode.remove(), 1500);
			}
		}

		vikingHealthSum += viking.health;
	});

	saxons.forEach((saxon) => {
		const saxonHealthElement = document.querySelector(`#${saxon.name} li:nth-child(3)`);
		const saxonStrengthElement = document.querySelector(`#${saxon.name} li:nth-child(2)`);
		const saxonSprite = document.querySelector(`#${saxon.name} li:nth-child(4)`);
		if (saxonHealthElement !== null) {
			saxonHealthElement.textContent = saxon.health;
			saxonStrengthElement.textContent = saxon.strength;
			if (parseInt(saxonHealthElement.textContent) <= 0) {
				saxonHealthElement.textContent = 0;

				setTimeout(() => saxonHealthElement.parentNode.remove(), 1500);
			}
		}

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

//Updates gold amount in the DOM
function updateGold() {
	const gold = document.querySelectorAll('h4');
	gold[0].innerText = `Gold: ${playersGold.two}`;
	gold[1].innerText = `Gold: ${playersGold.one}`;
}

//Rolls two dice and returns an array with the results.
function rollDice() {
	dice1 = Math.round(Math.random() * 5) + 1;
	dice2 = Math.round(Math.random() * 5) + 1;

	return [dice1, dice2];
}

//Ends the current player's turn and switches to the other player's turn.
function endPlayerTurn() {
	if (totalHealthSaxon.innerText == 0 || totalHealthViking.innerText == 0) {
		return false;
	} else {
		isPlayerTurn = !isPlayerTurn;
		if (isPlayerTurn) {
			yourTurnSound.play();
			yourTurnText.style.visibility = 'visible';
			enemyTurnText.style.visibility = 'hidden';

			diceThrowCount = 0;
			attackCount = 0;
		} else {
			enemyTurnSound.currentTime = 0.7;
			enemyTurnSound.play();
			yourTurnText.style.visibility = 'hidden';
			enemyTurnText.style.visibility = 'visible';
			enemyTurn();
		}
	}
}

//Simulates the behavior of the enemy when it's their turn.
function enemyTurn() {
	const [dice1, dice2] = rollDice();
	let gold = dice1 * dice2;
	if (dice1 === dice2) {
		gold = gold * 2;
	}

	setTimeout(() => {
		const enemyRolled = document.createElement('h6');
		const enemyGained = document.createElement('h6');

		enemyRolled.innerText = `Enemy rolled ${dice1} and ${dice2} `;
		enemyGained.innerText = `Enemy gained ${gold} gold.`;

		playersGold.two += gold;

		setTimeout(() => {
			diceSound.play();
			diceRollText.append(enemyRolled);
		}, 100);
		setTimeout(() => {
			coinSound.play();
			diceRollText.append(enemyGained);
		}, 1200);

		setTimeout(() => enemyRolled.remove(), 5000);
		setTimeout(() => enemyGained.remove(), 5000);

		setTimeout(() => updateGold(), 1200);
	}, 2000);

	setTimeout(() => {
		if (playersGold.two >= 60) {
			playersGold.two -= 60;
			printMessage(playerTwo, 'decides to Summon Reinforcements!');
			updateGold();
			marchSound.play();
			setTimeout(() => {
				marchSound.pause();
				marchSound.currentTime = 0;
			}, 3000);
			setTimeout(() => summonReinforcements(playerTwo), 2000);
			setTimeout(() => endPlayerTurn(), 3000);
		} else if (playersGold.two >= 50) {
			playersGold.two -= 50;
			printMessage(playerTwo, 'invokes Volatile Selection!', 4000);
			updateGold();
			volatileSelection(enemyArmy);
			volatileSound.play();
			setTimeout(() => {
				volatileSound.pause();
				volatileSound.currentTime = 0;
			}, 7500);
			setTimeout(() => endPlayerTurn(), 8000);
		} else if (playersGold.two >= 30) {
			playersGold.two -= 30;
			printMessage(playerTwo, 'decides to Heal his soldiers!');
			updateGold();
			healSound.play();
			setTimeout(() => {
				healSound.pause();
				healSound.currentTime = 0;
			}, 2000);
			healArmy(enemyArmy);
			setTimeout(() => endPlayerTurn(), 4000);
		} else if (playersGold.two >= 15) {
			printMessage(playerTwo, 'decides to Attack your forces! ', 4000);
			playersGold.two -= 15;
			updateGold();
			hornSound.play();
			enemyAttack();
		} else if (playersGold.two >= 10) {
			playersGold.two -= 10;
			updateGold();
			printMessage(playerTwo, 'decides to Rain Arrows upon you!');
			arrowBarrage(myArmy);
			arrowBarrage(enemyArmy);
			arrowVolley.currentTime = 2.8;
			arrowVolley.play();
			setTimeout(() => {
				arrowVolley.pause;
				arrowVolley.currentTime = 8.3;
			}, 2000);
			setTimeout(() => {
				arrowVolley.play();
			}, 2500);
			setTimeout(() => {
				arrowVolley.pause;
				arrowVolley.currentTime = 8.3;
			}, 4000);
			setTimeout(() => {
				arrowVolley.play();
			}, 4500);
			setTimeout(() => {
				arrowVolley.pause;
				arrowVolley.currentTime = 8.3;
			}, 6000);
			setTimeout(() => {
				endPlayerTurn();
			}, 9000);
		} else endPlayerTurn();
	}, 7000);
}

//Enemy calls the battle functions and ends his turn.
function enemyAttack() {
	setTimeout(() => {
		battle(enemyArmy, myArmy);

		updateGold();

		setTimeout(() => endPlayerTurn(), (myArmy.length + 3) * 700);
	}, 2000);
}

//Simulates a battle between two armies by randomly selecting targets for soldiers in one army
//and removing them from the other army if their health drops to or below 0.
function battle(army1, army2) {
	let i = 0;
	setTimeout(() => {
		attackAnimationSaxon();
		attackAnimationViking();
	}, 500);

	setTimeout(() => {
		battleSounds.play();
		if (playerOne === 'Saxons') {
			saxonSprites.forEach((sprite) => (sprite.style.bottom = 23 + 'vh'));
			vikingSprites.forEach((sprite) => (sprite.style.top = 23 + 'vh'));
		}

		if (playerOne === 'Vikings') {
			saxonSprites.forEach((sprite) => (sprite.style.top = 23 + 'vh'));
			vikingSprites.forEach((sprite) => (sprite.style.bottom = 23 + 'vh'));
		}

		const intervalId = setInterval(() => {
			const randomNumber = Math.random();
			if (i >= army2.length) {
				clearInterval(intervalId);

				setTimeout(() => {
					idleAnimationSaxon();
					idleAnimationViking();
				}, 1000);

				setTimeout(() => {
					if (playerOne === 'Saxons') {
						setTimeout(() => {
							saxonSprites.forEach((sprite) => (sprite.style.bottom = 0 + 'vh'));
							vikingSprites.forEach((sprite) => (sprite.style.top = 0 + 'vh')), 1500;
						});
					}

					if (playerOne === 'Vikings') {
						setTimeout(() => {
							saxonSprites.forEach((sprite) => (sprite.style.top = 0 + 'vh'));
							vikingSprites.forEach((sprite) => (sprite.style.bottom = 0 + 'vh')), 1500;
						});
					}

					updateArmies();
					battleSounds.pause();
					battleSounds.currentTime = 0;

					return;
				}, 2000);
			}

			const attacker = army1[Math.floor(Math.random() * army1.length)];
			const target = army2[i];
			if (attacker.constructor.name === 'Saxon' && randomNumber < 0.06) {
				attacker.poison(target, 300);
			}
			attacker.attack(target, 1600);

			if (target.health <= 0) {
				army2.splice(i, 1);
				i--;
			}

			i++;
			updateArmies();
		}, 500);
	}, 2000);
}

//Prints either "Vikings win!" or "Saxons win!" when the game ends.
function displayVictoryText(value) {
	const h1 = document.createElement('h1');
	h1.innerText = value;

	footer.appendChild(h1);
}

//Creates a new element with the provided message and appends it to the appropriate damage container.
function printDamageMessage(message, duration) {
	const damageElement = document.createElement('p');

	if (isPlayerTurn && playerOne === 'Vikings') {
		damageElement.classList.add('dexterity2');
		damageElement.innerText = message;

		damageContainerPlayer.appendChild(damageElement);
	}

	if (isPlayerTurn && playerOne === 'Saxons') {
		damageElement.classList.add('strength2');
		damageElement.innerText = message;

		damageContainerPlayer.appendChild(damageElement);
	}

	if (!isPlayerTurn && playerTwo === 'Vikings') {
		damageElement.classList.add('dexterity2');
		damageElement.innerText = message;

		damageContainerEnemy.appendChild(damageElement);
	}
	if (!isPlayerTurn && playerTwo === 'Saxons') {
		damageElement.classList.add('strength2');
		damageElement.innerText = message;

		damageContainerEnemy.appendChild(damageElement);
	}

	setTimeout(() => {
		damageElement.remove();
	}, duration);
}

function printMessage(attacker, message, duration) {
	const messageEl = document.createElement('h1');
	if (attacker === playerOne) {
		messageEl.innerText = `You ${message}`;
	} else if (attacker === playerTwo) {
		messageEl.innerText = `Enemy ${message}`;
	}
	diceRollText.append(messageEl);
	setTimeout(() => {
		messageEl.remove();
	}, duration || 2000);
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
				soldier.receiveDamage(5, 150);
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
		}, 50);

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

function summonReinforcements(army) {
	if (army === playerOne) {
		if (playerOne === 'Vikings') {
			vikingReinforcements.forEach((viking) => {
				const newSoldier = createSoldierElement(viking);

				newSoldier.children[3].classList.add('viking-sprite');
				setTimeout(() => {
					saxonSprites = document.querySelectorAll('.saxon-sprite');
					vikingSprites = document.querySelectorAll('.viking-sprite');
				}, 200);

				setTimeout(() => {
					idleAnimationSaxon();
					idleAnimationViking();
				}, 300);

				vikings.push(viking);
				vikingArmy.appendChild(newSoldier);
			});
		}
		if (playerOne === 'Saxons') {
			saxonReinforcements.forEach((saxon) => {
				const newSoldier = createSoldierElement(saxon);

				newSoldier.children[3].classList.add('saxon-sprite');
				setTimeout(() => {
					saxonSprites = document.querySelectorAll('.saxon-sprite');
					vikingSprites = document.querySelectorAll('.viking-sprite');
					idleAnimationSaxon();
				}, 500);
				setTimeout(() => {
					idleAnimationSaxon();
					idleAnimationViking();
				}, 750);

				saxons.push(saxon);
				saxonArmy.appendChild(newSoldier);
			});
		}
		yourArmyDiv.querySelectorAll('ul').forEach((ul) => (ul.style.flexDirection = 'column-reverse'));
	} else if (army === playerTwo) {
		if (playerTwo === 'Vikings') {
			vikingReinforcements.forEach((viking) => {
				const newSoldier = createSoldierElement(viking);
				newSoldier.children[3].classList.add('viking-sprite');
				setTimeout(() => {
					saxonSprites = document.querySelectorAll('.saxon-sprite');
					vikingSprites = document.querySelectorAll('.viking-sprite');
				}, 500);
				setTimeout(() => {
					idleAnimationSaxon();
					idleAnimationViking();
				}, 750);
				vikings.push(viking);
				vikingArmy.appendChild(newSoldier);
			});
		}
		if (playerTwo === 'Saxons') {
			saxonReinforcements.forEach((saxon) => {
				const newSoldier = createSoldierElement(saxon);
				newSoldier.children[3].classList.add('saxon-sprite');
				setTimeout(() => {
					saxonSprites = document.querySelectorAll('.saxon-sprite');
					vikingSprites = document.querySelectorAll('.viking-sprite');
				}, 500);
				setTimeout(() => {
					idleAnimationSaxon();
					idleAnimationViking();
				}, 750);

				saxons.push(saxon);
				saxonArmy.appendChild(newSoldier);
			});
		}

		updateArmies();
		updateGold();
	}
}

//Randomly selects an attack boost, evasion boost or block boost,
// and applies it to either the player's army or the enemy's army depending on whose turn it is.
function volatileSelection(army) {
	if (!isPlayerTurn) {
		army = enemyArmy;

		setTimeout(() => {
			const number = Math.floor(Math.random() * 3) + 1;
			if (number === 1) {
				damageBoost(army);
				printMessage(playerTwo, 'gets +25 Damage Boost on all soldiers!');
			} else if (number === 2) {
				printMessage(playerTwo, 'gets 15% Evasion Boost on all soldiers!');
				evasionBoost(army);
			} else if (number === 3) {
				printMessage(playerTwo, 'gets +50 % Damage Block on all soldiers!');
				blockBoost(army);
			}
			updateGold();
		}, 4000);
	} else {
		setTimeout(() => {
			const number = Math.floor(Math.random() * 3) + 1;
			if (number === 1) {
				printMessage(playerOne, 'get +25 Damage Boost on all soldiers!');
				damageBoost(army);
			} else if (number === 2) {
				printMessage(playerOne, 'get 15% Evasion Boost on all soldiers!');
				evasionBoost(army);
			} else if (number === 3) {
				printMessage(playerOne, 'get +50 % Damage Block on all soldiers!');
				blockBoost(army);
			}
			updateGold();
		}, 4000);
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

function mute() {
	isMuted = !isMuted;
	vikingMusic.volume = 0;
	saxonMusic.volume = 0;
	battleSounds.volume = 0;
	arrowVolley.volume = 0;
	diceSound.volume = 0;
	coinSound.volume = 0;
	shopOpenSound.volume = 0;
	shopCloseSound.volume = 0;
	yourTurnSound.volume = 0;
	enemyTurnSound.volume = 0;
	healSound.volume = 0;
	hornSound.volume = 0;
	hornSound1.volume = 0;
	volatileSound.volume = 0;
}

function unmute() {
	isMuted = !isMuted;
	vikingMusic.volume = 0.1;
	saxonMusic.volume = 0.1;
	battleSounds.volume = 0.3;
	arrowVolley.volume = 0.4;
	diceSound.volume = 0.5;
	coinSound.volume = 0.5;
	shopOpenSound.volume = 0.5;
	shopCloseSound.volume = 0.5;
	yourTurnSound.volume = 0.5;
	enemyTurnSound.volume = 0.5;
	healSound.volume = 0.5;
	hornSound.volume = 0.5;
	hornSound1.volume = 0.5;
	volatileSound.volume = 0.5;
}

function idleAnimationSaxon() {
	clearInterval(idleIntervalSaxon);
	idleIntervalSaxon = setInterval(() => {
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/ready_1.png')"));
		}, 200);

		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/ready_2.png')"));
		}, 500);
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/ready_3.png')"));
		}, 800);
	}, 1100);
}

function idleAnimationViking() {
	clearInterval(idleIntervalViking);
	idleIntervalViking = setInterval(() => {
		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_1.png')"));
		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_3.png')"));
		}, 300);
		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_5.png')"));
		}, 600);
	}, 900);
}

function attackAnimationSaxon() {
	clearInterval(idleIntervalSaxon);
	idleIntervalSaxon = setInterval(() => {
		saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/attack1_1.png')"));
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/attack1_2.png')"));
		}, 400);

		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/attack1_3.png')"));
		}, 600);
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/attack1_4.png')"));
		}, 1000);
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/attack1_5.png')"));
		}, 1200);
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/attack1_6.png')"));
		}, 1800);
	}, 2200);
}

function attackAnimationViking() {
	clearInterval(idleIntervalViking);
	idleIntervalViking = setInterval(() => {
		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/attack1_1.png')"));

		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/attack1_3.png')"));
		}, 400);
		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/attack1_4.png')"));
		}, 800);
		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/attack1_5.png')"));
		}, 1200);
		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/attack1_6.png')"));
		}, 1600);
	}, 2000);
}
