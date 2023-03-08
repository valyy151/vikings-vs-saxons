class Soldier {
	constructor(name, health, strength) {
		this.name = name;
		this.health = health;
		this.strength = strength;
		this.evasionChance = 0.05;
		this.criticalChance = 0.05;
		this.criticalDamage = 2.5;
		this.blockDamageReduction = 0.8;
		this.blockChance = 0.25;
	}

	attack(target, duration) {
		const damage = Math.floor(Math.random() * this.strength) + 5;
		target.receiveDamage(damage, duration);

		updateArmies();
	}

	receiveDamage(damage, duration) {
		const critical = this.critical();
		const evaded = this.evade();
		const blocked = this.block();

		if (critical) {
			damage = damage * this.criticalDamage;
		}

		if (evaded) {
			damage = 0;
			renderDamageMessage(`${this.name} evaded! ( ${damage} )`, duration);
		} else if (blocked) {
			damage = Math.floor(damage * this.blockDamageReduction);
			this.health -= damage;
			renderDamageMessage(`${this.name} blocked! ( ${damage} )`, duration);
		} else {
			this.health -= damage;

			if (this.health <= 0) {
				renderDamageMessage(`${this.name} took ${damage} damage and died.`, duration);
				this.health = 0;
			} else {
				renderDamageMessage(`${this.name} took damage! ( ${damage} ) `, duration);
			}
		}
		updateArmies();
	}

	block() {
		return Math.random() < this.blockChance;
	}

	evade() {
		return Math.random() < this.evasionChance;
	}

	critical() {
		return Math.random() < this.criticalChance;
	}
}

class Viking extends Soldier {
	constructor(name, health, strength) {
		super(name, health, strength);
		this.originalStrength = this.strength;
		this.originalEvasionChance = this.evasionChance;
		this.originalBlockChance = this.blockChance;
	}

	berserk() {
		this.strength = this.strength * 2;
		this.evasionChance += 0.2;
		this.blockChance = 0;

		this.health -= Math.floor(this.health * 0.5);
		renderDamageMessage(`${this.name} GOES INTO A BERSERK RAGE!`, 3000);
		updateArmies();

		setTimeout(() => {
			renderDamageMessage(`${this.name} snaps out of the berserk rage !`, 3000);
			this.strength = this.originalStrength;
			this.evasionChance = this.originalEvasionChance;
			this.blockChance = this.originalBlockChance;
			updateArmies();
		}, 90000);
	}
}

class Saxon extends Soldier {
	constructor(name, health, strength) {
		super(name, health, strength);
	}

	poison(target) {
		const damage = 5;

		const poisonInterval = setInterval(() => {
			target.health -= damage;
			updateArmies();
			renderDamageMessage(` ${target.name} takes -${damage} poison damage!`, 2000);
		}, 500);

		setTimeout(() => {
			clearInterval(poisonInterval);
		}, 5000);
	}
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

const vikingsOtherNames = [
	'Gunnar',
	'Helga',
	'Ingvar',
	'Kelda',
	'Lofn',
	'Maren',
	'Hrothgar',
	'Rane',
	'Sigrid',
	'Torgny',
	'Ulrik',
	'Viggo',
];

const saxonsOtherNames = [
	'Aethelred',
	'Beornhelm',
	'Cynric',
	'Drida',
	'Eadwine',
	'Frealaf',
	'Godgifu',
	'Oskar',
	'Ina',
	'Judoc',
	'Kenelm',
	'Leofmund',
];

const vikings = vikingNames.map((name) => new Viking(name, getRandomNumber(50, 55), getRandomNumber(15, 25)));
const saxons = saxonNames.map((name) => new Saxon(name, getRandomNumber(50, 55), getRandomNumber(15, 25)));

const vikingReinforcements = vikingsOtherNames.map(
	(name) => new Viking(name, getRandomNumber(100, 125), getRandomNumber(15, 25))
);
const saxonReinforcements = saxonsOtherNames.map(
	(name) => new Saxon(name, getRandomNumber(100, 125), getRandomNumber(15, 25))
);

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startBattleButton = document.getElementById('startBattle');
const newGameButton = document.getElementById('newGame');
const selectTeam = document.getElementById('selectTeam');

const header = document.querySelector('header');
const section = document.querySelector('section');
const footer = document.querySelector('footer');

const vikingDiv = document.getElementById('vikingDiv');
const saxonDiv = document.getElementById('saxonDiv');

const vikingArmy = document.getElementById('vikingArmy');
const saxonArmy = document.getElementById('saxonArmy');

const totalHealthViking = document.getElementById('totalHealthViking');
const totalHealthSaxon = document.getElementById('totalHealthSaxon');

const yourTurnText = document.getElementById('yourTurnText');
const enemyTurnText = document.getElementById('enemyTurnText');

const diceRollText = document.getElementById('diceRollText');

const damageContainerPlayer = document.getElementById('damageContainerPlayer');
const damageContainerEnemy = document.getElementById('damageContainerEnemy');

const shopDiv = document.getElementById('shop');

const summonReinforcementsButton = document.getElementById('summonReinforcementsButton');
const healButton = document.getElementById('healingButton');
const arrowBarrageButton = document.getElementById('arrowBarrageButton');
const volatileButton = document.getElementById('volatileButton');

const vikingMusic = new Audio('./music/Viking Music - With Axe And Sword.mp3');
const saxonMusic = new Audio('./music/Warrior.mp3');

const battleSounds = new Audio('./sound_effects/battle_sounds.mp3');
const arrowVolley = new Audio('./sound_effects/arrows.mp3');

arrowVolley.currentTime = 2.8;

battleSounds.volume = 0.3;

vikingMusic.volume = 0.3;
vikingMusic.loop = true;
saxonMusic.volume = 0.3;
saxonMusic.loop = true;

function idleAnimationSaxon() {
	const idleIntervalSaxon = setInterval(() => {
		saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/ready_1.png')"));
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/ready_2.png')"));
		}, 300);
		setTimeout(() => {
			saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/ready_3.png')"));
		}, 600);
	}, 900);
}

function idleAnimationViking() {
	const idleIntervalViking = setInterval(() => {
		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_1.png')"));
		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_3.png')"));
		}, 300);
		setTimeout(() => {
			vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_5.png')"));
		}, 600);
	}, 900);
}

// function rollAnimationSaxon() {
// 	saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/jump_4.png')"));
// 	setTimeout(() => {
// 		saxonSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/saxon/jump_5.png')"));
// 	}, 300);
// }

// function rollAnimationViking() {
// 	vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_1.png')"));
// 	setTimeout(() => {
// 		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_3.png')"));
// 	}, 310);
// 	setTimeout(() => {
// 		vikingSprites.forEach((sprite) => (sprite.style.backgroundImage = "url('./images/viking/ready_5.png')"));
// 	}, 610);
// }
