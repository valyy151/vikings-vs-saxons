# Vikings vs Saxons
This is a turn-based game where two players control armies of Vikings and Saxons. The objective of the game is to destroy the enemy army before they destroy yours.

## Table of contents
* [How to Play](#how-to-play)
* [Technologies](#technologies)
* [Setup](#setup)

## How to Play
### Who Goes First?
Every soldier will spawn with health between 150 and 175, chosen randomly. Whichever army has less total health, plays first.
![Main](https://user-images.githubusercontent.com/121823776/224272717-44c5f6b6-ca27-417b-92a7-287b3cf2c2f9.png)

### Rolling Dice
On your turn, roll 2 dices from 1 to 6. The 2 numbers are then multiplied and that will be the amount of gold you receive. For example, if you roll a 3 and a 4, you receive 12 gold. If the 2 dices are the same number, the amount of gold you receive is doubled. For example, if you roll a 5 and a 5, you receive 50 gold.
![Dice](https://user-images.githubusercontent.com/121823776/224273489-2147be55-1dae-43e9-93a1-31043b3725a9.png)

### Spending Gold
You can choose to spend your gold on attacking the enemy army or purchasing items from the shop. If you don't have enough gold for either, you will have to end your turn.

### Attack
If you choose to attack, your soldiers will start battling the enemy army. The battle ends once all enemy soldiers have been attacked once. Keep in mind that once you initiate the attack, your turn will end instantly after the battle, and you will not be able to buy things from the shop until next turn.
![Attack](https://user-images.githubusercontent.com/121823776/224275308-8a8962bb-5f21-4d35-8be3-eaed21c15647.png)

### Shop
If you choose to visit the shop, you can spend your gold on healing, reinforcements, or other helpful items that will aid you in battle. Once you've purchased your items, you can still choose to attack if you have enough gold.
![Shop](https://user-images.githubusercontent.com/121823776/224274273-9274cfb8-4046-4f1e-90b5-868854e871b2.png)

### Battle
During battle, the armies will clash on the battlefield, soldiers will deal damage to each other, based on their damage.
![Battle](https://user-images.githubusercontent.com/121823776/224274678-14ee526f-69bc-4877-af81-f4d2f1467216.png)

### End of the Game
The game ends when one army is destroyed. The player with the remaining army wins the game.

### Soldiers
#### Every soldier has:

##### Random damage between 15-25
##### Critical chance of 5%
##### Critical damage of 2.5x
##### Block chance of 30%
##### If blocking, damage reduction of 20%
##### Evasion chance of 5%

##### Saxons have a 5% chance on every attack to poison a target which deals 5 damage over 5 seconds.

##### Vikings have a berserk method that doubles their damage and evasion chance, but disables their block chance, and reduces their health by half. This occurs when a Viking drops below 50 health, and will double his damage for every turn he stays alive.

## Technologies
### Project is created with:

##### Javascript, CSS, HTML


## Setup
### To run this project, go to:
https://valyy151.github.io/vikings-vs-saxons
