'use strict';

class Paddle {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.spritesheet('paddle', '/paddle.png', {
			frameWidth: 300,
			frameHeight: 200,
		});
	}

	create() {
		this.object = this.game.physics.add
			.sprite(400, 530, 'paddle')
			.setScale(0.5)
			.setCircle(120, 30, 0);
		this.object.setCollideWorldBounds(true);
		this.object.setImmovable(true);

		this.game.anims.create({
			key: 'left',
			frames: this.object.anims.generateFrameNumbers('paddle', {
				start: 2,
				end: 2,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.game.anims.create({
			key: 'front',
			frames: this.object.anims.generateFrameNumbers('paddle', {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.game.anims.create({
			key: 'right',
			frames: this.object.anims.generateFrameNumbers('paddle', {
				start: 1,
				end: 1,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}
}

export default Paddle;
