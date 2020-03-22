export default class DeluCop extends Phaser.Physics.Arcade.Sprite {
  private _config: any;
  private _walk1: Phaser.Sound.BaseSound;
  private _walk2: Phaser.Sound.BaseSound;
  private _walking: boolean;
  private _step1: boolean;
  private _step2: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;

    this.create();
  }

  create() {
    this._walking = false;
    this._step1 = false;
    this._step2 = false;
    this._config.scene.physics.world.enable(this);
    this.setOrigin(0, 1)
      .setFrame(9)
      .setDepth(13)
      .setScale(0.5);

    var animConfig = {
      key: "walk",
      frames: this._config.scene.anims.generateFrameNumbers("robocop", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }),
      frameRate: 7,
      repeat: -1
    };
    this._config.scene.anims.create(animConfig);
    this._config.scene.add.existing(this);

    this._walk1 = this._config.scene.sound.add("walk1");
    this._walk2 = this._config.scene.sound.add("walk2");
  }

  startWalk() {
    this.play("walk");
    this.setVelocityX(50);
    this._walking = true;
  }

  update(time: number, delta: number) {
    if (this._walking) {
      switch (this.anims.currentFrame.index) {
        case 4:
          if (this._step1) return;
          this._walk1.play(undefined, {
            volume: 0.3,
            rate: 1
          });
          this._step1 = true;
          this._step2 = false;
          break;
        case 9:
          if (this._step2) return;
          this._walk2.play(undefined, {
            volume: 0.3,
            rate: 1
          });
          this._step1 = false;
          this._step2 = true;
          break;
      }
    }
  }
}
