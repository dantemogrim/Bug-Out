import Phaser, { Scene } from "phaser";

class GameScene extends Scene {
  // Our constructor is called when the instance of our class is created.
  constructor() {
    super("game"); //  super({ key: "game" });

    this.score = 0;
    this.gameOver = false;
  }

  // ========================================
  // PRELOAD

  preload() {
    // Our sprites and the name of their keys.
    this.load.image("sky", "assets/backdrop.png"); // Key: 'sky'
    this.load.image("ground", "assets/platformz.png");
    this.load.image("star", "assets/points.png");
    this.load.image("bomb", "assets/bug.png");
    this.load.spritesheet("dude", "assets/dudett.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  // ========================================
  // CREATE

  // Backdrop + methods.
  create() {
    const sky = this.add.image(0, 0, "sky");
    sky.setOrigin(0, 0);

    this.createPlatforms();
    this.createPlayer();
    this.createCursor();
    this.createStars();
    this.createBombs();

    // The text and CSS for our score text.
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    this.gameOverText = this.add.text(400, 300, "Game Over", {
      fontSize: "64px",
      fill: "#000",
    });
    this.gameOverText.setOrigin(0.5);
    // So it doesn't show while the game is active.
    this.gameOverText.visible = false;
  }

  // staticGroup handles static objects - walls, floors etc.
  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
  }

  // Physics objects are able to move!
  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setBounce(0.2);

    // Let the player be bound to the world width + height that we've set.
    this.player.setCollideWorldBounds(true);
    // Look for collisions between the player object and the platform.
    this.physics.add.collider(this.player, this.platforms);

    // Our animation for when our character moves to the left.
    this.anims.create({
      key: "left", // A name that we use to define this animation.
      // This explains which parts of the sprite we want to render.
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1, // = Repeat forever.
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // -----------------------------------
  // Create stars.

  createStars() {
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11, // Quantity.
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      // Random value for 'bouncy-ness'.
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      // Set circle can be used to modify the sprites shape.
      // Giving us a more accurat, rounded shape of the image we're using.
      child.setCircle(11);
    });

    // Make them, like our player, be bound by our static objects.
    this.physics.add.collider(this.stars, this.platforms);
    // Overlap means that our first two parameters are our objects.
    // The third parameter is the instruction that we want them to do.
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
  }

  // -----------------------------------
  // Collect star.

  collectStar(player, star) {
    star.disableBody(true, true);
    // This adds +1 to the score each time our player catches a star.
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);

    // If there are no stars left - we will loop over the same sequence again.
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      // Wehenver all stars are cleared - it'll add one bomb.
      const bomb = this.bombs.create(x, 16, "bomb");
      // Round out the sprite.
      bomb.setCircle(11);
      bomb.setBounce(1);
      // The bomb will collide with the world.
      bomb.setCollideWorldBounds(true);
      // The bomb, just like our star, will have a random bounce to it.
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  // -----------------------------------
  // Create bombs.

  createBombs() {
    this.bombs = this.physics.add.group();

    // The bombs will bounce off of the platforms.
    this.physics.add.collider(this.bombs, this.platforms);
    // A collider betweeen the bombs and the player.
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  // -----------------------------------
  // Hit by bomb.

  hitBomb(player, bomb) {
    // If the player is hit, the game will pause.
    this.physics.pause();
    // The player will turn red.
    player.setTint(0xff0000);
    // The player will show following animation frame.
    player.anims.play("turn");
    // Game over.
    this.gameOver = true;
    this.gameOverText.visible = true;
    // Click to restart the game after 'game over'.
    this.input.on("pointerdown", () => this.scene.start("preload"));
  }

  // ========================================
  // UPDATE

  // Our keyboard settings.
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default GameScene;
