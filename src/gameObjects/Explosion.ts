import Game from "../scenes/Game";
export default class Explosion extends Phaser.GameObjects.Sprite {
  private _config: {
    scene: Game;
    x: number;
    y: number;
    options: { type: number };
  };
  private _animation: any = [
    {
      key: "blood",
      frames: [0, 1, 2, 3, 4, 5, 6, 7],
      frameRate: 15,
      scale: 2,
      sound: "",
      offsetY: 0,
      offsetX: 0,
    },
    {
      key: "explosion",
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
        24,
        25,
        26,
        27,
      ],
      frameRate: 20,
      scale: 2,
      sound: "",
      offsetY: 40,
      offsetX: 0,
    },
    ,
    {
      key: "fireman",
      frames: [
        21,
        20,
        19,
        18,
        17,
        16,
        15,
        14,
        13,
        12,
        11,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
      ],
      frameRate: 10,
      scale: 2,
      sound: "",
      offsetY: 25,
      offsetX: 0,
    },
  ];
  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    let _scene: Game = <Game>this._config.scene;

    let _options: any = this._animation[this._config.options.type];
    this.setTexture(_options.key)
      .setScale(_options.scale)
      .setDepth(100)
      .setY(this.y + _options.offsetY)
      .setX(this.x + _options.offsetX);

    var animConfig = {
      key: "explode" + this._config.options.type,
      frames: _scene.anims.generateFrameNumbers(_options.key, {
        frames: _options.frames,
      }),
      frameRate: _options.frameRate,
      repeat: 0,
    };

    _scene.anims.create(animConfig);

    if (_options.sound != "") {
      let sound: Phaser.Sound.BaseSound = this.scene.sound.add(_options.sound);
      sound.play({ volume: 0.1 });
    }

    this.play("explode" + this._config.options.type);
    _scene.add.existing(this);

    this.on(
      "animationcomplete",
      () => {
        this._config.scene.tweens.add({
          targets: this,
          alpha: 0,
          duration: 300,
          onComplete: () => {
            this.destroy();
          },
        });
      },
      this
    );
  }
}
