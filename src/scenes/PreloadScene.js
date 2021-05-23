'use strict';

import { Scene } from 'phaser';

class PreloadScene extends Scene {
	constructor() {
		super('preload');
	}

	preload() {
		this.load.audio('introTune', '/music/menu.mp3');

		this.load.image('logo', '/logo.png');
		this.load.image('fly', '/fly.png');
		this.load.spritesheet('startButton', '/startButton.png', {
			frameWidth: 280,
			frameHeight: 100,
		});
		this.load.spritesheet('controlsButton', '/controlsButton.png', {
			frameWidth: 250,
			frameHeight: 55,
		});
	}

	create() {
		// INTRO TUNE
		// this.introTune = this.sound.add('introTune');
		// this.sound.play('introTune');
		// this.introTune.setLoop(true);

		// BACKGROUND EMITTER
		this.fly = this.add.particles('fly');
		this.emitter = this.fly.createEmitter({
			quantity: 4,
			frequency: 1000,
		});
		this.emitter.setPosition(400, 250);
		this.emitter.setSpeed(200);
		//this.emitter.setBlendMode(Phaser.BlendModes.ADD);

		// LOGO
		this.logo = this.add.image(400, 200, 'logo').setScale(1);

		// CONTROLS
		this.controlsButton = this.physics.add.sprite(
			400,
			400,
			'controlsButton'
		);

		this.anims.create({
			key: 'controlsButton',
			frames: this.controlsButton.anims.generateFrameNumbers(
				'controlsButton',
				{
					start: 0,
					end: 0,
				}
			),
			frameRate: 6,
			repeat: -1,
		});

		this.controlsButton.play('controlsButton');

		this.controlsButton
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => this.scene.start('controls'));

		// START
		this.startButton = this.physics.add.sprite(400, 500, 'startButton');
		this.startButton.setOrigin(0.5);

		this.startButton.setAlpha(0);
		this.tw = this.tweens.add({
			targets: this.startButton,
			alpha: 1,
			duration: 2000,
			ease: 'Sine.easeInOut',
			repeat: -1,
		});

		this.anims.create({
			key: 'startButton',
			frames: this.startButton.anims.generateFrameNumbers('startButton', {
				start: 0,
				end: 1,
			}),
			frameRate: 6,
			repeat: -1,
		});

		this.startButton.play('startButton');

		this.startButton
			.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => this.scene.start('game'));
	}
}

export default PreloadScene;
