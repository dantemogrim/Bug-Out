'use strict';

import Phaser, { Scene } from 'phaser';

class GameOverScene extends Scene {
	constructor() {
		super('gameOver');
	}

	preload() {
		this.load.spritesheet('fly', '/fly.png', {
			frameWidth: 25,
			frameHeight: 25,
		});

		this.load.spritesheet('gameOverTitle', '/gameOverTitle.png', {
			frameWidth: 367,
			frameHeight: 100,
		});

		this.load.spritesheet('credentials', '/credentials.png', {
			frameWidth: 250,
			frameHeight: 170,
		});
	}

	create() {
		this.cameras.main.setBackgroundColor(0xffffff);

		this.input.on('pointerdown', () => this.scene.start('preload'));

		// ==============================================================================

		// BACKGROUND EMITTER TEST 2
		this.group = this.add.group();
		for (let i = 0; i < 32; i++) {
			this.group.create(i * 32, i * 2, 'fly');
			//	this.group.setBlendMode(Phaser.BlendModes.ADD);
		}

		// ==============================================================================

		// GAME OVER TITLE ANIMATION
		this.gameOverTitle = this.physics.add.sprite(400, 100, 'gameOverTitle');
		this.gameOverTitle.setOrigin(0.5);

		this.anims.create({
			key: 'gameOverTitleAnimation',
			frames: this.gameOverTitle.anims.generateFrameNumbers(
				'gameOverTitle',
				{
					start: 0,
					end: 2,
				}
			),
			frameRate: 6,
			repeat: -1,
		});

		this.gameOverTitle.play('gameOverTitleAnimation');

		// ==============================================================================

		// CREDENTIALS ANIMATION
		this.credentials = this.physics.add
			.sprite(400, 300, 'credentials')
			.setScale(1.5);
		this.credentials.setOrigin(0.5);

		// this.anims.create({
		// 	key: 'credentialsAnimation',
		// 	frames: this.credentials.anims.generateFrameNumbers('credentials', {
		// 		start: 0,
		// 		end: 2,
		// 	}),
		// 	frameRate: 6,
		// 	repeat: -1,
		// });

		// this.credentials.play('credentialsAnimation');
	}

	update() {
		// BACKGROUND EMITTER
		Phaser.Actions.RotateAroundDistance(
			this.group.getChildren(),
			{ x: 400, y: 300 },
			0.005,
			100
		);
	}
}

export default GameOverScene;
