import Phaser from 'phaser';

('use strict');

class Brick {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.spritesheet('brick', '/brick.png', {
			frameWidth: 120,
			frameHeight: 60,
		});
	}

	create() {
		this.object = this.game.physics.add.group({
			key: 'brick',
			//	frame: [0, 1, 2, 3, 4],
			frameQuantity: 5,
		});

		Phaser.Actions.GridAlign(this.object.getChildren(), {
			width: 5,
			height: 5,
			cellWidth: 100,
			cellHeight: 100,
			x: 200,
			y: 200,
		});
	}
}

export default Brick;
