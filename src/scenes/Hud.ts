import Game from "../scenes/Game";
import { GameData } from "../GameData";

export default class HUD extends Phaser.Scene {
  private _isPaused: boolean = false;
  private _levels: Array<level>;
  private _currentLevel: level;
  private _currentLevelIndex: number;
  private _gamePlay: Game;
  private _music: Phaser.Sound.BaseSound;
  private _levelCompleted: boolean;
  private _levelStarted: boolean;
  private _scoreText: Phaser.GameObjects.BitmapText;
  private _scoreValue: number;

  private _hits: number;
  private _rocketSelector: number;
  private _updateScore: Phaser.Events.EventEmitter;
  private _levelComplete: Phaser.Events.EventEmitter;
  private _addGranade: Phaser.Events.EventEmitter;
  private _addFlame: Phaser.Events.EventEmitter;
  private _addEnergy: Phaser.Events.EventEmitter;

  private _wave: Phaser.GameObjects.Text;
  private _waveTitle: Phaser.GameObjects.Text;

  private _completedText: Phaser.GameObjects.BitmapText;
  private _completedSummary: Phaser.GameObjects.BitmapText;

  private _cursor: Phaser.GameObjects.Image;
  private _launchers: Array<boolean>;

  private _continue: Phaser.GameObjects.BitmapText;
  private _retry: Phaser.GameObjects.BitmapText;

  private _energy: number;
  private _energyhud: Phaser.GameObjects.Image;
  private _energybar: Phaser.GameObjects.Image;
  private _energybarmask: Phaser.GameObjects.Image;

  private _levelCompleteContainer: Phaser.GameObjects.Container;
  private _levelPauseContainer: Phaser.GameObjects.Container;

  private _granadeQuantity: number;
  private _granadeQuantityText: Phaser.GameObjects.Text;
  private _flameQuantity: number;
  private _flameQuantityText: Phaser.GameObjects.Text;
  private _flametimer: Phaser.Time.TimerEvent;

  private _levelStatus: levelStatus;
  private _levelStatusStore: levelStatus;

  constructor() {
    super({
      key: "Hud",
    });

    this._levels = GameData.levels;
  }

  create(): void {
    //console.log("create hud");

    this._levelStatus = {
      score: 0,
      energy: 100,
      granade: 10,
      fire: 100,
    };

    this._flametimer = this.time.addEvent({
      delay: 200,
      callback: () => {
        this._flameQuantity -= 1;
        this._flameQuantityText.setText(this._flameQuantity + "");
        if (this._flameQuantity == 0) {
          this.setRocket(0);
          this._flametimer.paused = true;
        }
      },
      loop: true,
    });
    this._flametimer.paused = true;

    this._granadeQuantity = 10;
    this._flameQuantity = 100;

    this._music = this.sound.add("game");

    this.input.mouse.disableContextMenu();
    this._energy = 100;
    this._levelCompleteContainer = this.add.container(0, 0).setDepth(100000);
    this._levelPauseContainer = this.add.container(0, 0).setDepth(100001);
    this._launchers = [true, true, true];

    this._energyhud = this.add.image(20, 42, "energyHud").setOrigin(0, 0.5);
    this._energybar = this.add.sprite(208, 44, "energyBar").setOrigin(0, 0.5);
    this._energybarmask = this.add
      .sprite(208, 44, "energyMask")
      .setOrigin(0, 0.5);
    this._energybarmask.visible = false;
    this._energybar.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this._energybarmask
    );

    let _rocket1: Phaser.GameObjects.Image = this.add
      .sprite(1040, 45, "missile")
      .setFrame(0)
      .setOrigin(0.5)
      .setScale(2)
      .setInteractive();
    _rocket1.on(
      "pointerdown",
      (
        pointer: Phaser.Input.Pointer,
        localX: number,
        localY: number,
        e: Phaser.Types.Input.EventData
      ) => {
        this.setRocket(0);
        e.stopPropagation();
      }
    );

    let _rocket2: Phaser.GameObjects.Image = this.add
      .sprite(1120, 45, "missile")
      .setFrame(2)
      .setOrigin(0.5)
      .setScale(2)
      .setInteractive();
    _rocket2.on(
      "pointerdown",
      (
        pointer: Phaser.Input.Pointer,
        localX: number,
        localY: number,
        e: Phaser.Types.Input.EventData
      ) => {
        this.setRocket(1);
        e.stopPropagation();
      }
    );

    let _rocket3: Phaser.GameObjects.Image = this.add
      .sprite(1200, 45, "missile")
      .setFrame(1)
      .setOrigin(0.5)
      .setScale(2)
      .setInteractive();
    _rocket3.on(
      "pointerdown",
      (
        pointer: Phaser.Input.Pointer,
        localX: number,
        localY: number,
        e: Phaser.Types.Input.EventData
      ) => {
        this.setRocket(2);
        e.stopPropagation();
      }
    );

    this._cursor = this.add.image(1040, 45, "block").setOrigin(0.5).setScale(2);

    this.tweens.add({
      targets: this._cursor,
      alpha: 0.2,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 350,
    });

    this._gamePlay = <Game>this.scene.get("Game");
    this._currentLevelIndex = 0;
    this._scoreText = this.add
      .bitmapText(40, 35, "arcade", "0")
      .setFontSize(20);
    this._scoreValue = 0;
    this._hits = 0;
    this._rocketSelector = 0;
    this._levelStarted = false;
    this._levelCompleted = false;

    this._gamePlay.events.off("updateScore", this.updateScore, this);
    this._updateScore = this._gamePlay.events.on(
      "updateScore",
      this.updateScore,
      this
    );

    this._gamePlay.events.off("levelCompleted", this.levelCompleted, this);
    this._updateScore = this._gamePlay.events.on(
      "levelCompleted",
      this.levelCompleted,
      this
    );

    this._gamePlay.events.off("addGranade", this.addGranade, this);
    this._addGranade = this._gamePlay.events.on(
      "addGranade",
      this.addGranade,
      this
    );

    this._gamePlay.events.off("addFlame", this.addFlame, this);
    this._addFlame = this._gamePlay.events.on("addFlame", this.addFlame, this);

    this._gamePlay.events.off("addEnergy", this.addEnergy, this);
    this._addEnergy = this._gamePlay.events.on(
      "addEnergy",
      this.addEnergy,
      this
    );

    this.scale.on("orientationchange", (orientation: any) => {
      if (orientation === Phaser.Scale.PORTRAIT) {
        this.pauseGame();
      } else if (orientation === Phaser.Scale.LANDSCAPE) {
        this.resumeGame();
      }
    });

    this.input.keyboard.on("keydown-A", (event: Event) => {
      this.setRocket(0);
    });
    this.input.keyboard.on("keydown-S", (event: Event) => {
      this.setRocket(1);
    });
    this.input.keyboard.on("keydown-D", (event: Event) => {
      this.setRocket(2);
    });

    this.input.keyboard.on("keydown-F", (event: Event) => {
      this.subEnergy([10]);
    });

    this.input.keyboard.on("keydown-O", (event: Event) => {
      this.game.renderer.snapshot((image: any) => {
        let mimeType = "image/png";
        var imgURL = image.src;
        var dlLink = document.createElement("a");
        dlLink.download = "snapshot";
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [
          mimeType,
          dlLink.download,
          dlLink.href,
        ].join(":");
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
      });
    });

    this.input.keyboard.on("keydown-P", (event: Event) => {
      if (this._isPaused) {
        this.resumeGame();
      } else {
        this.pauseGame();
      }
    });

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this._levelStarted && !this._levelCompleted && !this._isPaused) {
        switch (this._rocketSelector) {
          case 0:
            if (this.isLaucherReady(0)) {
              this.disableLauncher(0);
              this._flametimer.paused = true;
              this._gamePlay.launchMissile(pointer);
            }
            break;

          case 1:
            if (this.isLaucherReady(1) && this._granadeQuantity > 0) {
              this._granadeQuantity -= 1;
              this._flametimer.paused = true;
              this._granadeQuantityText.setText(this._granadeQuantity + "");
              this.disableLauncher(1);
              this._gamePlay.launchPerforant(pointer);
              if (this._granadeQuantity == 0) {
                this.setRocket(0);
              }
            }
            break;

          case 2:
            if (this._flameQuantity > 0) {
              //this.disableLauncher(2);

              if (this._gamePlay._player.isFlameThrowerActive()) {
                this._gamePlay.flameTowerStatus(false);
                this._flametimer.paused = true;
              } else {
                this._gamePlay.flameTowerStatus(true);
                this._flametimer.paused = false;
              }
              //this._gamePlay.flameThrower();
              // this._flametimer.paused = false;
            } else {
              this.setRocket(0);
            }
            break;
        }
      }
    });

    this._flameQuantityText = this.add
      .text(1200, 64, "100", {})
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setStroke("#000000", 5)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(20);

    this._granadeQuantityText = this.add
      .text(1120, 64, "10", {})
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setStroke("#000000", 5)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(20);

    this._wave = this.add
      .text(640, 200, "", {})
      .setTint(0xff8200)
      .setOrigin(0.5)
      .setAlpha(0)
      .setStroke("#000000", 10)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(60);

    this._waveTitle = this.add
      .text(640, 270, "")
      .setTint(0x00ff00)
      .setOrigin(0.5)
      .setAlpha(0)
      .setStroke("#000000", 6)
      .setFontFamily('"Press Start 2P"')
      .setFontSize(46);

    this._completedText = this.add
      .bitmapText(640, 400, "arcade", "LEVEL COMPLETED")
      .setTint(0x00ff00)
      .setOrigin(0.5)
      .setAlpha(1)
      .setFontSize(60);

    this._completedSummary = this.add
      .bitmapText(640, 400, "carrier", "")
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setAlpha(1)
      .setFontSize(30);

    this._continue = this.add
      .bitmapText(440, 600, "carrier", "Continue")
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setAlpha(1)
      .setFontSize(30)
      .setInteractive()
      .on("pointerover", () => {
        this._continue.setTint(0x00ff00);
        this.sound.add("charge").play({ volume: 1 });
      })
      .on("pointerout", () => {
        this._continue.setTint(0xffffff);
      })
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          this._currentLevelIndex += 1;
          //console.log("continue", this._currentLevelIndex);

          this.nextLevel(this._currentLevelIndex);
          e.stopPropagation();
        }
      );

    this._retry = this.add
      .bitmapText(840, 600, "carrier", "Retry")
      .setTint(0xffffff)
      .setOrigin(0.5)
      .setAlpha(1)
      .setFontSize(30)
      .setInteractive()
      .on("pointerover", () => {
        this._retry.setTint(0xff8200);
        this.sound.add("charge").play({ volume: 1 });
      })
      .on("pointerout", () => {
        this._retry.setTint(0xffffff);
      })
      .on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          localX: number,
          localY: number,
          e: Phaser.Types.Input.EventData
        ) => {
          //console.log("retry", this._currentLevelIndex);
          this.setLevelValues(this._levelStatusStore);
          this.nextLevel(this._currentLevelIndex);
          e.stopPropagation();
        }
      );

    this._levelCompleteContainer
      .add([
        this.add.image(0, 0, "black-screen").setAlpha(0.7).setOrigin(0),
        this._completedText,
        this._completedSummary,
        this._retry,
        this._continue,
      ])
      .setAlpha(0);

    this._levelPauseContainer
      .add([
        this.add.image(0, 0, "black-screen").setAlpha(0.7).setOrigin(0),
        this.add
          .bitmapText(640, 400, "carrier", "PAUSED")
          .setTint(0xffffff)
          .setOrigin(0.5)
          .setAlpha(1)
          .setFontSize(30),
      ])
      .setAlpha(0);

    this.setUpLevel(0);
  }

  addGranade(params: any) {
    this.setGranade(this._granadeQuantity + params[0]);
  }
  addFlame(params: any) {
    this.setFlame(this._flameQuantity + params[0]);
  }

  addEnergy(params: any) {
    if (this._energy == 100) return;
    this._energy = this._energy + params[0];
    if (this._energy > 100) this._energy = 100;
    this.setEnergyBar(this._energy);
  }

  subEnergy(params: any) {
    this._energy = this._energy - params[0];
    if (this._energy < 0) this._energy = 0;
    this.setEnergyBar(this._energy);
  }

  setEnergy(value: number) {
    this._energy = value;
    this.setEnergyBar(this._energy);
  }

  private setEnergyBar(value: number): void {
    let _val = 208 - (100 - value) * 7;
    this.tweens.add({
      targets: this._energybarmask,
      x: _val,
      duration: 100,
      onComplete: () => {
        if (value <= 0) this.gameOverSequence();
      },
    });
  }

  setGranade(value: number) {
    this._granadeQuantity = value;
    this._granadeQuantityText.setText(value + "");
  }

  setFlame(value: number) {
    this._flameQuantity = value;
    this._flameQuantityText.setText(value + "");
  }

  setScore(value: number) {
    this._scoreValue = value;
    this._scoreText.setText(value + "");
  }

  setLevelValues(_values: levelStatus) {
    let _levelStatus = JSON.parse(JSON.stringify(_values));
    this.setFlame(_levelStatus.fire);
    this.setGranade(_levelStatus.granade);
    this.setScore(_levelStatus.score);
    this.setEnergy(_levelStatus.energy);
  }

  disableLauncher(index: number): void {
    this._launchers[index] = false;
    let _delay: number = 200;
    switch (index) {
      case 1:
        _delay = 500;
        break;
      case 2:
        _delay = 1000;
        break;
    }

    this.time.addEvent({
      delay: _delay,
      callback: () => {
        this.enableLauncher(index);
      },
      callbackScope: this,
    });
  }
  enableLauncher(index: number): void {
    this._launchers[index] = true;
  }
  isLaucherReady(index: number): boolean {
    return this._launchers[index];
  }

  setRocket(index: number): void {
    if (index == this._rocketSelector || this._isPaused) return;

    if (this._levelStarted && !this._levelCompleted) {
      switch (index) {
        case 0:
          this._rocketSelector = 0;
          this._gamePlay.getArm().setFrame(0);
          this._cursor.setX(1040);
          this._gamePlay.flameTowerStatus(false);
          this._flametimer.paused = true;
          break;

        case 1:
          if (this._granadeQuantity == 0) {
            this.setRocket(0);
            return;
          }
          this._rocketSelector = 1;
          this._gamePlay.getArm().setFrame(1);
          this._cursor.setX(1120);
          this._gamePlay.flameTowerStatus(false);
          this._flametimer.paused = true;
          break;

        case 2:
          if (this._flameQuantity == 0) {
            this.setRocket(0);
            return;
          }
          this._rocketSelector = 2;
          this._gamePlay.getArm().setFrame(2);
          this._cursor.setX(1200);

          /* this._gamePlay.flameTowerStatus(true);
          this._flametimer.paused = false;
          */
          break;
      }
      this.sound.add("charge").play({ volume: 1 });
    }
  }

  update(time: number, delta: number) {
    if (this._levelStarted && !this._levelCompleted) {
      if (
        this._gamePlay.cameras.main.scrollX + 600 >
        this._gamePlay.cameras.main.getBounds().width - 700
      ) {
        this.levelCompleted();
      }
    }
  }

  private setUpLevel(_level: number) {
    this._levelStatus = {
      score: this._scoreValue,
      energy: this._energy,
      granade: this._granadeQuantity,
      fire: this._flameQuantity,
    };
    this._levelStatusStore = JSON.parse(JSON.stringify(this._levelStatus));
    this._currentLevel = this._levels[_level];
    this._gamePlay.setupLevel(this._currentLevel);
    this._levelCompleted = false;
    this._levelStarted = false;
    this._hits = 0;
    this._wave.setText(this._currentLevel.level);
    this._waveTitle.setText(this._currentLevel.title);

    this._music.stop();
    this._music = this.sound.add("game");
    this._music.play(undefined, {
      loop: true,
      volume: 0.1,
    });

    this._gamePlay.tweens.add({
      targets: this._wave,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this._gamePlay.tweens.add({
          targets: this._waveTitle,
          alpha: 1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            this._gamePlay.tweens.add({
              targets: this._wave,
              alpha: 0,
              duration: 500,
              completeDelay: 1000,
              onComplete: () => {
                //console.log("start level");
                this._levelStarted = true;
                this._gamePlay.startGame();
              },
            });
          },
        });
      },
    });
  }

  levelCompleted() {
    console.log("levelCompleted", this._currentLevelIndex);

    this._gamePlay.stopWalk();
    this._gamePlay.setArmMove(false);
    this.setRocket(0);
    this._levelCompleted = true;
    this._levelStarted = false;

    this._music.stop();
    this._music = this.sound.add("endlevel");
    this._music.play(undefined, {
      loop: false,
      volume: 0.1,
    });
    this.sound.add("neutralizzati", { volume: 1 }).play();
    this._completedText.setAlpha(0);
    /*this._completedSummary
      .setText(
        "text: " +
          "\n\nEnemy hits: " +
          this._hits +
          "\n\nHits ratio: " +
          (100 * this._hits).toFixed(1) +
          "%"
      )
      .setAlpha(0);*/
    this._levelCompleteContainer.setAlpha(1);

    this._gamePlay.tweens.add({
      targets: this._completedText,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this._gamePlay.tweens.add({
          targets: this._completedSummary,
          alpha: 1,
          completeDelay: 3000,
          onComplete: () => {},
        });
      },
    });
  }

  nextLevel(_level: number) {
    //console.log("next level", _level);
    this.setUpLevel(_level);
    this._gamePlay.tweens.add({
      targets: [this._levelCompleteContainer],
      alpha: 0,
      duration: 500,
      onComplete: () => {},
    });
  }

  private pauseGame() {
    this._levelPauseContainer.setAlpha(1);
    // this._gamePlay.pause();
    this._music.pause();
    this.game.scene.pause("Game");
    this._isPaused = true;
  }
  private resumeGame() {
    this._levelPauseContainer.setAlpha(0);
    this.game.scene.resume("Game");
    this._music.resume();
    // this._gamePlay.resume();
    this._isPaused = false;
  }

  private updateScore(parameters: Array<any>): void {
    //console.log("updateScore");
    this._hits += 1;
    this._scoreValue += parameters[0];
    this._scoreText.setText(this._scoreValue + "");
    this.registry.set("score", this._scoreValue);
  }

  gameOverSequence() {
    console.log("game over");
    this.gameOver();
  }

  gameOver() {
    this._music.stop();
    this.scene.stop("Hud");
    this.scene.stop("Game");
    this.scene.start("GameOver");
    this.scene.start("ScoreInput");
    this.scene.bringToTop("GameOver");
    this.scene.bringToTop("ScoreInput");
  }
}
