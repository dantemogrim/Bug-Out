'use strict';

import { Scene } from 'phaser';
import Ball from '../components/Ball';
import Brick from '../components/Brick';
import Paddle from '../components/Paddle';
import Sidebars from '../components/Sidebars';

class GameScene extends Scene {
	constructor() {
		super('game');

		this.gameOver = false;
		this.gameStart = false;

		this.level = 1;
		this.lives = 3;
		this.score = 0;

		this.ball = new Ball(this);
		this.brick = new Brick(this);
		this.paddle = new Paddle(this);
		this.sidebars = new Sidebars(this);
	}

	preload() {
		this.ball.preload();
		this.brick.preload();
		this.paddle.preload();
		this.sidebars.preload();

		this.load.spritesheet('outOfLivesText', '/outOfLivesText.png', {
			frameWidth: 281,
			frameHeight: 64,
		});

		this.load.spritesheet('explosion', '/explosion.png', {
			frameWidth: 50,
			frameHeight: 50,
		});
	}

	create() {
		// METHODS
		this.ball.create();
		this.brick.create();
		this.paddle.create();
		this.sidebars.create();

		this.createCursor();
		this.levelUp();
		this.outOfLives();

		this.scoreText = this.add.text(20, 30, `SCORE: ${this.score}`, {
			fontSize: '20px',
			fill: '#000000',
			key: 'score',
		});

		this.levelText = this.add.text(350, 30, `LEVEL: ${this.level}`, {
			fontSize: '20px',
			fill: '#000000',
			key: 'level',
		});

		this.livesText = this.add.text(680, 30, `LIVES: ${this.lives}`, {
			fontSize: '20px',
			fontWeight: 'bold',
			fill: '#000000',
			key: 'lives',
		});

		// CAMERA
		this.cameras.main.fadeIn(500);

		// BALL + PADDLE COLLISION
		this.physics.add.collider(
			this.ball.object,
			this.paddle.object,
			this.ballHitPaddle,
			null,
			this
		);

		// OUT OF LIVES TEXT
		this.outOfLivesText = this.physics.add.sprite(
			400,
			400,
			'outOfLivesText'
		);

		this.outOfLivesText.setOrigin(0.5);
		this.outOfLivesText.visible = false;
	}

	createCursor() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.keyA = this.input.keyboard.addKey(65);
		this.keyD = this.input.keyboard.addKey(68);
		this.keyW = this.input.keyboard.addKey(87);
	}

	ballHitPaddle(ball, paddle) {
		let diff = 0;

		ball.setVelocityY(-200);

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

	ballHitBrick(ball, brick) {
		this.explosion = this.physics.add
			.sprite(this.ball.object.x, this.ball.object.y, 'explosion')
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
		ball.setVelocity(200, 200);
	}

	levelUp() {
		if (this.brick.object.countActive(true) === 0) {
			this.brick.create();

			this.level += 1;
			this.levelText.setText(`Level: ${this.level}`);
		}
	}

	outOfLives() {
		if (this.lives === 0) {
			this.physics.pause();
			this.gameOver = true;
			this.outOfLivesText.visible = true;

			// Reset stats for game restart.
			this.score = 0;
			this.lives = 3;
			this.level = 1;

			this.input.on('pointerdown', () => this.scene.start('gameOver'));
		}
	}

	update() {
		if (this.ball.object.y > 600) {
			this.lives -= 1;

			this.livesText.setText(`LIVES: ${this.lives}`);
			this.ball.object.body.reset(this.paddle.object.x, 450);
		}

		if (this.lives < 1) {
			this.outOfLives();
		} else if (this.brick.object.countActive() === 0) {
			this.levelUp();
		} else {
			if (this.cursors.left.isDown || this.keyA.isDown) {
				this.paddle.object.setVelocityX(-400);
				this.paddle.object.anims.play('left', true);
			} else if (this.cursors.right.isDown || this.keyD.isDown) {
				this.paddle.object.setVelocityX(400);
				this.paddle.object.anims.play('right', true);
			} else {
				this.paddle.object.setVelocityX(0);
				this.paddle.object.anims.play('front', true);
			}

			// Binds the ball on top of paddles position during prestart or lost life.
			if (this.gameStart === false) {
				this.ball.object.setX(this.paddle.object.x);
			}

			// Release ball from paddle on space press or 'w'.
			if (this.cursors.space.isDown || this.keyW.isDown) {
				this.gameStart = true;
				this.ball.object.setVelocityY(-200);
				this.ball.object.setAngularVelocity(-50);
			}
		}
	}
}

export default GameScene;
