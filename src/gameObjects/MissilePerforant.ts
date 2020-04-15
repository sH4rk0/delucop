import Game from "../scenes/Game";

export default class MissilePerforant extends Phaser.Physics.Arcade.Sprite {
  private _config: MissileSimpleConfig;
  private _launchSound: Phaser.Sound.BaseSound;
  private _isPerforant: boolean;
  private _particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _collide: boolean;
  private _pointer: Phaser.Input.Pointer;

  constructor(params: MissileSimpleConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }
  create(): void {
    this.name = "explosive";
    this._collide = false;

    this._pointer = this._config.options.pointer;
    this._isPerforant = true;
    let _scene: Game = <Game>this._config.scene;
    _scene.physics.world.enable(this);

    this._launchSound = _scene.sound.add("shot2");
    this._launchSound.play({ volume: 0.1 });

    /*  let graphics = this._config.scene.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
      fillStyle: { color: 0xff0000 }
    });

    let circle = new Phaser.Geom.Circle(this.x, this.y, 60);

    let CircumferencePoint: Phaser.Geom.Point = Phaser.Geom.Circle.CircumferencePoint(
      circle,
      this._config.options?.angle - 0.17
    );
    graphics.destroy();

    this.x = CircumferencePoint.x;
    this.y = CircumferencePoint.y;
*/
    this._particles = this._config.scene.add
      .particles("explosionParticles")
      .setDepth(100000);
    this._particles.createEmitter({
      frame: ["smoke-puff", "cloud", "smoke-puff"],
      angle: { min: 240, max: 300 },
      speed: { min: 20, max: 30 },
      quantity: 6,
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 0.1, end: 0 },
      on: false,
    });

    this._particles.createEmitter({
      frame: "muzzleflash2",
      lifespan: 200,
      scale: { start: 0.5, end: 0 },
      rotate: { start: 0, end: 180 },
      on: false,
    });

    this._particles.emitParticleAt(this.x, this.y);

    this.enableBody(true, this.x, this.y, true, true);

    this.setRotation(this._config.options?.angle + 1.5)
      .setDepth(11)
      .setFrame(2)
      .setOrigin(0.5)
      .setCircle(7.5, 7.5, 7.5);

    _scene.physics.velocityFromRotation(
      this._config.options.angle + Phaser.Math.RND.realInRange(-0.025, 0.025),
      100 * this._config.options.speed,
      this.body.velocity
    );

    _scene.add.existing(this);

    /* let particles = _scene.add.particles("spark").setDepth(10);
    this._emitter = particles.createEmitter({
      speed: 10,
      scale: { start: 0.15, end: 0 },
      blendMode: "ADD"
    });

    this._emitter.startFollow(this);
    */
  }

  getCollide(): boolean {
    return this._collide;
  }

  update(time: number, delta: number): void {
    if (this.x >= this._pointer.x + this._config.scene.cameras.main.scrollX) {
      this._collide = true;
    }
    if (
      this.x > 1280 + this._config.scene.cameras.main.scrollX ||
      this.y < 0 ||
      this.y > 780
    )
      this.remove();
  }

  isPerforant(): boolean {
    return this._isPerforant;
  }

  remove() {
    //console.log("remove");
    //this._emitter.stop();
    this.destroy();
    //this._launchSound.destroy();
  }
}
