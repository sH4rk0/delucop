import Game from "../scenes/Game";
import Explosion from "./Explosion";
export default class EnemyGeneric extends Phaser.Physics.Arcade.Sprite {
  private _config: any;
  private _gameplay: Game;
  private _score: number;
  private _isDying: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this._isDying = false;
    this._config.scene.physics.world.enable(this);
    this._gameplay = <Game>this._config.scene;

    var animConfig = {
      key: "idle-enemy-simple",
      frames: this._gameplay.anims.generateFrameNumbers("enemy-1", {
        frames: [0, 1, 2, 3, 2, 1]
      }),
      frameRate: 5,
      repeat: -1
    };

    this.setDepth(50)
      .setScale(3)
      .setOrigin(0.5, 0)
      .setImmovable();
    this._gameplay.anims.create(animConfig);
    this.play("idle-enemy-simple");

    this._gameplay.add.existing(this);
  }

  update(): void {
    if (this.y > 800) this.destroy();
    if (this._isDying) {
      this.rotation += 0.05;
    }
  }

  kill(type: string) {
    switch (type) {
      case "fire":
        if (this._isDying) return;
        this._isDying = true;
        new Explosion({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          options: { type: 3 }
        });
        this.destroy();
        break;

      case "simple":
        this._isDying = true;
        new Explosion({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          options: { type: 0 }
        });
        this.setOrigin(0.5)
          .setGravity(0, 2000)
          .setVelocityY(-450)
          .setVelocityX(200)
          .setDepth(52);
        break;

      case "explosive":
        let sound: Phaser.Sound.BaseSound = this._config.scene.sound.add(
          "explosion"
        );
        sound.play({ volume: 0.1 });
        new Explosion({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          options: { type: 1 }
        });

        let particles = this._config.scene.add
          .particles("bodyparts")
          .setDepth(10);
        particles.createEmitter({
          frame: [1],
          angle: { min: 240, max: 300 },
          speed: { min: 300, max: 500 },
          quantity: 1,
          lifespan: 4000,
          alpha: { start: 1, end: 0 },
          scale: 2,
          rotate: { start: 0, end: 360, ease: "Back.easeOut" },
          gravityY: 800,
          on: false
        });
        particles.createEmitter({
          frame: [0],
          angle: { min: 240, max: 300 },
          speed: { min: 300, max: 500 },
          quantity: 1,
          lifespan: 4000,
          alpha: { start: 1, end: 0 },
          scale: 2,
          rotate: { start: 10, end: 360, ease: "Back.easeOut" },
          gravityY: 800,
          on: false
        });
        particles.createEmitter({
          frame: [2],
          angle: { min: 240, max: 300 },
          speed: { min: 300, max: 500 },
          quantity: 1,
          lifespan: 4000,
          alpha: { start: 1, end: 0 },
          scale: 2,
          rotate: { start: 10, end: 360, ease: "Back.easeOut" },
          gravityY: 800,
          on: false
        });
        particles.createEmitter({
          frame: [3],
          angle: { min: 240, max: 300 },
          speed: { min: 300, max: 500 },
          quantity: 1,
          lifespan: 4000,
          alpha: { start: 1, end: 0 },
          scale: 2,
          rotate: { start: 10, end: 360, ease: "Back.easeOut" },
          gravityY: 800,
          on: false
        });
        particles.emitParticleAt(this.x, this.y).setDepth(101);

        this.destroy();
        break;
    }
  }

  getScore(): number {
    return 100;
  }
}
