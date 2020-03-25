import MissileShockwave from "../gameObjects/MissileShockwave";
import EnemyGeneric from "../gameObjects/EnemyGeneric";
import FlameThrower from "../gameObjects/FlameThrower";
import DeluCop from "../gameObjects/DeluCop";
import DelucopArm from "../gameObjects/DeluCopArm";

export default class Game extends Phaser.Scene {
  public _shockwaveGroup: Phaser.GameObjects.Group;
  public _asteroidGroup: Phaser.GameObjects.Group;
  public _missileGroup: Phaser.GameObjects.Group;
  public _playerGroup: Phaser.GameObjects.Group;
  public _enemyGroup: Phaser.GameObjects.Group;

  private _bg: Phaser.GameObjects.TileSprite;
  private _music: Phaser.Sound.BaseSound;
  private _flame: FlameThrower;
  private _delucop: DeluCop;
  private _delucopArm: DelucopArm;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.StaticTilemapLayer;
  private _started: boolean;

  private _isGameOver: boolean = false;

  constructor() {
    super({
      key: "Game"
    });
  }

  init() {}

  preload() {}

  create() {
    this._started = false;
    this._music = this.sound.add("game");
    this._music.play(undefined, {
      loop: true,
      volume: 0.05
    });

    this.add
      .tileSprite(0, 0, 1280, 800, "sky")
      .setScale(4)
      .setOrigin(0)
      .setScrollFactor(0);

    this._bg = this.add
      .tileSprite(0, -100, 1280, 800, "bg")
      .setScale(4)
      .setOrigin(0)
      .setScrollFactor(0.2);

    /*this._level0 = this.add
      .tileSprite(0, 800, 1280, 56, "level0")
      .setOrigin(0, 1);*/
    this._isGameOver = false;

    this._shockwaveGroup = this.add.group({
      runChildUpdate: true
    });
    this._asteroidGroup = this.add.group({
      runChildUpdate: true
    });
    this._playerGroup = this.add.group({
      runChildUpdate: true
    });
    this._missileGroup = this.add.group({
      maxSize: 30,
      runChildUpdate: true
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

    this.cameras.main.on(
      "cameraflashstart",
      (cam: any, fx: any, duration: any) => {
        console.log("event");
        //this._earth.destroy();
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

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (this._delucopArm.armMove()) {
        let _angle = Phaser.Math.Angle.BetweenPoints(
          this._delucopArm,
          this.recalculatePointer(pointer)
        );
        if (_angle > -1.3 && _angle < 0.8) this._delucopArm.setRotation(_angle);
      } else {
        this._delucopArm.setRotation(0);
      }
    });

    /*map */

    this.map = this.make.tilemap({
      key: "level0"
    });
    this.tileset = this.map.addTilesetImage("tilemap", "tiles");
    this.layer = this.map.createStaticLayer("buildings", this.tileset, 0, 130);
    this.layer.setScale(3.5).setDepth(1);

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels * 3.5,
      this.map.heightInPixels * 3.5
    );
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels * 3.5,
      this.map.heightInPixels * 3.5
    );

    //console.log(this.map.widthInPixels, this.map.widthInPixels * 3.5);

    this._delucopArm = new DelucopArm({
      scene: this,
      x: 70,
      y: 665,
      key: "arm"
    });

    this._delucop = new DeluCop({
      scene: this,
      x: 20,
      y: 780,
      key: "robocop"
    });

    this._flame = new FlameThrower({
      scene: this,
      x: this._delucopArm.x,
      y: this._delucopArm.y,
      key: "empty"
    });

    this.setUpEnemies();

    this.physics.add.overlap(
      this._flame,
      this._enemyGroup,
      this.fireCollide,
      undefined,
      this
    );

    this._playerGroup.add(this._delucopArm);
    this._playerGroup.add(this._delucop);

    this.cameras.main.startFollow(this._delucop, true, 1, 1, -600);

    this.cameras.main.fadeIn();
  }

  setUpEnemies(): void {
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    const enemiesObject = this.map.getObjectLayer("enemies").objects as any[];

    console.log(enemiesObject);
    enemiesObject.forEach((enemy: any) => {
      switch (enemy.type) {
        case "simple":
          this._enemyGroup.add(
            new EnemyGeneric({
              scene: this,
              key: "enemy-1",
              x: enemy.x * 3.5,
              y: enemy.y * 3.5,
              frame: null,
              name: enemy.type,
              offsetX: 0,
              offsetY: 0
            })
          );
          break;

        case "enemy2":
          break;
      }
    });

    this.physics.add.collider(
      this._missileGroup,
      this._enemyGroup,
      this.shotCollide,
      undefined,
      this
    );
  }

  shotCollide(_obj1: any, _obj2: any): void {
    console.log("collide enemy shot");

    _obj2.kill(_obj1.name);
    _obj1.destroy();
  }

  fireCollide(_obj1: any, _obj2: any): void {
    console.log("collide fire shot");

    _obj2.kill("fire");
  }

  recalculatePointer(pointer: Phaser.Input.Pointer): Phaser.Geom.Point {
    return new Phaser.Geom.Point(
      pointer.x + this.cameras.main.scrollX,
      pointer.y + this.cameras.main.scrollY
    );
  }

  flameTowerStatus(status: boolean) {
    if (status) {
      this._flame.enable();
    } else {
      this._flame.disable();
    }
  }

  setArmMove(status: boolean) {
    this._delucopArm.setArmMove(status);
  }

  arm() {
    return this._delucopArm;
  }

  update(time: number, delta: number) {
    //this.spawnAsteroid();

    if (this._started) {
      this._delucopArm.setX(this._delucop.x + 50);
      this._flame.setX(this._delucop.x + 105);
      //this._bg0.tilePositionX += 0.05;
      //this._bg.tilePositionX += 0.6;
    }

    if (this._delucop != null) {
      this._delucop.update(time, delta);
      //console.log(this.player.body.velocity.y);
    }
  }

  launchMissile(pointer: Phaser.Input.Pointer) {
    this._delucopArm.launchMissile(pointer);
  }

  launchPerforant(pointer: Phaser.Input.Pointer) {
    this._delucopArm.launchPerforant(pointer);
  }

  flameThrower() {
    if (this._flame.isActive()) {
      this._flame.disable();
    } else {
      this._flame.enable();
    }
  }

  launchShockwave(pointer: Phaser.Input.Pointer): void {
    let _angle = Phaser.Math.Angle.BetweenPoints(this._delucopArm, pointer);

    let _distance = Phaser.Math.Distance.Between(
      this._delucopArm.x,
      this._delucopArm.y,
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

  startGame(): void {
    this._started = true;
    this._delucop.startWalk();
  }

  collide(_obj1: any, _obj2: any): void {
    _obj1.destroy();
    this.events.emit("updateScore", [_obj1.getScore()]);
  }

  missileCollide(_obj1: any, _obj2: any): void {}

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

  gameOver(_obj1: any, _obj2: any): void {}
}
