'use strict';

import { Scene } from 'phaser';

class ControlsScene extends Scene {
	constructor() {
		super('controls');
	}

	preload() {
		this.load.spritesheet('controlsTitle', '/controlsTitle.png', {
			frameWidth: 400,
			frameHeight: 100,
		});
		this.load.image('controls', '/controls.png');
	}

	create() {
		this.cameras.main.setBackgroundColor(0xffffff);

		this.input.on('pointerdown', () => this.scene.start('preload'));

		// ==============================================================================

		// CONTROLS TITLE ANIMATION
		this.controlsTitle = this.physics.add.sprite(400, 100, 'controlsTitle');
		this.controlsTitle.setOrigin(0.5);

		this.anims.create({
			key: 'controlsTitleAnimation',
			frames: this.controlsTitle.anims.generateFrameNumbers(
				'controlsTitle',
				{
					start: 0,
					end: 2,
				}
			),
			frameRate: 6,
			repeat: -1,
		});

		this.controlsTitle.play('controlsTitleAnimation');

		// ==============================================================================

		this.controls = this.add.image(400, 320, 'controls').setScale(1.3);
	}
}

export default ControlsScene;
