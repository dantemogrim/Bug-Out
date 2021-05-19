'use strict';

class Paddle {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.spritesheet('paddle', 'assets/paddle.png', {
			frameWidth: 60,
			frameHeight: 20,
		});
	}

	create() {
		this.object = this.game.physics.add
			.sprite(400, 550, 'paddle')
			.setScale(1.5);
		this.object.setCollideWorldBounds(true);
		this.object.setImmovable(true);

		this.game.anims.create({
			key: 'left',
			frames: this.object.anims.generateFrameNumbers('paddle', {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.game.anims.create({
			key: 'front',
			frames: this.object.anims.generateFrameNumbers('paddle', {
				start: 1,
				end: 1,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.game.anims.create({
			key: 'right',
			frames: this.object.anims.generateFrameNumbers('paddle', {
				start: 2,
				end: 2,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}
}

export default Paddle;
