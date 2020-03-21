import Explosion from "./Explosion";
import Shockwave from "./Shockwave";

export default class MissileShockwave extends Phaser.Physics.Arcade.Sprite {
  private _config: MissileShockwaveConfig;
  private _emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  private _launchSound: Phaser.Sound.BaseSound;

  constructor(params: MissileShockwaveConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;

    this.create();
  }
  create(): void {
    this._launchSound = this._config.scene.sound.add("launch");
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

    graphics.destroy();

    this.setRotation(this._config.options?.angle + 1.5)
      .setDepth(10)
      .setAlpha(0)
      .setFrame(1);

    //.setScale(2);

    let _tween: Phaser.Tweens.Tween = this._config.scene.tweens.add({
      targets: this,
      x: {
        value: this._config.options.pointer.x,
        duration: this._config.options.distance * 5,
        ease: "Sine.easeIn"
      },
      y: {
        value: this._config.options.pointer.y,
        duration: this._config.options.distance * 5,
        ease: "Sine.easeIn"
      },
      alpha: {
        value: 1,
        duration: 500,
        ease: "Sine.easeIn"
      },

      onComplete: () => {
        this.remove();

        let _explosion: Explosion = new Explosion({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          key: "explosion-2",
          options: { nosound: true }
        });

        this._config.scene.sound.add("seismic").play({ volume: 0.3 });

        let _shockwave: Shockwave = new Shockwave({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          key: "shockwave",
          options: null
        });
      }
    });

    let particles = this._config.scene.add.particles("spark").setDepth(10);
    this._emitter = particles.createEmitter({
      speed: 10,
      scale: { start: 0.15, end: 0 },
      blendMode: "ADD"
    });

    this._emitter.startFollow(this);

    this._config.scene.add.existing(this);
  }
  update(time: number, delta: number): void {}

  remove() {
    //console.log("remove")
    this._emitter.stop();
    this.destroy();
    this._launchSound.destroy();
  }
}
