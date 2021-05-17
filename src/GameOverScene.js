'use strict';

import Phaser, { Scene } from 'phaser';

class GameOverScene extends Scene {
	constructor() {
		super('gameOver');

		this.score;
		this.length;
	}

	preload() {
		this.load.spritesheet('particle', 'assets/bugs.png', {
			frameWidth: 16,
			frameHeight: 16,
		});
	}

	create() {
		this.cameras.main.setBackgroundColor(0xffffff);

		// ====================================================================================

		this.upperText = this.add.text(
			400,
			400,
			'CREDENTIALS:\n\nASEEL MOHAMAD\n\nDANTE MOGRIM\n\n2021',
			{
				fontFamily: 'toshiba',
				fontSize: '20px',
				fill: '#424242',
				align: 'center',
			}
		);
		this.upperText.setOrigin(0.5);

		// ====================================================================================

		this.gameOverText = this.add.text(400, 120, 'GAME OVER', {
			fontFamily: 'toshiba',
			fontSize: '64px',
			fill: '#000',
		});
		this.gameOverText.setOrigin(0.5);
		// TO DO: ADD BLINKING TEXT TO HIGH SCORE AND EMITTER FROM PRELOADER TO GAME OVER
		this.highScoreInput = this.add.text(
			400,
			220,
			'YOU HAVE REACHED THE HIGH SCORE!\n\nSTATE YOUR NAME BELOW TO SUBMIT.',
			{ fontFamily: 'toshiba', fontSize: '24px', fill: '#000' }
		);
		this.highScoreInput.setOrigin(0.5);

		// ====================================================================================

		this.input.on('pointerdown', () => this.scene.start('preload'));

		// BACKGROUND EMITTER TEST 2
		this.group = this.add.group();
		for (let i = 0; i < 32; i++) {
			this.group.create(i * 32, i * 2, 'particle');
			this.group.setBlendMode(Phaser.ADD);
		}
	}

	update() {
		// TEST 2
		Phaser.Actions.RotateAroundDistance(
			this.group.getChildren(),
			{ x: 400, y: 400 },
			0.01,
			130
		);
	}
}

export default GameOverScene;
