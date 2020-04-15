import Game from "../scenes/Game";

export default class Bonus extends Phaser.GameObjects.Image {
  private _config: BonusConfig;
  private _gameplay: Game;
  private _isActive: boolean = false;
  private _bonus: {
    key: string;
    q: number;
  };

  constructor(params: BonusConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this.name = "bonus";
    this._gameplay = <Game>this._config.scene;
    this._isActive = false;
    this._config.scene.physics.world.enable(this);
    this._bonus = this._config.bonus;
    this.setOrigin(0.5)
      .setFrame(0)
      .setDepth(100)
      .setScale(2)
      .setY(this.y + 96)
      .setX(this.x + 64);

    switch (this._bonus.key) {
      case "flame":
        this.setFrame(2);
        break;

      case "granade":
        this.setFrame(4);
        break;

      case "energy":
        this.setFrame(0);
        break;
    }
    this._gameplay.add.existing(this);
  }

  bonus() {
    this.executeLogic();
  }
  executeLogic() {
    switch (this._bonus.key) {
      case "flame":
        this._gameplay.events.emit("addFlame", [this._bonus.q]);
        this.setFrame(3);
        break;

      case "granade":
        this._gameplay.events.emit("addGranade", [this._bonus.q]);
        this.setFrame(5);
        break;

      case "energy":
        this._gameplay.events.emit("addEnergy", [this._bonus.q]);
        this.setFrame(1);

        break;
    }
    this._gameplay.sound.add("charge").play({ volume: 0.5 });
    this._gameplay.tweens.add({
      targets: this,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.destroy();
      },
    });
  }

  update(): void {
    if (!this._isActive) {
      if (this._gameplay.cameras.main.scrollX + 1280 > this.x) {
        this._isActive = true;
      }
    }
  }
}
