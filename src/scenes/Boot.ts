export default class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "Boot",
    });
  }

  preload() {
    var graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 1280, 800);
    graphics.generateTexture("black-screen", 1280, 800);
  }

  create() {
    this.scene.start("Preloader");
  }

  update() {}
}
