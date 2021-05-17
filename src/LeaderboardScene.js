'use strict';

import Phaser, { Scene } from 'phaser';
// import { saveScoreInDatabase } from './firebase.js';

class LeaderboardScene extends Scene {
	constructor() {
		super('leaderboardScene');
	}

	preload() {}

	create() {
		this.cameras.main.setBackgroundColor(0xffffff);

		this.gameOverText = this.add.text(400, 100, 'LEADERBOARD', {
			fontFamily: 'toshiba',
			fontSize: '64px',
			fill: '#000',
		});
		this.gameOverText.setOrigin(0.5);

		this.highScoreInput = this.add.text(400, 300, 'SCORE:', {
			fontFamily: 'toshiba',
			fontSize: '24px',
			fill: '#000',
		});
		this.highScoreInput.setOrigin(0.5);

		this.input.on('pointerdown', () => this.scene.start('preload'));
	}

	update() {}
}
export default LeaderboardScene;
