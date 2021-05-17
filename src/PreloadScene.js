'use strict';

import Phaser, { Scene } from 'phaser';

class PreloadScene extends Scene {
	constructor() {
		super('preload');
	}

	preload() {
		this.load.audio('introTune', 'assets/music/menu.mp3');

		this.load.image('logo', 'assets/logo.png');
		this.load.image('particle', 'assets/ball.png');

		this.load.spritesheet('bugs', 'assets/bugs.png', {
			frameWidth: 16,
			frameHeight: 16,
		});
	}

	create() {
		// this.introTune = this.sound.add('introTune');
		// this.sound.play('introTune');
		// this.introTune.setLoop(true);

		// ====================================================================================

		// BACKGROUND EMITTERthis.
		this.particle = this.add.particles('bugs');
		this.emitter = this.particle.createEmitter();
		this.emitter.setPosition(378, 300);
		this.emitter.setSpeed(200);
		this.emitter.setBlendMode(Phaser.ADD);

		// ====================================================================================

		// LOGO
		this.logo = this.add.image(400, 230, 'logo');
		this.logo.setTintFill(0x000000, 0x515151, 0x2f2f2f, 0x3e3e3e);

		// ====================================================================================

		// LOWER TEXT
		this.preloadLowerText = this.add.text(400, 520, 'CLICK HERE TO START', {
			fontFamily: 'toshiba',
			fontSize: '20px',
			fill: '#000',
		});
		this.preloadLowerText.setOrigin(0.5);
		this.preloadLowerText.setAlpha(0);
		this.tw = this.tweens.add({
			targets: this.preloadLowerText,
			alpha: 1,
			duration: 2000,
			ease: 'Sine.easeInOut',
			repeat: -1,
		});

		this.preloadLowerText
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => this.scene.start('game'));
		// CHANGE SCENE ON CLICK
		//this.input.on('pointerdown', () => this.scene.start('game'));

		// ====================================================================================

		// LOWER TEXT
		this.controlsText = this.add.text(310, 450, 'CONTROLS', {
			fontFamily: 'toshiba',
			fontSize: '20px',
			fill: '#454545',
		});
		this.controlsText.setOrigin(0.5);

		this.controlsText
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => this.scene.start('controls'));

		// ====================================================================================

		// LOWER TEXT
		this.audioText = this.add.text(485, 450, 'LEADERBOARD', {
			fontFamily: 'toshiba',
			fontSize: '20px',
			fill: '#000',
		});
		this.audioText.setOrigin(0.5);

		this.audioText
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => this.scene.start('leaderboardScene'));
	}

	update() {
		// TEST 2
		// Phaser.Actions.RotateAroundDistance(
		// 	this.group.getChildren(),
		// 	{ x: 400, y: 300 },
		// 	0.009,
		// 	240
		// );
	}
}

export default PreloadScene;
