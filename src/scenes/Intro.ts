import { leaderboard } from "../InitGame";
export default class Intro extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;
  private _bg: Phaser.GameObjects.TileSprite;
  private _introText: Phaser.GameObjects.BitmapText;
  private _deluca: Phaser.GameObjects.Image;
  private _music: Phaser.Sound.BaseSound;
  private _status: number;
  private _highscores: Array<any>;
  private _highscoresText: Array<Phaser.GameObjects.BitmapText>;
  private _highscoresColors: Array<number> = [
    0xff0000,
    0xffff00,
    0x00ff00,
    0x00bfff,
    0xff8200
  ];
  constructor() {
    super({
      key: "Intro"
    });
  }

  create() {
    this._highscores = leaderboard.getHighscores();
    this._status = 0;

    this._bg = this.add
      .tileSprite(0, 0, 1280, 800, "bg")
      .setScale(4)
      .setOrigin(0);

    console.log("create intro");
    this._highscoresText = [];
    this._highscoresText.push(
      this.add.bitmapText(550, 250, "arcade", "Top Scorers").setAlpha(0)
    );
    for (let i = 0; i < 5; i++) {
      this._highscoresText.push(
        this.add
          .bitmapText(
            550,
            320 + i * 70,
            "arcade",
            i +
              1 +
              "ND " +
              this.fixScore(this._highscores[i].score) +
              "  " +
              this._highscores[i].name
          )
          .setTint(this._highscoresColors[i])
          .setOrigin(0)
          .setAlpha(0)
      );
    }

    this._logo = this.add
      .image(640, 0, "delucop")
      .setOrigin(0.5)
      .setAlpha(0);

    this._deluca = this.add
      .image(-200, 830, "deluca-robocop")
      .setOrigin(0, 1)
      .setScale(5)
      .setAlpha(0);

    this._introText = this.add
      .bitmapText(640, 400, "carrier", "Start Game")
      .setTint(0xff8200)
      .setOrigin(0.5)
      .setAlpha(0)
      .setFontSize(30);

    this.input.once("pointerdown", () => {
      this.scene.stop("Intro");
      this.scene.start("Game");
      this.scene.start("Hud");
      this.scene.bringToTop("Game");
      this.scene.bringToTop("Hud");
    });

    this._music = this.sound.add("intro");
    this._music.play(undefined, {
      loop: true,
      volume: 0.2
    });
    this.introAnimStart();
  }

  fixScore(score: number) {
    if ((score + "").length == 1) return score + "    ";
    if ((score + "").length == 2) return score + "   ";
    if ((score + "").length == 3) return score + "  ";
    if ((score + "").length == 4) return score + " ";
    if ((score + "").length == 5) return score + "";
    if ((score + "").length == 6) return score + "";
  }

  startChange() {
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        if (this._status == 2) this._status = 0;
        switch (this._status) {
          case 0:
            this.introAnimOut();
            this._status += 1;
            break;
          case 1:
            this.highscoresOut();
            this._status += 1;
            break;
        }
        console.log("change status");
      },
      callbackScope: this,
      loop: true
    });
  }

  introAnimStart() {
    this.tweens.add({
      targets: this._deluca,
      alpha: 1,
      x: -20,
      duration: 1000,
      delay: 500,
      ease: "Sine.easeOut"
    });

    this.tweens.add({
      targets: this._logo,
      y: 100,
      alpha: 1,
      duration: 500,
      ease: "Sine.easeOut"
    });

    this.startChange();

    this.tweens.add({
      targets: this._introText,
      alpha: 1,
      yoyo: true,
      repeat: -1,
      onComplete: () => {}
    });
  }

  introAnimIn() {
    this._introText.setY(400);
  }

  introAnimOut() {
    this.highscoresIn();

    this._introText.setY(-100);
  }

  highscoresIn() {
    this.tweens.add({
      targets: this._highscoresText,
      duration: 500,
      alpha: 1,

      delay: (
        target: any,
        targetKey: any,
        value: any,
        targetIndex: any,
        totalTargets: any,
        tween: any
      ) => {
        return targetIndex * 100;
      }
    });
  }

  highscoresOut() {
    this.tweens.add({
      targets: this._highscoresText,
      duration: 500,
      alpha: 0,

      onComplete: () => {
        this.introAnimIn();
      }
    });
  }

  update(time: number, delta: number) {
    this._bg.tilePositionX += 0.05;
  }
}
