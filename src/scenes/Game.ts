import EnemyGeneric from "../gameObjects/EnemyGeneric";
import Player from "../gameObjects/Player";
import Actions from "../gameObjects/Actions";
import Bonus from "../gameObjects/Bonus";

export default class Game extends Phaser.Scene {
  public _shootGroup: Phaser.GameObjects.Group;
  public _enemyGroup: Phaser.GameObjects.Group;
  public _actionGroup: Phaser.GameObjects.Group;
  private _bg: Phaser.GameObjects.TileSprite;
  private _sky: Phaser.GameObjects.TileSprite;
  public _player: Player;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.StaticTilemapLayer;
  private layer2: Phaser.Tilemaps.StaticTilemapLayer;
  private _started: boolean;
  private _isGameOver: boolean = false;

  constructor() {
    super({
      key: "Game",
    });
  }

  init() {}

  preload() {}

  create() {
    this._started = false;
    this._sky = this.add
      .tileSprite(0, 0, 1280, 800, "")
      .setScale(4)
      .setOrigin(0)
      .setScrollFactor(0);

    this._bg = this.add.tileSprite(0, 0, 1280, 800, "");

    this._isGameOver = false;

    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._actionGroup = this.add.group({ runChildUpdate: true });
    this._shootGroup = this.add.group({
      maxSize: 30,
      runChildUpdate: true,
    });

    this.cameras.main.on(
      "cameraflashstart",
      (cam: any, fx: any, duration: any) => {
        //console.log("event");
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

    this._player = new Player({ scene: this, x: 0, y: 780 });

    /* COLLISIONS
    ++++++++++++++++++++++++++++++++++++++++++++++++*/
    this.physics.add.overlap(
      this._player.getFlame(),
      this._enemyGroup,
      this.fireCollide,
      undefined,
      this
    );

    this.physics.add.overlap(
      this._shootGroup,
      this._enemyGroup,
      this.shotCollide,
      undefined,
      this
    );

    this.physics.add.collider(
      this._player,
      this._actionGroup,
      this.actionCollide,
      undefined,
      this
    );

    this.cameras.main.startFollow(this._player, true, 1, 1, -600);
    this.cameras.main.fadeIn();
  }

  setupLevel(level: level) {
    console.log(level);
    this._bg
      .setTexture(level.bg.key)
      .setPosition(level.bg.x, level.bg.y)
      .setScale(level.bg.scale)
      .setOrigin(0)
      .setScrollFactor(level.bg.scroll)
      .setVisible(level.bg.visible);

    this._sky.setTexture(level.sky);
    this._player.setX(0);
    this._enemyGroup.clear(true);
    this.map = this.make.tilemap({
      key: level.map,
    });
    this.tileset = this.map.addTilesetImage("tilemap", "tiles");
    this.layer = this.map.createStaticLayer("buildings", this.tileset, 0, 130);
    this.layer.setScale(3.5).setDepth(2);

    this.layer2 = this.map.createStaticLayer(
      "buildings2",
      this.tileset,
      0,
      130
    );
    this.layer2.setScale(3.5).setDepth(1).setScrollFactor(0.5);

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
    this.setUpEnemies();
    this.setUpActions();
  }

  recalculatePointer(pointer: Phaser.Input.Pointer): Phaser.Geom.Point {
    return this._player.recalculatePointer(pointer);
  }

  getArmPosition(): Phaser.Geom.Point {
    return this._player.getArmPosition();
  }

  setUpEnemies(): void {
    const layerObject = this.map.getObjectLayer("enemies").objects as any[];

    let _typeEnemy: {
      key: string;
      ox: number;
      oy: number;
      score: number;
    };
    let _typeBonus: {
      key: string;
      q: number;
    };

    layerObject.forEach((obj: any) => {
      switch (obj.name) {
        case "simple":
          _typeEnemy = JSON.parse(obj.type);

          this._enemyGroup.add(
            new EnemyGeneric({
              scene: this,
              key: _typeEnemy.key,
              x: obj.x * 3.5,
              y: obj.y * 3.5,
              frame: null,
              name: obj.name,
              offsetX: _typeEnemy.ox,
              offsetY: _typeEnemy.oy,
              score: _typeEnemy.score,
            })
          );
          break;

        case "bonus":
          _typeBonus = JSON.parse(obj.type);
          this._enemyGroup.add(
            new Bonus({
              scene: this,
              key: "bonus",
              x: obj.x * 3.5,
              y: obj.y * 3.5,
              bonus: _typeBonus,
            })
          );
          break;
      }
    });
  }

  setUpActions(): void {
    const _mapObject = this.map.getObjectLayer("actions").objects as any[];

    let _type: {
      action: string;
    };

    _mapObject.forEach((action: any) => {
      _type = JSON.parse(action.type);

      this._actionGroup.add(
        new Actions({
          scene: this,
          key: "empty60",
          x: action.x * 3.5,
          y: action.y * 3.5,
          action: _type,
        })
      );
    });
  }

  pause(): void {}

  shotCollide(_obj1: any, _obj2: any): void {
    //console.log("collide enemy shot");

    if (_obj1.getCollide()) {
      if (_obj2.name == "bonus") {
        _obj1.destroy();
        _obj2.bonus();
      } else {
        _obj2.kill(_obj1.name);
        _obj1.destroy();
      }
    }
  }

  actionCollide(_obj1: any, _obj2: any): void {
    //console.log("collide enemy shot");

    _obj2.executeLogic();
  }

  fireCollide(_obj1: any, _obj2: any): void {
    if (_obj2.name == "bonus") {
      _obj2.bonus();
    } else {
      _obj2.kill("fire");
    }

    //console.log("collide fire shot");
  }

  flameTowerStatus(status: boolean) {
    if (status) {
      this._player.enableFlame();
    } else {
      this._player.disableFlame();
    }
  }

  setArmMove(status: boolean) {
    this._player.setArmMove(status);
  }

  getArm() {
    return this._player.getArm();
  }

  update(time: number, delta: number) {
    if (this._started) {
      if (this._player != null) {
        this._player.update(time, delta);
      }
    }
  }

  stopWalk() {
    this._player.stopWalk();
  }

  launchMissile(pointer: Phaser.Input.Pointer) {
    this._player.launchMissile(pointer);
  }

  launchPerforant(pointer: Phaser.Input.Pointer) {
    this._player.launchPerforant(pointer);
  }

  flameThrower() {
    this._player.flameThrower();
  }

  startGame(): void {
    this._started = true;
    //return;
    this._player.setArmMove(true);
    this._player.startWalk();
  }

  levelCompleted() {
    this.events.emit("levelCompleted");
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
