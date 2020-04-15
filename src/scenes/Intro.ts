import { leaderboard } from "../InitGame";
export default class Intro extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;
  private _bg: Phaser.GameObjects.TileSprite;
  private _introText: Phaser.GameObjects.BitmapText;

  private _delucaContainer: Phaser.GameObjects.Container;
  private _delucaHead: Phaser.GameObjects.Image;
  private _delucaArmLeft: Phaser.GameObjects.Image;
  private _delucaArmRight: Phaser.GameObjects.Image;
  private _delucaChest: Phaser.GameObjects.Image;
  private _delucaChestDown: Phaser.GameObjects.Image;

  private _music: Phaser.Sound.BaseSound;
  private _status: number;
  private _highscores: Array<any>;
  private _highscoresText: Array<Phaser.GameObjects.BitmapText>;
  private _highscoresColors: Array<number> = [
    0xff0000,
    0xffff00,
    0x00ff00,
    0x00bfff,
    0xff8200,
  ];
  constructor() {
    super({
      key: "Intro",
    });
  }

  create() {
    this._highscores = [];
    if (leaderboard != undefined)
      this._highscores = leaderboard.getHighscores();
    this._status = 0;

    this.add.tileSprite(0, 0, 1280, 800, "sky").setScale(4).setOrigin(0);

    this._bg = this.add
      .tileSprite(0, 0, 1280, 800, "bg")
      .setScale(4)
      .setOrigin(0);

    //console.log("create intro");
    this._highscoresText = [];
    this._highscoresText.push(
      this.add.bitmapText(580, 330, "arcade", "Top Cops").setAlpha(0)
    );

    if (this._highscores.length > 0) {
      for (let i = 0; i < 5; i++) {
        this._highscoresText.push(
          this.add
            .bitmapText(
              550,
              400 + i * 70,
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
    }

    this._logo = this.add.image(700, 30, "delucop").setOrigin(0.5).setAlpha(0);

    this._delucaChestDown = this.add
      .image(2, 0, "robo1-under-chest")
      .setOrigin(0, 1)
      .setAlpha(1);

    this._delucaArmLeft = this.add
      .image(45, -55, "robo1-left-arm")
      .setOrigin(0)
      .setAlpha(1);
    this._delucaHead = this.add
      .image(3, -47, "robo1-head")
      .setOrigin(0, 1)
      .setAlpha(1);

    this._delucaChest = this.add
      .image(-1, 0, "robo1-chest")
      .setOrigin(0, 1)
      .setAlpha(1);

    this._delucaArmRight = this.add
      .image(0, -103, "robo1-right-arm")
      .setOrigin(0)
      .setAlpha(1);

    this._delucaContainer = this.add
      .container(-200, 800, [
        this._delucaChestDown,
        this._delucaArmLeft,
        this._delucaHead,
        this._delucaChest,
        this._delucaArmRight,
      ])
      .setScale(5)
      .setAlpha(0);

    this.tweens.add({
      targets: this._delucaContainer,
      alpha: 1,
      x: 0,
      duration: 1000,
      delay: 500,
      onComplete: () => {
        this.sound.add("sanzioni", { volume: 1 }).play();
      },
      ease: "Sine.easeOut",
    });

    this.tweens.add({
      targets: [
        this._delucaArmRight,
        this._delucaArmLeft,
        this._delucaChestDown,
      ],
      y: "+=1.5",
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: [this._delucaArmLeft],
      rotation: "-=.02",
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: [this._delucaArmRight],
      rotation: "+=.015",
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: [this._delucaChest],
      delay: 200,
      y: "+=1",
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    this.tweens.add({
      targets: [this._delucaHead],
      delay: 150,
      y: "-=1",
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    this._introText = this.add
      .bitmapText(640, 400, "carrier", "Start Game")
      .setTint(0xff8200)
      .setOrigin(0.5)
      .setAlpha(0)
      .setFontSize(30);

    this.input.once("pointerdown", () => {
      this.sound.add("shot").play({ volume: 0.1 });
      this.cameras.main.flash(
        1000,
        255,
        255,
        255,
        true,
        (camera: any, progress: number) => {
          if (progress == 1) {
            this.scene.stop("Intro");
            this.scene.start("Game");
            this.scene.start("Hud");
            this.scene.bringToTop("Game");
            this.scene.bringToTop("Hud");
            this._music.stop();
          }
        }
      );
    });

    this._music = this.sound.add("intro");
    this._music.play(undefined, {
      loop: true,
      volume: 0.2,
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
      delay: 5000,
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
        //console.log("change status");
      },
      callbackScope: this,
      loop: true,
    });
  }

  introAnimStart() {
    this.tweens.add({
      targets: this._logo,
      y: 130,
      alpha: 1,
      duration: 500,
      ease: "Sine.easeOut",
    });

    this.tweens.add({
      targets: this._introText,
      alpha: 1,
      yoyo: true,
      repeat: -1,
    });

    this.startChange();
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
      },
    });
  }

  highscoresOut() {
    this.tweens.add({
      targets: this._highscoresText,
      duration: 500,
      alpha: 0,

      onComplete: () => {
        this.introAnimIn();
      },
    });
  }

  update(time: number, delta: number) {
    this._bg.tilePositionX += 0.05;
  }
}
