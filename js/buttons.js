//Button that assigns which team you will be based on the choice you made
startBattleButton.addEventListener('click', () => {
	unmute();
	const team = players[selectTeam.value];

	playerOne = team.playerOne;
	playerTwo = team.playerTwo;
	yourArmyDiv = team.yourArmyDiv;
	myArmy = team.myArmy;
	enemyArmy = team.enemyArmy;

	console.log(`Your Team is ${playerOne} and the Enemy Team is ${playerTwo}`);

	header.style.display = 'none';
	section.style.display = 'flex';
	muteButton.style.display = 'block';
	span.style.display = 'inline';
	leaveButton.style.display = 'block';

	if (selectTeam.value === '0') {
		isPlayerTurn = true;
		yourTurnText.className = 'strength2';
		enemyTurnText.className = 'dexterity2';
		setTimeout(() => vikingMusic.play(), 1500);
	} else {
		isPlayerTurn = false;
		yourTurnText.className = 'dexterity2';
		enemyTurnText.className = 'strength2';
		saxonMusic.play();
	}

	renderSoldiers(vikings);
	renderSoldiers(saxons);
	renderButtons();
	updateArmies();
	whoGoesFirst();
	idleAnimationSaxon();
	idleAnimationViking();

	setTimeout(() => decideTurn(), 6000);
});

//Gameplay buttons
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
	if (isPlayerTurn && !barrageActive) {
		endPlayerTurn();
	}
});

shopButton.addEventListener('click', () => {
	if (shopClosed) {
		shopOpenSound.currentTime = 0.4;
		shopOpenSound.play();
		shopDiv.classList.toggle('hidden');
		showWrapper.classList.toggle('hidden');
		shopClosed = !shopClosed;
	} else if (!shopClosed) {
		shopCloseSound.currentTime = 0.3;
		shopCloseSound.play();
		shopDiv.classList.toggle('hidden');
		showWrapper.classList.toggle('hidden');
		shopClosed = !shopClosed;
	}
});

//Homepage butons for instructions
instructionsButton.addEventListener('click', () => {
	header.style.display = 'none';
	article.style.display = 'flex';
	shopOpenSound.currentTime = 0.4;
	shopOpenSound.volume = 0.5;
	shopOpenSound.play();
});

creditsButton.addEventListener('click', () => {
	header.style.display = 'none';
	creditsArticle.style.display = 'flex';
	shopOpenSound.currentTime = 0.4;
	shopOpenSound.volume = 0.5;
	shopOpenSound.play();
});

instructionsInfo.addEventListener('click', () => {
	mainInstructions.style.display = 'flex';
	instructionsInfo.style.display = 'none';
	soldiersInfoButton.style.display = 'inline';
	soldiersInstructions.style.display = 'none';
	shopCloseSound.currentTime = 0.3;
	shopCloseSound.volume = 0.5;
	shopCloseSound.play();
});

soldiersInfoButton.addEventListener('click', () => {
	soldiersInstructions.style.display = 'flex';
	mainInstructions.style.display = 'none	';
	instructionsInfo.style.display = 'inline';
	soldiersInfoButton.style.display = 'none';
	shopCloseSound.currentTime = 0.3;
	shopCloseSound.volume = 0.5;
	shopCloseSound.play();
});

//Buttons located in the Shop
summonReinforcementsButton.addEventListener('click', () => {
	if (healCount === 0) {
		healCount++;
		if (isPlayerTurn && playersGold.one >= 60) {
			playersGold.one -= 60;
			updateGold();
			printMessage(playerOne, 'decide to Summon Reinforcements!');
			marchSound.play();
			setTimeout(() => {
				marchSound.pause();
				marchSound.currentTime = 0;
			}, 3000);
			setTimeout(() => {
				summonReinforcements(playerOne);
			}, 2000);
			shopCloseSound.currentTime = 0.3;
			shopCloseSound.play();
			shopDiv.classList.toggle('hidden');
		} else return false;
	}
});

healButton.addEventListener('click', () => {
	if (healCount === 0) {
		healCount++;
		if (isPlayerTurn && playersGold.one >= 30) {
			playersGold.one -= 30;
			updateGold();
			printMessage(playerOne, 'decide to Heal your soldiers!');
			healSound.play();
			setTimeout(() => {
				healSound.pause();
				healSound.currentTime = 0;
			}, 2000);
			healArmy(myArmy);
			shopCloseSound.currentTime = 0.3;
			shopCloseSound.play();
			shopDiv.classList.toggle('hidden');
		} else return false;
	}
});

arrowBarrageButton.addEventListener('click', () => {
	if (barrageCount === 0) {
		barrageCount++;
		if (isPlayerTurn && playersGold.one >= 10) {
			barrageActive = !barrageActive;
			setTimeout(() => {
				barrageActive = !barrageActive;
			}, 9000);
			playersGold.one -= 10;
			updateGold();
			printMessage(playerOne, 'decide to Rain Arrows upon the enemy!');
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

			shopCloseSound.currentTime = 0.3;
			shopCloseSound.play();
			shopDiv.classList.toggle('hidden');
		} else return false;
	}
});

volatileButton.addEventListener('click', () => {
	if (volatileCount === 0) {
		volatileCount++;
		if (isPlayerTurn && playersGold.one >= 50) {
			playersGold.one -= 50;
			updateGold();
			printMessage(playerOne, 'invoke Volatile Selection!', 4000);
			volatileSound.play();
			setTimeout(() => {
				volatileSound.pause();
				volatileSound.currentTime = 0;
			}, 7500);
			volatileSelection(myArmy);
			shopCloseSound.currentTime = 0.3;
			shopCloseSound.play();
			shopDiv.classList.toggle('hidden');
		}
	}
});

//Miscellaneous buttons
newGameButton.addEventListener('click', () => location.reload());
muteButton.addEventListener('click', () => {
	if (isMuted) {
		mute();
		muteButton.innerHTML = '&#128264;';
	} else if (!isMuted) {
		unmute();
		muteButton.innerHTML = '&#128266;';
	}
});

for (button of backButtons)
	button.addEventListener('click', () => {
		shopOpenSound.currentTime = 0.4;
		shopOpenSound.volume = 0.5;
		shopOpenSound.play();
		article.style.display = 'none';
		creditsArticle.style.display = 'none';
		header.style.display = 'flex';
	});
