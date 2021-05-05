import Phaser, { Scene } from "phaser";

class GameScene extends Scene {
  // Our constructor is called when the instance of our class is created.
  constructor() {
    super("game"); //  super({ key: "game" });

    this.gameOver = false;

    // Need to be global variables.
    this.score = 0;
    this.level = 1;
    this.lives = 10;
  }

  preload() {
    // Our images.
    this.load.image("ball", "assets/ball.png");
    this.load.image("brick", "assets/brick.png");
    this.load.image("paddle", "assets/paddle.png");
  }

  create() {
    // Our methods and texts.
    this.brickSettings();
    this.ballSettings();
    this.paddleSettings();
    this.keyboardSettings();

    // SCORE
    this.gameScore = this.add.text(70, 20, `Score: ${this.score}`, {
      fontSize: "24px",
      fill: "#fff",
    });
    this.gameScore.setOrigin(0.5);

    // LEVEL
    this.gameLevel = this.add.text(680, 20, `Level: ${this.level}`, {
      fontSize: "24px",
      fill: "#fff",
    });
    this.gameLevel.setOrigin(0.5);

    // LIVES
    this.gameLives = this.add.text(1300, 20, `Lives: ${this.lives}`, {
      fontSize: "24px",
      fill: "#fff",
    });
    this.gameLives.setOrigin(0.5);

    // ==========================================

    this.physics.world.checkCollision.down = false;
  }

  brickSettings() {
    //this.brick = this.physics.add.staticGroup();
    //this.brick.create(300, 300, "brick");

    this.bricks = this.physics.add.group({
      key: "brick",
      repeat: 6,
      immovable: true,

      setXY: { x: window.innerWidth / 2, y: window.innerHeight / 2, stepX: 0 },
      setScale: { x: 0.5, y: 0.5 },
    });

    // For each loop that can increment XY for each set?
  }

  ballSettings() {
    this.ball = this.physics.add.sprite(300, 400, "ball");
    this.ball.setBounce(1, 1);
    this.ball.setCollideWorldBounds(true);
  }

  paddleSettings() {
    this.paddle = this.physics.add.sprite(300, 600, "paddle").setScale(1);
    this.paddle.setCollideWorldBounds(true);
    //this.physics.add.collider(this.paddlePlayer, this.ball);
  }

  keyboardSettings() {}

  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-350);
    } else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(350);
    }
  }
}

export default GameScene;
