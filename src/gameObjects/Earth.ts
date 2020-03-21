export default class Earth extends Phaser.Physics.Arcade.Sprite {
  private _config: EarthConfig;
  constructor(params: EarthConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;

    this.create();
  }

  create() {
    this._config.scene.physics.world.enable(this);
    this.setScale(0.5)
      .setCircle(200)
      .setDepth(9).setImmovable(true);

    this._config.scene.add.existing(this);
  }

  update(time: number, delta: number) {}
}
