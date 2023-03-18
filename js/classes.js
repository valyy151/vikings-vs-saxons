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
		const damage = this.strength;
		if (target) {
			target.receiveDamage(damage, duration);

			updateArmies();
		}
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
			printDamageMessage(`${this.name} evaded! ( ${damage} )`, duration);
		} else if (blocked) {
			damage = Math.floor(damage * this.blockDamageReduction);
			if (damage < 0) {
				damage = 0;
			}
			this.health -= damage;
			printDamageMessage(`${this.name} blocked! ( ${damage} )`, duration);
		} else {
			this.health -= damage;

			if (this.health <= 0) {
				printDamageMessage(`${this.name} took ${damage} damage and died.`, duration);
				this.health = 0;
			} else {
				printDamageMessage(`${this.name} took damage! ( ${damage} ) `, duration);
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
	receiveDamage(damage, duration) {
		const critical = this.critical();
		const evaded = this.evade();
		const blocked = this.block();

		if (critical) {
			damage = damage * this.criticalDamage;
		}
		if (evaded) {
			damage = 0;
			printDamageMessage(`${this.name} evaded! ( ${damage} )`, duration);
		} else if (blocked) {
			damage = Math.floor(damage * this.blockDamageReduction);
			this.health -= damage;
			printDamageMessage(`${this.name} blocked! ( ${damage} )`, duration);
		} else {
			this.health -= damage;

			if (this.health <= 0) {
				printDamageMessage(`${this.name} took ${damage} damage and died.`, duration);
				this.health = 0;
			} else {
				printDamageMessage(`${this.name} took damage! ( ${damage} ) `, duration);
				if (this.health < 50) {
					this.berserk();
				}
			}
		}
		updateArmies();
	}

	berserk() {
		if (this.strength < 75 && this.evasionChance < 0.4) {
			this.strength = this.strength * 2;
			this.blockChance = 0;
			this.evasionChance += 0.2;
			this.health -= Math.floor(this.health * 0.5);
			printDamageMessage(`${this.name} goes berserk!`, 800);
			updateArmies();
		}
	}
}

class Saxon extends Soldier {
	constructor(name, health, strength) {
		super(name, health, strength);
	}

	poison(target, duration) {
		const damage = 5;

		const poisonInterval = setInterval(() => {
			target.health -= damage;
			updateArmies();
			printDamageMessage(` ${target.name} takes poison damage! ( ${damage} )`, duration);
		}, 250);

		setTimeout(() => {
			clearInterval(poisonInterval);
		}, 2500);
	}
}
