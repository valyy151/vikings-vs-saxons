let vikingHealthSum = 0;
let saxonHealthSum = 0;

let diceThrowCount = 1;
let attackCount = 1;
let victoryCount = 0;
let gameFinished = false;

let isPlayerTurn;

let saxonSprites;
let vikingSprites;
let shopClosed = true;

let idleIntervalSaxon;
let idleIntervalViking;

let barrageActive = false;

let isMuted = false;

const playersGold = {
	one: 0,
	two: 0,
};

const vikingNames = [
	'bjorn',
	'eirik',
	'freya',
	'gudrun',
	'hilda',
	'ivar',
	'jorgen',
	'kari',
	'leif',
	'magnus',
	'njal',
	'olaf',
	'ragnar',
	'sven',
	'thorstein',
	'ulf',
	'valdis',
	'wulfgar',
	'ylva',
	'zephyr',
];
const saxonNames = [
	'aelfric',
	'beornwulf',
	'ceolwulf',
	'dunstan',
	'eadgar',
	'frithuwulf',
	'godwin',
	'hengist',
	'ivo',
	'jocelyn',
	'kentigern',
	'leofric',
	'morcar',
	'oswin',
	'penda',
	'quenby',
	'raedwald',
	'seaxburh',
	'theobald',
	'uhtred',
];

const arrows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const vikingsOtherNames = ['gunnar', 'helga', 'ingvar', 'kelda', 'lofn'];

const saxonsOtherNames = ['aethelred', 'beornhelm', 'cynric', 'drida', 'eadwine'];

//Creation of the armies

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const vikings = vikingNames.map((name) => new Viking(name, getRandomNumber(150, 175), getRandomNumber(15, 25)));
const saxons = saxonNames.map((name) => new Saxon(name, getRandomNumber(150, 175), getRandomNumber(15, 25)));

const vikingReinforcements = vikingsOtherNames.map(
	(name) => new Viking(name, getRandomNumber(150, 175), getRandomNumber(15, 25)),
);
const saxonReinforcements = saxonsOtherNames.map(
	(name) => new Saxon(name, getRandomNumber(150, 175), getRandomNumber(15, 25)),
);

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
