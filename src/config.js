'use strict';

import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import PreloadScene from './scenes/PreloadScene';
import GameOverScene from './scenes/GameOverScene';
import ControlsScene from './scenes/ControlsScene';

const config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'game',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600,
	},
	backgroundColor: '#ffffff',
	scene: [PreloadScene, ControlsScene, GameScene, GameOverScene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: false,
			debug: false,
		},
	},
	audio: {
		disableWebAudio: true,
	},
};

export default config;
