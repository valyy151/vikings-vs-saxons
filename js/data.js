class Soldier {
	constructor(name, health, strength) {
		this.name = name;
		this.health = health;
		this.strength = strength;
		this.evasionChance = 0.05;
		this.criticalChance = 0.05;
		this.criticalDamage = 2.5;
		this.blockDamageReduction = 0.2;
		this.blockChance = 0.25;
	}

	attack(target, duration) {
		const damage = Math.floor(Math.random() * this.strength) + 1;
		target.receiveDamage(damage, duration);

		updateArmies();
	}

	receiveDamage(damage, duration) {
		const critical = this.critical();
		if (critical) {
			damage = damage * this.criticalDamage;
		}
		const evaded = this.evade();
		const blocked = this.block();
		if (evaded) {
			damage = 0;
			renderDamageMessage(`${this.name} evades the attack ! ( ${damage} )`, duration);
		} else if (blocked) {
			damage = Math.floor(damage * this.blockDamageReduction);
			renderDamageMessage(`${this.name} blocks the attack and receives reduced damage! ( ${damage} )`, duration);
		} else {
			renderDamageMessage(`${this.name} takes damage! ( ${damage} ) `, duration);
			this.health -= damage;
			if (this.health <= 0) {
				renderDamageMessage(`${this.name} has died.`, duration);
				this.health = 0;
				updateArmies();
			}
		}
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

const vikings = vikingNames.map((name) => new Viking(name, getRandomNumber(10, 15), getRandomNumber(15, 35)));
const saxons = saxonNames.map((name) => new Saxon(name, getRandomNumber(10, 15), getRandomNumber(15, 35)));

const vikingReinforcements = vikingsOtherNames.map(
	(name) => new Viking(name, getRandomNumber(10, 15), getRandomNumber(15, 35))
);
const saxonReinforcements = saxonsOtherNames.map(
	(name) => new Saxon(name, getRandomNumber(10, 15), getRandomNumber(15, 35))
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
