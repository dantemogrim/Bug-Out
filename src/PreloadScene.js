import Phaser, { Scene } from "phaser";

class PreloadScene extends Scene {
  constructor() {
    super("preload"); // super({ key: "preload" });
  }

  preload() {
    this.load.image("logo", "assets/logo.png");
    // Effect.
    this.load.image("particle", "assets/brick.png");
  }

  create() {
    // Effect playground.

    const p = this.add.particles("particle");
    const e = p.createEmitter();
    e.setPosition(400, 300);
    e.setSpeed(200);
    e.setBlendMode(Phaser.BlendModes.ADD);

    this.add.image(400, 300, "logo");

    this.preloadText = this.add.text(400, 100, "X proudly presents..", {
      fontSize: "24px",
      fill: "#fff",
    });
    this.preloadText.setOrigin(0.5);

    this.clickText = this.add.text(400, 550, "Click to start.", {
      fontSize: "25px",
      fill: "#fff",
    });
    this.clickText.setOrigin(0.5);

    // To change scenes - using Phasers own 'event' syntax for mousedown.
    // Here we hand in the key that we've assigned to our scene within the constructor.
    this.input.on("pointerdown", () => this.scene.start("game"));
  }
}

export default PreloadScene;
