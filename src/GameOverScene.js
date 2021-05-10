import Phaser, { Scene } from "phaser";
import globals from "./globals/index";
import { clone } from "lodash";

class GameOverScene extends Scene {
  constructor() {
    super("gameOver"); // super({ key: "preload" });
  }

  preload() {}

  create() {
    this.add.text(20, 20, `score: ${globals.score}`);
    this.add.text(300, 20, `level: ${globals.level}`);
    this.add.text(660, 20, `lives: ${globals.lives}`);

    this.gameOverText = this.add.text(400, 300, "Game Over", {
      fontSize: "64px",
      fill: "#000",
    });
    this.gameOverText.setOrigin(0.5);

    this.highScoreInput = this.add.text(
      400,
      400,
      `You have reached the high score!\nYour final score was: ${globals.score}.\nPlease add your name below to submit:`,
      {
        fontSize: "24px",
        fill: "#000",
      }
    );
    this.highScoreInput.setOrigin(0.5);

    this.input.on("pointerdown", () => this.scene.start("preload"));
  }
}

export default GameOverScene;
