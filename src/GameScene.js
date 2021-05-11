"use strict";

import Phaser, { Scene } from "phaser";
import globals from "./globals/index";
import { clone } from "lodash";

class GameScene extends Scene {
  // Our constructor is called when the instance of our class is created.
  constructor(game, x, y) {
    super("game"); //  super({ key: "game" });

    this.gameStart = false;
    this.gameOver = false;
  }

  preload() {
    // Our sprites and the name of their keys.
    this.load.image("ball", "assets/ball.png");
    this.load.image("brick", "assets/brick.png");
    this.load.image("paddle", "assets/paddle.png");
  }

  create() {
    this.scoreText = this.add.text(20, 10, `score: ${globals.score}`);
    this.add.text(350, 10, `level: ${globals.level}`);
    this.livesText = this.add.text(660, 10, `lives: ${globals.lives}`);

    this.cameras.main.fadeIn(500);

    this.createCursor();
    this.createBall();
    this.runawayBall();
    this.configBrick();
    this.createPaddle();
    this.initGlobalVariables();
    // this.gameStats();
    this.levelUp();
    this.outOfLives();

    this.gameOverText = this.add.text(400, 300, "Game Over", {
      fontSize: "64px",
      fill: "#000",
    });
    this.gameOverText.setOrigin(0.5);

    // So it doesn't show while the game is active.
    this.gameOverText.visible = false;
  }

  initGlobalVariables() {
    this.globals = clone(globals);

    console.log(this.globals);
  }

  // gameStats(globals, score) {
  //   //console.log(globals);

  //   console.log(globals);

  //   // this.game.add.text(1, 1, "hello").setTextBounds();
  // }

  // createText(xOffset, yOffset, align, text) {
  //   return this.game.add
  //     .text(xOffset, yOffset, text, {
  //       font: "18px Arial",
  //       fill: "#000",
  //       boundsAlignH: align,
  //     })
  //     .setTextBounds(0, 0, this.width, 0);
  // }

  createBall() {
    this.ball = this.physics.add.image(400, 500, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(/* Velocity: */ 1, /* Multiplied by: */ 1);

    // Make the ball fall through the lower part of the screen.
    this.physics.world.checkCollision.down = false;

    //   // Make them, like our player, be bound by our static objects.
    //   this.physics.add.collider(this.stars, this.platforms);
    //   // Overlap means that our first two parameters are our objects.
    //   // The third parameter is the instruction that we want them to do.
    //   this.physics.add.overlap(
    //     this.player,
    //     this.stars,
    //     this.collectStar,
    //     null,
    //     this
    //   );
  }

  runawayBall() {
    //
  }

  // createPlatforms() {
  //   this.platforms = this.physics.add.staticGroup();
  //   this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
  // }

  // Physics objects are able to move!
  // createPlayer() {
  //   this.player = this.physics.add.sprite(100, 450, "dude");
  //   this.player.setBounce(0.2);

  //   // Look for collisions between the player object and the platform.
  //   this.physics.add.collider(this.player, this.platforms);

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPaddle() {
    this.paddle = this.physics.add.image(400, 530, "paddle");
    this.paddle.setCollideWorldBounds(true);
    this.paddle.setImmovable(true);

    this.physics.add.collider(
      this.ball,
      this.paddle,
      this.ballHitPaddle,
      null,
      this
    );
  }

  ballHitPaddle(ball, paddle) {
    console.log("Paddle has been hit!");
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
    // Dynamic grid settings.
    let brickSize = 80;
    let numRows = 3;
    let numCols = 8;
    let brickSpacing = 4;

    let leftSpace = (800 - numCols * brickSize - numCols * brickSpacing) / 1.2;

    let topSpace =
      (600 - numRows * brickSize - (numRows - 1) * brickSpacing) / 3;

    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        this.brick.create(
          leftSpace + i * (brickSize + brickSpacing),
          topSpace + j * (brickSize + brickSpacing),
          "brick"
        );
      }
    }

    this.physics.add.collider(
      this.ball,
      this.brick,
      this.ballHitBrick,
      null,
      this
    );

    //this.brick.enableBody = true;
    //   this.platforms = this.physics.add.staticGroup();
    //   this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    //   this.platforms.create(400, 568, "ground").setScale(2).refreshBody()
    //
  }

  ballHitBrick(ball, brick) {
    console.log("Brick is destroyed!");
    brick.disableBody(true, true);
    this.scoreText += 1;

    ball.setVelocity(150, 150);
  }

  // createStars() {
  //   this.stars = this.physics.add.group({
  //     key: "star",
  //     repeat: 11, // Quantity.
  //     setXY: { x: 12, y: 0, stepX: 70 },
  //   });

  //   this.stars.children.iterate((child) => {
  //     // Random value for 'bouncy-ness'.
  //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  //     // Set circle can be used to modify the sprites shape.
  //     // Giving us a more accurat, rounded shape of the image we're using.
  //     child.setCircle(11);
  //   });

  //   // Make them, like our player, be bound by our static objects.
  //   this.physics.add.collider(this.stars, this.platforms);
  //   // Overlap means that our first two parameters are our objects.
  //   // The third parameter is the instruction that we want them to do.
  //   this.physics.add.overlap(
  //     this.player,
  //     this.stars,
  //     this.collectStar,
  //     null,
  //     this
  //   );
  // }

  // collectStar(player, star) {
  //   star.disableBody(true, true);
  //   // This adds +1 to the score each time our player catches a star.
  //   this.score += 1;
  //   this.scoreText.setText(`Score: ${this.score}`);

  //   // If there are no stars left - we will loop over the same sequence again.
  //   if (this.stars.countActive(true) === 0) {
  //     this.stars.children.iterate((child) => {
  //       child.enableBody(true, child.x, 0, true, true);
  //     });
  //   this.level += 1;
  //   this.levelText.setText(`level: ${this.level}`);

  //     const x =
  //       this.player.x < 400
  //         ? Phaser.Math.Between(400, 800)
  //         : Phaser.Math.Between(0, 400);

  //     // Wehenver all stars are cleared - it'll add one bomb.
  //     const bomb = this.bombs.create(x, 16, "bomb");
  //     // Round out the sprite.
  //     bomb.setCircle(11);
  //     bomb.setBounce(1);
  //     // The bomb will collide with the world.
  //     bomb.setCollideWorldBounds(true);
  //     // The bomb, just like our star, will have a random bounce to it.
  //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  //   }
  // }

  // createBombs() {
  //   this.bombs = this.physics.add.group();

  //   // The bombs will bounce off of the platforms.
  //   this.physics.add.collider(this.bombs, this.platforms);
  //   // A collider betweeen the bombs and the player.
  //   this.physics.add.collider(
  //     this.player,
  //     this.bombs,
  //     this.hitBomb,
  //     null,
  //     this
  //   );
  // }

  // hitBomb(player, bomb) {
  //   // If the player is hit, the game will pause.
  //   this.physics.pause();
  //   // The player will turn red.
  //   player.setTint(0xff0000);
  //   // The player will show following animation frame.
  //   player.anims.play("turn");
  //   // Game over.
  //   this.gameOver = true;
  //   this.gameOverText.visible = true;
  //   // Click to restart the game after 'game over'.
  //   this.input.on("pointerdown", () => this.scene.start("preload"));
  // }

  levelUp() {
    //
    let brickTotal = this.brick.countActive();
    // if (brickTotal === 0)
    if (brickTotal === 22) {
      return true;
    }
    // Increment Level & reset all bricks - change bg color/ make paddle smaller / increase velocity.
  }

  outOfLives() {
    if (globals.lives === 0) {
      this.physics.pause();
      this.gameOver = true;
      this.gameOverText.visible = true;
      this.input.on("pointerdown", () => this.scene.start("gameOver"));
    }
    //
  }

  update() {
    // console.log(this.ball.y);
    if (this.outOfLives(this.physics.world) === true) {
    } else if (this.levelUp() === true) {
      // Increment level and reset tiles etc.
    } else {
      if (this.ball.y > 600) {
        console.log("Out of bounds!");
        // Decrement globals.lives by 1.

        globals.lives -= 1;
        console.log(globals.lives);
        let livesText = this.livesText.setText(`Lives: ${globals.lives}`);
      }

      // Paddle keys.
      if (this.cursors.left.isDown) {
        this.paddle.setVelocityX(-500);
      } else if (this.cursors.right.isDown) {
        this.paddle.setVelocityX(500);
      } else {
        this.paddle.setVelocityX(0);
      }

      // Binds the ball on top of paddles position during prestart.
      if (this.gameStart === false) {
        this.ball.setX(this.paddle.x);
      }

      // Balls velocity on impact.

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
