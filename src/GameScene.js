'use strict';

import { Scene } from 'phaser';
// import { saveScoreInDatabase } from './firebase.js';
import Ball from './components/Ball';
import Brick from './components/Brick';
import Paddle from './components/Paddle';

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
		this.lives = 3;
		this.score = 0;
		this.ball = new Ball(this);
		this.brick = new Brick(this);
		this.paddle = new Paddle(this);
	}

	preload() {
		this.ball.preload();
		this.brick.preload();
		this.paddle.preload();

		this.load.spritesheet('audioMuteButton', 'assets/audio-mute.png', {
			frameWidth: 16,
			frameHeight: 16,
		});

		this.load.spritesheet('playPauseButton', 'assets/play-pause.png', {
			frameWidth: 16,
			frameHeight: 16,
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
		this.ball.create();
		this.brick.create();
		this.paddle.create();

		this.audioMuteToggle();
		this.ballExitScreen();
		this.createCursor();
		this.createSideBars();
		this.levelUp();
		this.outOfLives();
		this.playPauseToggle();

		this.scoreText = this.add.text(20, 10, `SCORE: ${this.score}`, {
			fontFamily: 'toshiba',
			fontSize: '15px',
			fill: '#000000',
			key: 'score',
		});

		this.levelText = this.add.text(350, 10, `LEVEL: ${this.level}`, {
			fontFamily: 'toshiba',
			fontSize: '15px',
			fill: '#000000',
			key: 'level',
		});

		this.livesText = this.add.text(660, 10, `LIVES: ${this.lives}`, {
			fontFamily: 'toshiba',
			fontSize: '15px',
			fill: '#000000',
			key: 'lives',
		});

		// CAMERA
		this.cameras.main.setBackgroundColor(0xffffff);
		this.cameras.main.fadeIn(500);

		// COLLIDERS

		// BALL + PADDLE
		this.physics.add.collider(
			this.ball.object,
			this.paddle.object,
			this.ballHitPaddle,
			null,
			this
		);

		// BALL + BRICK
		this.physics.add.collider(
			this.ball.object,
			this.brick.object,
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
		//
	}

	createCursor() {
		//	console.log(Phaser.Input.Keyboard.KeyCodes);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.keyA = this.input.keyboard.addKey(65);
		this.keyD = this.input.keyboard.addKey(68);
		this.keyW = this.input.keyboard.addKey(87);
	}

	playPauseToggle() {
		//
	}

	audioMuteToggle() {
		//
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
		ball.setVelocity(150, 150);
	}

	// TO DO !!!
	levelUp() {
		if (this.brick.object.countActive(true) === 0) {
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
			//	let finalScore = this.score;
			// GET SCORE DATA + LEVELS + PLAYER NAME / IMPORT FUNCTION FIREBASE
			this.gameOverText.visible = true;
			this.score = 0;
			this.lives = 3;
			this.level = 1;
			this.input.on('pointerdown', () => this.scene.start('gameOver'));
		}
	}

	update() {
		// Lose life.
		if (this.ball.object.y > 600) {
			console.log('It is out there!!!!');
			this.lives -= 1;
			console.log(this.lives);
			this.livesText.setText(`LIVES: ${this.lives}`);
			this.ball.object.body.reset(this.paddle.object.x, 500);
		}

		if (this.outOfLives(this.physics.world) === true) {
			// Do something...
		} else if (this.levelUp() === true) {
			// TO DO
			this.levelUp();
		} else {
			// Paddle keys.
			if (this.cursors.left.isDown || this.keyA.isDown) {
				this.paddle.object.setVelocityX(-300);
				this.paddle.object.anims.play('left', true);
			} else if (this.cursors.right.isDown || this.keyD.isDown) {
				this.paddle.object.setVelocityX(300);
				this.paddle.object.anims.play('right', true);
			} else {
				this.paddle.object.setVelocityX(0);
				this.paddle.object.anims.play('front', true);
			}

			// Binds the ball on top of paddles position during prestart.
			if (this.gameStart === false) {
				this.ball.object.setX(this.paddle.object.x);
			}

			// Release ball from paddle on space press.
			if (this.cursors.space.isDown || this.keyW.isDown) {
				this.gameStart = true;
				this.ball.object.setVelocityY(-200);
				this.ball.object.setAngularVelocity(-50);
			}

			// As long as the player is alive - these will be possible.
		}
	}
}

export default GameScene;
