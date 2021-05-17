'use strict';

import Phaser, { Scene } from 'phaser';

class GameScene extends Scene {
	constructor() {
		super('game');

		this.gameOver = false;
		this.gameStart = false;
		this.gamePause = false;
		this.gameResume = true;
		this.x = 800;
		this.y = 600;
		this.level = 1;
		this.lives = 5;
		this.score = 0;
	}

	preload() {
		this.load.image('ball', 'assets/ball.png');
		this.load.image('pauseButton', 'assets/button.png');
		this.load.image('muteButton', 'assets/button.png');
		this.load.image('brick', 'assets/brick.png');
		this.load.image('paddle', 'assets/paddle.png');
		this.load.spritesheet('paddleMap', 'assets/paddle-map.png', {
			frameWidth: 60,
			frameHeight: 20,
		});
		this.load.spritesheet('explosion', 'assets/explosion.png', {
			frameWidth: 50,
			frameHeight: 50,
		});
		this.load.spritesheet('bugs', 'assets/bugs.png', {
			frameWidth: 16,
			frameHeight: 16,
		});
	}

	create() {
		// METHODS
		this.createSideBars();

		this.createCursor();

		this.ballExitScreen();
		this.createBall();

		this.configBrick();

		this.createPaddle();

		this.levelUp();
		this.outOfLives();

		this.pauseResumeToggle();

		this.audioToggle();

		// CAMERA
		this.cameras.main.setBackgroundColor(0xffffff);
		this.cameras.main.fadeIn(500);

		// TEXTS
		this.scoreText = this.add.text(20, 10, `SCORE: ${this.score}`, {
			fontFamily: 'toshiba',
			fontSize: '15px',
			fill: '#000000',
		});

		this.levelText = this.add.text(350, 10, `LEVEL: ${this.level}`, {
			fontFamily: 'toshiba',
			fontSize: '15px',
			fill: '#000000',
		});

		this.livesText = this.add.text(660, 10, `LIVES: ${this.lives}`, {
			fontFamily: 'toshiba',
			fontSize: '15px',
			fill: '#000000',
		});

		// COLLIDERS

		// BALL + PADDLE
		this.physics.add.collider(
			this.ball,
			this.paddle,
			this.ballHitPaddle,
			null,
			this
		);

		// BALL + BRICK
		this.physics.add.collider(
			this.ball,
			this.brick,
			this.ballHitBrick,
			null,
			this
		);

		// GAME OVER TEXT
		this.gameOverText = this.add.text(
			420,
			400,
			'OUT OF LIVES!\nMOUSE CLICK TO CONTINUE',
			{
				fontFamily: 'toshiba',
				fontSize: '25px',
				fill: '#000',
				align: 'center',
			}
		);
		this.gameOverText.setOrigin(0.5);
		this.gameOverText.visible = false;
	}

	createBall() {
		this.ball = this.physics.add.image(400, 500, 'ball').setScale(1.5);
		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(/* Velocity: */ 1, /* Multiplied by: */ 1);

		// Make the ball fall through the lower part of the screen.
		this.physics.world.checkCollision.down = false;
	}

	createSideBars() {
		this.leftSidebar = this.physics.add.group({
			key: 'bugs',
			repeat: 6,
			setXY: { x: 15, y: 100, stepY: 70 },
		});

		this.rightSidebar = this.physics.add.group({
			key: 'bugs',
			repeat: 6,
			setXY: { x: 785, y: 100, stepY: 70 },
		});
	}

	ballExitScreen() {
		// if () {
		//   console.log("Out of bounds");
		// }
		//   // Decrement globals.lives by 1.
		//   //   globals.lives -= 1;
		//   //   console.log(globals.lives);
		//   //   let livesText = this.livesText.setText(`Lives: ${globals.lives}`);
		// }
	}

	createCursor() {
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	pauseResumeToggle() {
		this.pauseButton = this.physics.add
			.image(700, 570, 'pauseButton')
			.setScale(0.5);
	}

	audioToggle() {
		this.muteButton = this.physics.add
			.image(750, 570, 'muteButton')
			.setScale(0.5);
	}

	createPaddle() {
		//	this.paddle = this.physics.add.image(400, 530, 'paddle');
		this.paddle = this.physics.add
			.sprite(400, 550, 'paddleMap')
			.setScale(1.5);
		this.paddle.setCollideWorldBounds(true);
		this.paddle.setImmovable(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('paddleMap', {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'front',
			frames: this.anims.generateFrameNumbers('paddleMap', {
				start: 1,
				end: 1,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('paddleMap', {
				start: 2,
				end: 2,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}

	ballHitPaddle(ball, paddle) {
		console.log('Paddle has been hit!');
		let diff = 0;

		if (ball.x < paddle.x) {
			diff = paddle.x - ball.x;
			ball.body.velocity.x = -10 * diff;
			return;
		}

		if (ball.x > paddle.x) {
			diff = ball.x - paddle.x;
			ball.body.velocity.x = 10 * diff;
			return;
		}
	}

	configBrick() {
		this.brick = this.physics.add.group();
		this.createBrick(this.brick);
	}

	createBrick() {
		// Dynamic, changeable grid settings.
		let brickSize = 80;
		let numRows = 3;
		let numCols = 8;
		let brickSpacing = 4;

		let leftSpace =
			(800 - numCols * brickSize - numCols * brickSpacing) / 1.2;
		let topSpace =
			(600 - numRows * brickSize - (numRows - 1) * brickSpacing) / 3;

		for (let i = 0; i < numCols; i++) {
			for (let j = 0; j < numRows; j++) {
				this.brick
					.create(
						leftSpace + i * (brickSize + brickSpacing),
						topSpace + j * (brickSize + brickSpacing),
						'brick'
					)
					.setScale(1.5);
			}
		}
	}

	ballHitBrick(ball, brick) {
		this.explosion = this.physics.add
			.sprite(this.ball.x, this.ball.y, 'explosion')
			.setScale(1.5);

		this.anims.create({
			key: 'explosion',
			frames: this.anims.generateFrameNumbers('explosion'),
			frameRate: 20,
			repeat: 0,
			hideOnComplete: true,
		});

		this.explosion.setTexture('explosion');
		this.explosion.play('explosion');

		brick.destroy(true, true);
		this.score += 1;
		this.scoreText.setText(`SCORE: ${this.score}`);
		ball.setVelocity(150, 150);
	}

	// TO DO !!!
	levelUp() {
		if (this.brick.countActive(true) === 0) {
			this.createBrick();
			console.log('Level up!');
			this.level += 1;
			this.levelText.setText(`LEVEL: ${this.level}`);
		}
	}

	outOfLives() {
		if (this.lives === 0) {
			this.physics.pause();
			this.gameOver = true;
			this.gameOverText.visible = true;
			this.score = 0;
			this.lives = 5;
			this.level = 1;
			this.input.on('pointerdown', () => this.scene.start('gameOver'));
		}
	}

	update() {
		// Lose life.
		if (this.ball.y > 600) {
			console.log('It is out there!!!!');
			this.lives -= 1;
			console.log(this.lives);
			this.livesText.setText(`LIVES: ${this.lives}`);
			this.ball.body.reset(this.paddle.x, 500);
		}

		if (this.outOfLives(this.physics.world) === true) {
			// Do something...
		} else if (this.levelUp() === true) {
			// TO DO
			this.levelUp();
		} else {
			// Paddle keys.
			if (this.cursors.left.isDown) {
				this.paddle.setVelocityX(-300);
				this.paddle.anims.play('left', true);
			} else if (this.cursors.right.isDown) {
				this.paddle.setVelocityX(300);
				this.paddle.anims.play('right', true);
			} else {
				this.paddle.setVelocityX(0);
				this.paddle.anims.play('front', true);
			}

			// Binds the ball on top of paddles position during prestart.
			if (this.gameStart === false) {
				this.ball.setX(this.paddle.x);
			}

			// Release ball from paddle on space press.
			if (this.cursors.space.isDown) {
				this.gameStart = true;
				this.ball.setVelocityY(-200);
				this.ball.setAngularVelocity(-50);
			}

			// End of curly brace from the start - meant for game over / level up etc.
		}
	}
}

export default GameScene;
