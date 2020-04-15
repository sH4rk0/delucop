import Game from "../scenes/Game";

export default class Actions extends Phaser.GameObjects.Image {
  private _config: ActionConfig;
  private _gameplay: Game;
  private _isActive: boolean = false;
  private _action: {
    action: string;
    delay?: number;
  };

  constructor(params: ActionConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this.create();
  }

  create() {
    this._isActive = false;
    this._config.scene.physics.world.enable(this);
    this._gameplay = <Game>this._config.scene;
    this._action = this._config.action;
    this.setOrigin(0.5).setVisible(false);
    this._gameplay.add.existing(this);
  }

  executeLogic() {
    //console.log("executelogic");
    switch (this._action.action) {
      case "stopwalk":
        this._gameplay._player.stopWalk();

        break;

      case "stopandrestart":
        this._gameplay._player.stopWalk();
        this._gameplay.time.addEvent({
          delay: this._action.delay,
          callback: () => {
            this._gameplay._player.startWalk();
          },
        });
        break;

      case "levelcompleted":
        this._gameplay.levelCompleted();
        break;
    }

    this.destroy();
  }

  update(): void {
    if (!this._isActive) {
      if (this._gameplay.cameras.main.scrollX + 1280 > this.x) {
        this._isActive = true;
      }
    }
  }
}
