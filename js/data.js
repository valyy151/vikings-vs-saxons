class Soldier {
	constructor(name, health, strength) {
		this.name = name;
		this.health = health;
		this.strength = strength;
	}

	attack(target) {
		const damage = Math.floor(Math.random() * this.strength) + 1;
		target.receiveDamage(damage);

		updateArmies();
	}

	receiveDamage(damage) {
		const evaded = this.evade();
		const defended = this.defend();
		if (evaded) {
			damage = 0;
			console.log(`Attack Evaded! ${this.name} received 0 damage!`);
		} else if (defended) {
			damage = Math.floor(damage * 0.5);
			console.log(`Attack Defended!${this.name} received ${damage} damage!`);
		} else {
			console.log(`${this.name} received ${damage} damage!`);
			this.health -= damage;
			if (this.health <= 0) {
				console.log(`${this.name} has died.`);
				this.health = 0;
				updateArmies();
			}
		}
	}

	defend() {
		return Math.random() > 0.6;
	}

	evade() {
		return Math.random() > 0.8;
	}
}

class Viking extends Soldier {
	constructor(name, health, strength) {
		super(name, health, strength);
	}

	berserk() {}
}

class Saxon extends Soldier {
	constructor(name, health, strength) {
		super(name, health, strength);
	}

	poison() {}
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

const vikings = vikingNames.map((name) => new Viking(name, getRandomNumber(10, 15), getRandomNumber(10, 15)));
const saxons = saxonNames.map((name) => new Saxon(name, getRandomNumber(10, 15), getRandomNumber(10, 15)));

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
