'use strict';

import Phaser, { Scene } from 'phaser';

class ControlsScene extends Scene {
	constructor() {
		super('controls');
	}

	preload() {}

	create() {
		this.cameras.main.setBackgroundColor(0xffffff);

		this.gameOverText = this.add.text(400, 100, 'CONTROLS', {
			fontFamily: 'toshiba',
			fontSize: '64px',
			fill: '#000',
		});
		this.gameOverText.setOrigin(0.5);

		this.highScoreInput = this.add.text(
			400,
			300,
			'MOVE LEFT: LEFT ARROW / \n\nMOVE RIGHT: RIGHT ARROW / \n\nRELEASE BALL: SPACE\n\nPAUSE: X',
			{ fontFamily: 'toshiba', fontSize: '24px', fill: '#000' }
		);
		this.highScoreInput.setOrigin(0.5);

		this.input.on('pointerdown', () => this.scene.start('preload'));
	}

	update() {}
}

export default ControlsScene;
