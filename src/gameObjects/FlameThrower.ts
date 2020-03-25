import Game from "../scenes/Game";

export default class FlameThrower extends Phaser.Physics.Arcade.Sprite {
  private _config: MissileSimpleConfig;
  private _emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  private _launchSound: Phaser.Sound.BaseSound;
  private _isActive: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }
  create(): void {
    console.log("create FlameThrower");
    this._isActive = false;
    let _scene: Game = <Game>this._config.scene;
    _scene.physics.world.enable(this);

    let graphics = this._config.scene.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
      fillStyle: { color: 0xff0000 }
    });

    let circle = new Phaser.Geom.Circle(this.x, this.y, 60);

    let CircumferencePoint: Phaser.Geom.Point = Phaser.Geom.Circle.CircumferencePoint(
      circle,
      0 - 0.17
    );
    graphics.destroy();

    this.x = CircumferencePoint.x;
    this.y = CircumferencePoint.y;

    this.enableBody(true, this.x, this.y, true, true);

    this.body.setSize(200, 50, true).setOffset(20, -25);
    this.setAlpha(1);

    _scene.add.existing(this);

    let particles = _scene.add.particles("fire").setDepth(10);
    this._emitter = particles.createEmitter({
      alpha: { start: 1, end: 0 },
      scale: { start: 0.5, end: 2.5 },
      tint: { start: 0xff945e, end: 0xff945e },
      speedX: 100,
      accelerationY: 0,
      accelerationX: 400,
      angle: { min: -85, max: -95 },
      rotate: { min: -180, max: 180 },
      lifespan: { min: 1000, max: 1100 },
      blendMode: "ADD",
      frequency: 50,
      maxParticles: 100,
      x: 35,
      y: 0
    });
    this._launchSound = this._config.scene.sound.add("fire");
    this._emitter.startFollow(this);
    this.disable();
  }

  update(time: number, delta: number): void {}

  isActive(): boolean {
    return this._isActive;
  }
  disable() {
    console.log("disable");
    this._isActive = false;
    this._emitter.stop();
    this.body.setSize(0, 0, true).setOffset(0, 0);
    this.body.checkCollision.none = true;
    this._launchSound.stop();
  }
  enable() {
    this._isActive = true;
    console.log("enable");
    this._emitter.start();
    this.body.setSize(200, 50, true).setOffset(20, -25);
    this.body.checkCollision.none = false;
    this.body.checkCollision.right = true;
    this.body.checkCollision.up = true;
    this.body.checkCollision.down = true;
    this._launchSound.play({ volume: 0.5, loop: true });
  }

  remove() {
    console.log("remove");
    // this._emitter.stop();
    this.destroy();
    //this._launchSound.destroy();
  }
}
