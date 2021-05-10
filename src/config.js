import Phaser from "phaser";
import GameScene from "./GameScene";
import PreloadScene from "./PreloadScene";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  backgroundColor: "#94b5c0",
  scene: [/*PreloadScene, */ GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: false,
    },
  },
};

export default config;
