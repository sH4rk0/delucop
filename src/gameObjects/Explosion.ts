import Game from "../scenes/Game";
export default class Explosion extends Phaser.GameObjects.Sprite {
  private _config: ExplosionConfig;
  constructor(params: ExplosionConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this.setDepth(10).setAlpha(0.5);

    let _scene: Game = <Game>this._config.scene;

    this.setRotation(Phaser.Math.RND.realInRange(0, 5));

    if (
      this._config.options != undefined &&
      this._config.options.scale != undefined
    )
      this.setScale(this._config.options.scale);

    var animConfig = {
      key: "explode",
      frames: _scene.anims.generateFrameNumbers(this._config.key, {
        frames: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24
        ]
      }),
      frameRate: 10,
      repeat: 0
    };

    _scene.anims.create(animConfig);

    if (
      this._config.options != undefined &&
      this._config.options.nosound != undefined &&
      this._config.options.nosound == false
    ) {
      let sound: Phaser.Sound.BaseSound = this.scene.sound.add("explosion");
      sound.play({ volume: 0.1 });
    }

    this.play("explode");
    _scene.add.existing(this);

    this.on(
      "animationcomplete",
      () => {
        this.destroy();
      },
      this
    );
  }

  // update(time: number, delta: number): void {}
}
