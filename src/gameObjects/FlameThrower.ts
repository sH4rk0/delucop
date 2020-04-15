import Game from "../scenes/Game";
export default class FlameThrower extends Phaser.GameObjects.Container {
  private _config: MissileSimpleConfig;
  private _emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  private _launchSound: Phaser.Sound.BaseSound;
  private _isActive: boolean;
  private _scene: Game;
  private _angle: number;
  private _particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _flamecolliderGroup: Phaser.GameObjects.Group;
  private _colliders: Array<Phaser.Physics.Arcade.Image>;
  private _tweens: Array<Phaser.Tweens.Tween>;

  constructor(params: any) {
    super(params.scene, params.x, params.y);
    this._config = params;
    this.create();
  }
  create(): void {
    this._tweens = [];
    this._isActive = false;
    this._scene = <Game>this._config.scene;
    this._flamecolliderGroup = this._scene.add.group();
    this._colliders = [];
    this._colliders.push(
      this._scene.physics.add.image(0, 0, "empty60").setOrigin(0.5)
    );
    this._colliders[0].body.setCircle(30);

    this._colliders.push(
      this._scene.physics.add.image(0, 0, "empty60").setOrigin(0.5)
    );
    this._colliders[1].body.setCircle(20, 10, 10);

    this._colliders.push(
      this._scene.physics.add.image(0, 0, "empty60").setOrigin(0.5)
    );
    this._colliders[2].body.setCircle(10, 20, 20);

    this._flamecolliderGroup.add(this._colliders[0]);
    this._flamecolliderGroup.add(this._colliders[1]);
    this._flamecolliderGroup.add(this._colliders[2]);

    this._particles = this._scene.add.particles("fire").setDepth(100000);
    this._emitter = this._particles.createEmitter({
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
    });

    this._launchSound = this._config.scene.sound.add("fire");

    this.add([
      this._particles,
      this._colliders[0],
      this._colliders[1],
      this._colliders[2],
    ]).setDepth(10000);

    this._tweens[0] = this._scene.tweens
      .add({
        targets: this._colliders[0],
        x: "+=160",
        ease: "Sine.easeIn",
        duration: 1000,
      })
      .pause();

    this._tweens[1] = this._scene.tweens
      .add({
        targets: this._colliders[1],
        x: "+=90",
        ease: "Sine.easeIn",
        duration: 500,
        delay: 500,
      })
      .pause();

    this._tweens[2] = this._scene.tweens
      .add({
        targets: this._colliders[2],
        x: "+=40",
        ease: "Sine.easeIn",
        duration: 200,
        delay: 800,
      })
      .pause();

    this.disable();
    this._scene.add.existing(this);
  }

  update(time: number, delta: number): void {
    this.setPosition(
      this._scene._player.calculateBullet(this._angle).x,
      this._scene._player.calculateBullet(this._angle).y
    );
  }

  isActive(): boolean {
    return this._isActive;
  }

  getColliderGroup(): Phaser.GameObjects.Group {
    return this._flamecolliderGroup;
  }

  setCustomAngle(_angle: number) {
    this._angle = _angle;
    this.setRotation(_angle);
  }

  disable() {
    this.stopTween();
    this.setCollisionNone(true);
    this.resetPosition();
    this._isActive = false;
    this._emitter.stop();
    this._launchSound.stop();
  }

  enable() {
    this.resetPosition();
    this.setCollisionNone(false);
    this.startTween();
    this._isActive = true;
    this._emitter.start();
    this._launchSound.play({ volume: 0.5, loop: true });
  }

  startTween() {
    this._tweens[0].restart().resume();
    this._tweens[1].restart().resume();
    this._tweens[2].restart().resume();
  }

  stopTween() {
    this._tweens[0].restart().pause();
    this._tweens[1].restart().pause();
    this._tweens[2].restart().pause();
  }

  private resetPosition(): void {
    this._colliders[0].setPosition(0, 0);
    this._colliders[1].setPosition(0, 0);
    this._colliders[2].setPosition(0, 0);
  }

  private setCollisionNone(status: boolean): void {
    this._colliders[0].body.checkCollision.none = status;
    this._colliders[1].body.checkCollision.none = status;
    this._colliders[2].body.checkCollision.none = status;
  }
}
