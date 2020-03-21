import Earth from "../gameObjects/Earth";
import MissileShockwave from "../gameObjects/MissileShockwave";
import Asteroid from "../gameObjects/Asteroid";
import MissileSimple from "../gameObjects/MissileSimple";
import MissilePerforant from "../gameObjects/MissilePerforant";
import Explosion from "../gameObjects/Explosion";

export default class Game extends Phaser.Scene {
  public _earth: Earth;
  public _shockwaveGroup: Phaser.GameObjects.Group;
  public _asteroidGroup: Phaser.GameObjects.Group;
  public _missileGroup: Phaser.GameObjects.Group;
  private _bg: Phaser.GameObjects.TileSprite;
  private _asteroidParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _missileParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private _earthParticle: Phaser.GameObjects.Particles.ParticleEmitterManager;

  private _isGameOver: boolean = false;

  constructor() {
    super({
      key: "Game"
    });
  }

  init() {}

  preload() {}

  create() {
    console.log("create gameplay");
    this._bg = this.add.tileSprite(0, 0, 1280, 800, "bg").setOrigin(0);
    this._isGameOver = false;

    this._shockwaveGroup = this.add.group({
      runChildUpdate: true
    });
    this._asteroidGroup = this.add.group({
      runChildUpdate: true
    });
    this._missileGroup = this.add.group({
      classType: MissileSimple,
      maxSize: 30,
      runChildUpdate: true
    });

    this._earth = new Earth({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2,
      key: "earth"
    });

    this.physics.add.overlap(
      this._asteroidGroup,
      this._shockwaveGroup,
      this.collide,
      undefined,
      this
    );

    this.physics.add.overlap(
      this._asteroidGroup,
      this._missileGroup,
      this.missileCollide,
      undefined,
      this
    );

    this.physics.add.collider(
      this._earth,
      this._asteroidGroup,
      this.gameOver,
      undefined,
      this
    );

    this._asteroidParticle = this.add
      .particles("asteroid-emitter")
      .setDepth(30);

    this._earthParticle = this.add.particles("spark");
    this._earthParticle.createEmitter({
      angle: { min: 0, max: 360, steps: 128 },
      lifespan: 3000,
      speed: 500,
      quantity: 128,
      scale: { start: 0.7, end: 1.5 },
      alpha: { start: 0.8, end: 0 },
      on: false
    });

    this._missileParticle = this.add.particles("asteroid-emitter");

    this._asteroidParticle.createEmitter({
      frame: 0,
      angle: { min: 0, max: 360 },
      speed: { min: 10, max: 30 },
      quantity: { min: 6, max: 8 },
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 0.1, end: 0.4 },
      on: false
    });

    this._asteroidParticle.createEmitter({
      frame: [1, 2, 3, 4],
      angle: { min: 0, max: 360 },
      speed: { min: 30, max: 60 },
      quantity: { min: 6, max: 10 },
      lifespan: 3000,
      alpha: { start: 1, end: 0 },
      scale: 0.5,
      // scale: { start: 0.05, end: 0.5 },
      rotate: { start: 0, end: 360 },
      gravityY: 0,
      on: false
    });

    this._asteroidParticle.createEmitter({
      frame: 5,
      lifespan: 200,
      scale: { start: 2, end: 0 },
      rotate: { start: 0, end: 180 },
      alpha: { start: 0.8, end: 0 },
      on: false
    });

    this._missileParticle.createEmitter({
      frame: 5,
      lifespan: 200,
      scale: { start: 1, end: 0 },
      rotate: { start: 0, end: 180 },
      alpha: { start: 0.8, end: 0 },
      on: false
    });

    let offscreen = new Phaser.Geom.Rectangle(1280, 0, 50, 800);
    let leave = new Phaser.Geom.Rectangle(-40, 0, 40, 800);
    this.add.particles("stars", [
      {
        emitZone: { source: offscreen },
        deathZone: { type: "onEnter", source: leave },
        frame: [0],
        frequency: 5000,
        speedX: { min: -30, max: -40 },
        lifespan: 60000,
        scale: 2
      },
      {
        emitZone: { source: offscreen },
        deathZone: { type: "onEnter", source: leave },
        frame: [1],

        frequency: 5000,
        speedX: { min: -20, max: -30 },
        lifespan: 60000,
        scale: 2
      },

      {
        emitZone: { source: offscreen },
        deathZone: { type: "onEnter", source: leave },
        frame: [2],

        frequency: 5000,
        speedX: { min: -10, max: -20 },
        lifespan: 60000,
        scale: 2
      }
    ]);

    this.cameras.main.on(
      "cameraflashstart",
      (cam: any, fx: any, duration: any) => {
        console.log("event");
        this._earth.destroy();
      }
    );

    this.cameras.main.on(
      "cameraflashcomplete",
      (cam: any, fx: any, duration: any) => {
        this.scene.stop("Hud");
        this.scene.stop("Gameplay");
        this.scene.start("GameOver");
        this.scene.start("ScoreInput");
        this.scene.bringToTop("ScoreInput");
        this.scene.bringToTop("GameOver");
      }
    );
  }

  earth(): Earth {
    return this._earth;
  }

  update(time: number, delta: number) {
    //this.spawnAsteroid();
    this._bg.tilePositionX += 0.01 * delta;
    this._bg.tilePositionY += 0.005 * delta;
  }

  launchMissile(pointer: Phaser.Input.Pointer) {
    let _angle = Phaser.Math.Angle.BetweenPoints(this._earth, pointer);
    let _missile: MissileSimple = new MissileSimple({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2,
      key: "missile",
      options: {
        angle: _angle,
        pointer: pointer,
        speed: 3
      }
    });

    this._missileGroup.add(_missile);
  }

  launchPerforant(pointer: Phaser.Input.Pointer) {
    let _angle = Phaser.Math.Angle.BetweenPoints(this._earth, pointer);
    let _missile: MissilePerforant = new MissilePerforant({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2,
      key: "missile",
      options: {
        angle: _angle,
        pointer: pointer,
        speed: 2
      }
    });

    this._missileGroup.add(_missile);
  }

  launchShockwave(pointer: Phaser.Input.Pointer): void {
    let _angle = Phaser.Math.Angle.BetweenPoints(this._earth, pointer);
    let _distance = Phaser.Math.Distance.Between(
      this._earth.x,
      this._earth.y,
      pointer.x,
      pointer.y
    );

    let _missile: MissileShockwave = new MissileShockwave({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2,
      key: "missile",
      options: {
        angle: _angle,
        distance: _distance,
        pointer: pointer
      }
    });
  }

  createAsteroid(options: AsteroidConfigOptions): void {
    new Asteroid({
      scene: this,
      x: 0,
      y: 0,
      key: "",
      options: options
    });
  }

  collide(_obj1: any, _obj2: any): void {
    this._asteroidParticle.emitParticleAt(_obj1.x, _obj1.y);
    this.playExplosion();
    _obj1.destroy();
    this.events.emit("updateScore", [_obj1.getScore()]);
  }

  missileCollide(_obj1: any, _obj2: any): void {
    this._asteroidParticle.emitParticleAt(_obj1.x, _obj1.y);

    this.playExplosion();
    this.events.emit("updateScore", [_obj1.getScore()]);

    if (!_obj2.isPerforant()) {
      this._missileParticle.emitParticleAt(_obj2.x, _obj2.y);
      _obj2.remove();
    }

    _obj1.destroy();
  }

  getRndX(): number {
    return Phaser.Math.RND.integerInRange(0, this.game.canvas.width);
  }

  getRndY(): number {
    return Phaser.Math.RND.integerInRange(0, this.game.canvas.height);
  }

  playExplosion() {
    let sound: Phaser.Sound.BaseSound = this.sound.add("explosion");
    sound.play({ volume: 0.1 });
  }

  gameOver(_obj1: any, _obj2: any): void {
    if (this._isGameOver) {
      this._asteroidParticle.emitParticleAt(_obj2.x, _obj2.y);
      this.playExplosion();
      _obj2.destroy();
    } else {
      this._isGameOver = true;

      for (let i = 0; i < 10; i++) {
        this.time.addEvent({
          delay: Phaser.Math.RND.integerInRange(0, 2000),
          callback: () => {
            this._asteroidParticle.emitParticleAt(
              Phaser.Math.RND.integerInRange(600, 680),
              Phaser.Math.RND.integerInRange(360, 440)
            );
            this.playExplosion();
          },
          callbackScope: this,
          loop: false
        });
      }

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.cameras.main.flash(
            2000,
            255,
            255,
            255,
            true,
            (cam: any, progress: number) => {}
          );
        },
        callbackScope: this,
        loop: false
      });

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          let _shock = this.add
            .sprite(640, 400, "shockwave")
            .setOrigin(0.5)
            .setScale(2);
          var animConfig: any = {
            key: "shock",
            frames: this.anims.generateFrameNumbers("shockwave", {
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
            frameRate: 12,
            repeat: 0
          };

          this.time.addEvent({
            delay: 1300,
            callback: () => {
              this.playExplosion();
              this._earthParticle.emitParticleAt(this._earth.x, this._earth.y);
            }
          });

          let _anim: any = this.anims.create(animConfig);

          _shock.play("shock");

          let _explosion: Explosion = new Explosion({
            scene: this,
            x: 640,
            y: 400,
            key: "explosion-2",
            options: { scale: 4 }
          });
        },
        callbackScope: this,
        loop: false
      });

      this._asteroidParticle.emitParticleAt(_obj2.x, _obj2.y);
      this.playExplosion();
      _obj2.destroy();
    }
  }
}
