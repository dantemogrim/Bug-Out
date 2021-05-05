import Phaser from "phaser";
import GameScene from "./GameScene";
import PreloadScene from "./PreloadScene";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  backgroundColor: "#76D8FF",
  scene: [PreloadScene, GameScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: true,
    },
  },
};

export default config;
