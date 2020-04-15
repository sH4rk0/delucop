import Game from "../scenes/Game";
export default class Score extends Phaser.GameObjects.Text {
  private _config: {
    scene: Game;
    x: number;
    y: number;
    score: number;
  };

  constructor(params: any) {
    super(params.scene, params.x, params.y, "", {});
    this._config = params;
    this.create();
  }

  create() {
    let _scene: Game = <Game>this._config.scene;
    this.setDepth(1000)
      .setText("" + this._config.score)
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setAlpha(0)
      .setStroke("#000000", 6)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(40);

    _scene.tweens.add({
      targets: this,
      alpha: 1,
      y: "-=150",
      yoyo: true,
      ease: "Sine.easeInOut",
      duration: 600,
      onComplete: () => {
        this.destroy();
      },
    });

    _scene.add.existing(this);
  }
}
