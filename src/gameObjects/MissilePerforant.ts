import Game from "../scenes/Game";

export default class MissilePerforant extends Phaser.Physics.Arcade.Sprite {
  private _config: MissileSimpleConfig;
  private _emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  private _launchSound: Phaser.Sound.BaseSound;
  private _isPerforant: boolean;

  constructor(params: MissileSimpleConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }
  create(): void {
    this._isPerforant = true;
    let _scene: Game = <Game>this._config.scene;
    _scene.physics.world.enable(this);

    this._launchSound = _scene.sound.add("launch");
    this._launchSound.play({ volume: 0.1 });

    let graphics = this._config.scene.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
      fillStyle: { color: 0xff0000 }
    });

    let circle = new Phaser.Geom.Circle(this.x, this.y, 80);

    let CircumferencePoint: Phaser.Geom.Point = Phaser.Geom.Circle.CircumferencePoint(
      circle,
      this._config.options?.angle
    );
    graphics.destroy();

    this.x = CircumferencePoint.x;
    this.y = CircumferencePoint.y;

    this.enableBody(true, this.x, this.y, true, true);

    this.setRotation(this._config.options?.angle + 1.5)
      .setDepth(11)
      .setAlpha(0)
      .setFrame(2)
      .setOrigin(0.5)
      .setCircle(7.5, 7.5, 7.5);

    _scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 1000
    });

    _scene.physics.velocityFromRotation(
      this._config.options.angle,
      100 * this._config.options.speed,
      this.body.velocity
    );

    _scene.add.existing(this);

    let particles = _scene.add.particles("spark").setDepth(10);
    this._emitter = particles.createEmitter({
      speed: 10,
      scale: { start: 0.15, end: 0 },
      blendMode: "ADD"
    });

    this._emitter.startFollow(this);
  }

  update(time: number, delta: number): void {
    if (this.x < 0 || this.x > 1280 || this.y < 0 || this.y > 800)
      this.remove();
  }

  isPerforant(): boolean {
    return this._isPerforant;
  }

  remove() {
    console.log("remove");
    this._emitter.stop();
    this.destroy();
    this._launchSound.destroy();
  }
}
