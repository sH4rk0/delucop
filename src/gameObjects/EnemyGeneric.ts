import Game from "../scenes/Game";
import Explosion from "./Explosion";
import Score from "./Score";
export default class EnemyGeneric extends Phaser.Physics.Arcade.Sprite {
  private _config: enemyGenericConfig;
  private _gameplay: Game;
  private _score: number;
  private _isDying: boolean;
  private _isActive: boolean = false;

  constructor(params: enemyGenericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    //console.log("enemy");
    this._isDying = false;
    this._score = this._config.score;
    this._isActive = false;
    this._config.scene.physics.world.enable(this);
    this._gameplay = <Game>this._config.scene;

    var animConfig = {
      key: "walk-enemy-simple-" + this._config.name,
      frames: this._gameplay.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 5,
      repeat: -1,
    };

    this._gameplay.anims.create(animConfig);

    var animConfig = {
      key: "idle-enemy-simple-" + this._config.name,
      frames: this._gameplay.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 5,
      repeat: -1,
    };

    this._gameplay.anims.create(animConfig);
    this.play("walk-enemy-simple-" + this._config.name);

    this.setOrigin(0.5)
      .setImmovable()
      .setInteractive()
      .setScale(0.9)
      .setSize(50, 150)
      .setOffset(20, 50)
      .setY(
        this._config.y +
          this._config.offsetY +
          Phaser.Math.RND.integerInRange(5, 15)
      )
      .setX(this._config.x + this._config.offsetX)
      .setDepth(this.y);

    this.setVisible(false);

    this._gameplay.add.existing(this);
  }

  executeLogic() {
    //console.log("execute logic");
    this.setVelocityX(Phaser.Math.RND.integerInRange(-45, -55));
  }

  update(): void {
    //console.log("i'm active");

    if (!this._isActive) {
      if (this._gameplay.cameras.main.scrollX + 1280 > this.x) {
        this._isActive = true;
        this.setVisible(true);
        this.executeLogic();
      }
    }

    if (this.y > 900 || this.x < this._gameplay._player.x - 100) {
      //console.log("destroy");
      this.destroy();
    }
    if (this._isDying) {
      this.rotation += 0.05;
    }
  }

  kill(type: string) {
    let _score: number = 0;
    switch (type) {
      case "fire":
        if (this._isDying) return;
        this._isDying = true;
        new Explosion({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          options: { type: 3 },
        });
        _score = this.getScore() * 100;

        this.destroy();
        break;

      case "simple":
        this._isDying = true;
        new Explosion({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          options: { type: 0 },
        });
        this.anims.stop();
        this.setOrigin(0.5)
          .setGravity(0, 2000)
          .setVelocityY(-400)
          .setVelocityX(200)
          .setDepth(52);

        _score = this.getScore() * 5;

        break;

      case "explosive":
        let sound: Phaser.Sound.BaseSound = this._config.scene.sound.add(
          "explosion"
        );

        _score = this.getScore() * 50;

        sound.play({ volume: 0.1 });
        new Explosion({
          scene: this._config.scene,
          x: this.x,
          y: this.y,
          options: { type: 1 },
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
          on: false,
        });
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
          on: false,
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
          on: false,
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
          on: false,
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
          on: false,
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
          on: false,
        });
        particles.emitParticleAt(this.x, this.y).setDepth(101);

        this.destroy();
        break;
    }

    this._gameplay.events.emit("updateScore", [_score]);

    new Score({ scene: this._gameplay, x: this.x, y: this.y, score: _score });
  }

  getScore(): number {
    return this._score;
  }
}
