import Phaser, { Scene } from "phaser";
// import globals from "./globals/index";

class GameScene extends Scene {
  // Our constructor is called when the instance of our class is created.
  constructor() {
    super("game"); //  super({ key: "game" });

    this.gameOver = false;
  }

  preload() {
    // Our sprites and the name of their keys.
    this.load.image("ball", "assets/ball.png");
    this.load.image("brick", "assets/brick.png");
    this.load.image("paddle", "assets/paddle.png");
  }

  create() {
    // const sky = this.add.image(0, 0, "sky");
    // sky.setOrigin(0, 0);

    // this.createPlatforms();
    // this.createPlayer();
    this.createCursor();
    // this.createStars();
    // this.createBombs();
    this.createBall();
    this.createBrick();
    this.createPaddle();
    // this.initGlobalVariables();
    // this.gameStats();

    this.gameOverText = this.add.text(400, 300, "Game Over", {
      fontSize: "64px",
      fill: "#000",
    });
    this.gameOverText.setOrigin(0.5);
    // So it doesn't show while the game is active.
    this.gameOverText.visible = false;
  }

  // initGlobalVariables() {
  //   this.game.global = clone(globals);
  // }

  // gameStats() {
  //   this.createText(20, 20, "left", `score: ${this.game.global.score}`);
  //   this.createText(0, 20, "center", `lives: ${this.game.global.lives}`);
  //   this.createText(20, 0, "right", `level: ${this.game.global.level}`);

  //   // this.game.add.text(1, 1, "hello").setTextBounds();
  // }

  createText(xOffset, yOffset, align, text) {
    return this.game.add
      .text(xOffset, yOffset, text, {
        font: "18px Arial",
        fill: "#000",
        boundsAlignH: align,
      })
      .setTextBounds(0, 0, this.game.world.width, 0);
  }

  createBall() {
    this.ball = this.physics.add.image(400, 500, "ball");
    this.ball.setCollideWorldBounds(true);
  }

  // staticGroup handles static objects - walls, floors etc.
  // createPlatforms() {
  //   this.platforms = this.physics.add.staticGroup();
  //   this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
  //   this.platforms.create(600, 400, "ground");
  //   this.platforms.create(50, 250, "ground");
  //   this.platforms.create(750, 220, "ground");
  // }

  // Physics objects are able to move!
  // createPlayer() {
  //   this.player = this.physics.add.sprite(100, 450, "dude");
  //   this.player.setBounce(0.2);

  //   // Let the player be bound to the world width + height that we've set.
  //   this.player.setCollideWorldBounds(true);
  //   // Look for collisions between the player object and the platform.
  //   this.physics.add.collider(this.player, this.platforms);

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPaddle() {
    this.paddle = this.physics.add.sprite(400, 530, "paddle");
    this.paddle.setCollideWorldBounds(true);
  }

  createBrick() {
    this.brick = this.physics.add.group({
      key: "brick",
      repeat: 9, // Quantity.
      setXY: { x: 80, y: 100, stepX: 70 },
    });

    this.brick = this.physics.add.group({
      key: "brick",
      repeat: 9, // Quantity.
      setXY: { x: 80, y: 150, stepX: 70 },
    });

    this.brick = this.physics.add.group({
      key: "brick",
      repeat: 9, // Quantity.
      setXY: { x: 80, y: 200, stepX: 70 },
    });
  }

  // -----------------------------------
  // Create stars.

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

  // -----------------------------------
  // Hit by bomb.

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

  // Our keyboard settings.
  update() {
    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-500);
    } else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(500);
    } else {
      this.paddle.setVelocityX(0);
    }
  }
}

export default GameScene;
