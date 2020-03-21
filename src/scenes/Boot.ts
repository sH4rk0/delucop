export default class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "Boot"
    });
  }

  preload() {
    /*
    this.load.image("spark", "assets/images/preload/spark.png");
    this.load.image("loading-bg", "assets/images/preload/loading-bg.jpg");

    this.load.spritesheet("asteroid", "assets/images/preload/asteroid.png", {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 60
    });

    this.load.spritesheet("stars", "assets/images/preload/stars.png", {
      frameWidth: 1,
      frameHeight: 1,
      endFrame: 3
    });

    this.load.spritesheet(
      "loading-missile",
      "assets/images/preload/loading-missile.png",
      {
        frameWidth: 124,
        frameHeight: 32,
        endFrame: 10
      }
    );
    */
  }

  create() {
    this.scene.start("Preloader");
  }

  update() {}
}
