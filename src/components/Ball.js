'use strict';

class Ball {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.spritesheet('ball', '/ball.png', {
			frameWidth: 50,
			frameHeight: 50,
		});
	}

	create() {
		this.object = this.game.physics.add
			.sprite(400, 450, 'ball')
			.setScale(0.5)
			.setCircle(25);
		this.object.setCollideWorldBounds(true);
		this.object.setBounce(/* Velocity: */ 1, /* Multiplied by: */ 1);

		// Make the ball fall through the lower part of the screen.
		this.game.physics.world.checkCollision.down = false;

		this.game.anims.create({
			key: 'ball',
			frames: this.object.anims.generateFrameNumbers('ball', {
				start: 0,
				end: 3,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.object.play('ball');
	}
}

export default Ball;
