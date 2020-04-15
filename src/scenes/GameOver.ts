import { leaderboard } from "../InitGame";

export default class GameOver extends Phaser.Scene {
  _playerText: Phaser.GameObjects.BitmapText;
  _bg: Phaser.GameObjects.Image;
  _scanlines: Phaser.GameObjects.TileSprite;
  constructor() {
    super({
      key: "GameOver",
    });
  }

  create() {
    console.log("create gameover");

    this.add
      .bitmapText(360, 460, "arcade", "SCORE   YOURNAME")
      .setTint(0xff00ff);
    this.add
      .bitmapText(360, 510, "arcade", this.registry.get("score"))
      .setTint(0xff0000);

    this._playerText = this.add
      .bitmapText(615, 510, "arcade", "")
      .setTint(0xff0000)
      .setText("");

    //  Do this, otherwise this Scene will steal all keyboard input
    this.input.keyboard.enabled = false;

    this.scene.launch("InputPanel");

    let panel = this.scene.get("ScoreInput");

    panel.events.off("updateName", this.updateName, this);
    panel.events.off("submitName", this.submitName, this);
    //  Listen to events from the Input Panel scene
    panel.events.on("updateName", this.updateName, this);
    panel.events.on("submitName", this.submitName, this);
    this._bg = this.add.image(0, 0, "intro-bg").setOrigin(0);
  }

  startGame(): void {
    this.scene.start("Intro");
  }

  updateName(name: string) {
    console.log("updatename", name);
    this._playerText.setText(name);
  }
  submitName(name: string) {
    console.log("submitName", name);
    this.scene.stop("ScoreInput");

    leaderboard.insertScore({
      score: this.registry.get("score"),
      name: name,
      level: 0,
    });
    this.registry.set("score", 0);

    this.scene.stop("GameOver");
    this.scene.stop("ScoreInput");
    this.scene.start("Intro");
    this.scene.bringToTop("Intro");

    //this.scene.transition({ target: "Intro", duration: 0 });
    /*
    this.add.bitmapText(100, 360, 'arcade', '2ND   40000    ANT').setTint(0xff8200);
    this.add.bitmapText(100, 410, 'arcade', '3RD   30000    .-.').setTint(0xffff00);
    this.add.bitmapText(100, 460, 'arcade', '4TH   20000    BOB').setTint(0x00ff00);
    this.add.bitmapText(100, 510, 'arcade', '5TH   10000    ZIK').setTint(0x00bfff);
    */
  }
}
