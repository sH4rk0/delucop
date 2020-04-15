/**
 * @author       Francesco Raimondo <francesco.raimondo@gmail.com>
 * @copyright    2020 zero89
 * @description  delucop
 * @license      zero89
 */

import { GameData } from "../GameData";

export default class Preloader extends Phaser.Scene {
  body: HTMLElement;
  loading: Phaser.GameObjects.Text;
  text: Phaser.GameObjects.Text;
  progress: Phaser.GameObjects.Graphics;
  _bg: Phaser.GameObjects.TileSprite;

  constructor() {
    super({
      key: "Preloader",
    });
  }

  preload() {
    this.progress = this.add.graphics();
    this.loadAssets();
  }

  init() {
    const _config = {
      font: "35px",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
      wordWrap: true,
      wordWrapWidth: 1000,
    };

    this.loading = this.add
      .text(this.game.canvas.width / 2, 720, "", _config)
      .setStroke("#000000", 10)
      .setAlpha(1)
      .setOrigin(0)
      .setFontFamily('"Press Start 2P"')
      .setDepth(1001)
      .setOrigin(0.5);
  }

  loadAssets(): void {
    this.load.on("start", () => {});
    this.load.on("fileprogress", (file: any, value: any) => {});

    this.load.on("progress", (value: any) => {
      this.progress.clear();
      this.progress.fillStyle(0xffffff, 1);
      this.progress.fillRect(0, 700, 1280 * value, 40);

      this.loading.setText("Loading..." + Math.round(value * 100) + "%");
    });

    this.load.on("complete", () => {
      this.tweens.add({
        targets: [this.text],
        alpha: 1,
        x: 20,
        duration: 250,
        ease: "Sine.easeOut",
        delay: 200,
      });
      this.loading.setText("Tap/click to start");
      this.progress.clear();

      this.input.once("pointerdown", () => {
        this.registry.set("score", 0);
        this.scene.start("Intro");
        //this.scene.start("ScoreInput");
        //this.scene.start("GameOver");
      });
    });

    //Assets Load
    //--------------------------

    //SCRIPT
    GameData.script.forEach((element: ScriptAsset) => {
      this.load.script(element.key, element.path);
      //@ts-ignore
    });

    // IMAGES
    GameData.images.forEach((element: ImageAsset) => {
      this.load.image(element.name, element.path);
    });

    // TILEMAPS
    GameData.tilemaps.forEach((element: TileMapsAsset) => {
      this.load.tilemapTiledJSON(element.key, element.path);
    });

    // ATLAS
    GameData.atlas.forEach((element: AtlasAsset) => {
      this.load.atlas(element.key, element.imagepath, element.jsonpath);
    });

    // SPRITESHEETS
    GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
      this.load.spritesheet(element.name, element.path, {
        frameWidth: element.width,
        frameHeight: element.height,
        endFrame: element.frames,
      });
    });

    //bitmap fonts
    GameData.bitmapfont.forEach((element: BitmapfontAsset) => {
      this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
    });

    // SOUNDS
    GameData.sounds.forEach((element: SoundAsset) => {
      this.load.audio(element.name, element.paths);
    });

    // Audio
    GameData.audio.forEach((element: AudioSpriteAsset) => {
      this.load.audioSprite(
        element.name,
        element.jsonpath,
        element.paths,
        element.instance
      );
    });
  }
}
