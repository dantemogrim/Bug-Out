'use strict';

class Brick {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.spritesheet('brick', '/brick.png', {
			frameWidth: 200,
			frameHeight: 100,
		});
	}

	create() {
		//	this.object = this.game.physics.add.group();
		this.createBrick(this.object);
	}

	createBrick() {
		this.object = this.game.physics.add
			.group({
				key: 'brick',
				repeat: 5,
				setXY: { x: 265, y: 100, stepX: 100 },
				setScale: { x: 0.4, y: 0.4 },
			})
			.setOrigin(2, 0.5);

		this.object = this.game.physics.add
			.group({
				key: 'brick',
				repeat: 5,
				setXY: { x: 265, y: 200, stepX: 100 },
				setScale: { x: 0.4, y: 0.4 },
			})
			.setOrigin(2, 0.5);

		this.object = this.game.physics.add
			.group({
				key: 'brick',
				repeat: 5,
				setXY: { x: 265, y: 300, stepX: 100 },
				setScale: { x: 0.4, y: 0.4 },
			})
			.setOrigin(2, 0.5);
	}
}

export default Brick;
