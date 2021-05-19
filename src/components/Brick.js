'use strict';

class Brick {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.image('brick', 'assets/brick.png');
	}

	create() {
		this.object = this.game.physics.add.group();
		this.createBrick(this.object);
	}

	createBrick() {
		let objectSize = 80;
		let numRows = 3;
		let numCols = 8;
		let objectSpacing = 4;

		let yOffset =
			(800 - numCols * objectSize - numCols * objectSpacing) / 1.2;
		let xOffset =
			(600 - numRows * objectSize - (numRows - 1) * objectSpacing) / 3;

		for (let i = 0; i < numCols; i++) {
			for (let j = 0; j < numRows; j++) {
				this.object
					.create(
						yOffset + i * (objectSize + objectSpacing),
						xOffset + j * (objectSize + objectSpacing),
						'brick'
					)
					.setScale(1.5);
			}
		}
	}
}

export default Brick;
