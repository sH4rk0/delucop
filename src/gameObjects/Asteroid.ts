import Game from "../scenes/Game";
export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
  private _config: AsteroidConfig;
  private _frames: Array<number> = [12, 12, 15, 13];
  private _sizes: Array<number> = [40, 40, 50, 35];
  private _asteroid: number = 0;
  private _gameplay: Game;
  private _score: number;

  constructor(params: AsteroidConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this._config.scene.physics.world.enable(this);
    this._asteroid = Phaser.Math.RND.integerInRange(0, 3);

    this.setCircle(this._sizes[this._asteroid]).setTexture(
      "asteroid-" + this._asteroid
    );

    this._gameplay = <Game>this._config.scene;
    let _frameArr: Array<number> = [];
    for (let i = 0; i < this._frames[this._asteroid] - 1; i++) {
      _frameArr.push(i);
    }
    var animConfig = {
      key: "rotate-" + this._asteroid,
      frames: this._gameplay.anims.generateFrameNumbers(
        "asteroid-" + this._asteroid,
        {
          frames: _frameArr
        }
      ),
      frameRate: 5,
      repeat: -1
    };

    this._gameplay.anims.create(animConfig);

    this.play("rotate-" + this._asteroid);

    let _startX: number = -40;
    let _startY: number = -40;

    switch (Phaser.Math.RND.integerInRange(0, 3)) {
      case 0:
        //console.log("left");
        _startY = this._gameplay.getRndY();
        break;
      case 1:
        _startX = this._gameplay.game.canvas.width + 40;
        _startY = this._gameplay.getRndY();
        //console.log("right");
        break;
      case 2:
        _startX = this._gameplay.getRndX();
        //console.log("top");
        break;
      case 3:
        //console.log("bottom");
        _startX = this._gameplay.getRndX();
        _startY = this._gameplay.game.canvas.height + 40;
        break;
    }

    //console.log(_startX, _startY);
    let _distance = Phaser.Math.Distance.Between(
      this._gameplay.game.canvas.width / 2,
      this._gameplay.game.canvas.height / 2,
      _startX,
      _startY
    );

    this.x = _startX;
    this.y = _startY;

    this._score = this._config.options.speed * 10;
    this._gameplay.physics.moveToObject(
      this,
      this._gameplay.earth(),
      this._config.options.speed
    );
    this._gameplay._asteroidGroup.add(this);
    this._gameplay.add.existing(this);
  }

  update(): void {
    this.rotation += 0.001;
  }

  getScore(): number {
    return this._score;
  }
}
