class Soldier {
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
		const evaded = this.evade();
		const defended = this.defend();
		if (evaded) {
			damage = 0;
			console.log('Attack Evaded!');
		} else if (defended) {
			damage = Math.floor(damage * 0.8);
			console.log(`Attack Defended! Received ${damage} damage.`);
		} else {
			console.log(`Received ${damage} damage.`);
			this.health -= damage;
			if (this.health <= 0) {
				console.log(`${this.name} has died.`);
				updateArmies();
			}
		}
	}

	defend() {
		return Math.random() > 0.8;
	}

	evade() {
		return Math.random() > 0.95;
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

const vikings = vikingNames.map((name) => new Viking(name, getRandomNumber(75, 125), getRandomNumber(10, 25)));
const saxons = saxonNames.map((name) => new Saxon(name, getRandomNumber(75, 125), getRandomNumber(10, 25)));

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
