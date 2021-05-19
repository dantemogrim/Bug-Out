'use strict';

class Ball {
	constructor(game) {
		this.game = game;
	}

	preload() {
		this.game.load.image('ball', 'assets/ball.png');
	}

	create() {
		this.object = this.game.physics.add
			.image(400, 500, 'ball')
			.setScale(1.5);
		this.object.setCollideWorldBounds(true);
		this.object.setBounce(/* Velocity: */ 1, /* Multiplied by: */ 1);

		// Make the ball fall through the lower part of the screen.
		this.game.physics.world.checkCollision.down = false;
	}
}

export default Ball;
