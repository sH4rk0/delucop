import Game from "../scenes/Game";
export default class Shockwave extends Phaser.Physics.Arcade.Sprite {
  private _config: ShockwaveConfig;
  constructor(params: ShockwaveConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this._config.scene.physics.world.enable(this);
    this.setInteractive()
      .setDepth(9)
      .setCircle(10, 86, 86);

    let _scene: Game = <Game>this._config.scene;

    var animConfig: any = {
      key: "shock",
      frames: _scene.anims.generateFrameNumbers("shockwave", {
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

    let _anim: any = _scene.anims.create(animConfig);

    this.play("shock");
    _scene._shockwaveGroup.add(this);
    _scene.add.existing(this);

    this.on(
      "animationcomplete",
      () => {
        this.destroy();
      },
      this
    );
  }

  update(time: number, delta: number): void {
    //console.log(192 * this.anims.getProgress());
    switch (this.anims.currentFrame.index) {
      case 0:
        this.setCircle(20, 76, 76);
        break;
      case 1:
        this.setCircle(40, 56, 56);
        break;
      case 2:
        this.setCircle(68, 28, 28);
        break;
      case 3:
        this.setCircle(72, 24, 24);
        break;
      case 4:
        this.setCircle(76, 20, 20);
        break;
      case 5:
        this.setCircle(80, 16, 16);
        break;
      case 6:
        this.setCircle(84, 12, 12);
        break;
      case 7:
        this.setCircle(88, 8, 8);
        break;
      case 8:
        this.setCircle(90, 6, 6);
        break;
      case (9, 10, 11, 12, 13):
        this.setCircle(96, 0, 0);
        break;
      case 14:
        this.setCircle(90, 6, 6);
        break;
      case 15:
        this.setCircle(80, 16, 16);
        break;
      case 16:
        this.setCircle(70, 26, 26);
        break;
      case 17:
        this.setCircle(60, 36, 36);
        break;
      case 18:
        this.setCircle(50, 46, 46);
        break;
      case 19:
        this.setCircle(40, 56, 56);
        break;
      case 20:
        this.setCircle(30, 66, 66);
        break;
      case 21:
        this.setCircle(20, 76, 76);
        break;
      case (22, 23, 24):
        this.setCircle(10, 86, 86);
        break;
    }
  }
}
