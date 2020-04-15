interface enemyGenericConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  frame: null;
  name: string;
  offsetX: number;
  offsetY: number;
  score: number;
}

interface level {
  level: string;
  title: string;
  type: number;
  bg: {
    key: string;
    scale: number;
    scroll: number;
    x: number;
    y: number;
    visible: boolean;
  };
  sky: string;
  map: string;
}

interface ScoreConfig {
  name: string;
  score: number;
  level: number;
  date?: number;
}

interface ActionConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  action: any;
}

interface BonusConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  bonus: any;
}

interface levelStatus {
  score: number;
  energy: number;
  granade: number;
  fire: number;
}

interface MissileSimpleConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  options: { angle: number; speed: number; pointer: Phaser.Input.Pointer };
}

interface MissileShockwaveConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  options: { angle: number; distance: number; pointer: Phaser.Input.Pointer };
}

interface ExplosionConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  options: any;
}

interface ShockwaveConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  options: any;
}

interface genericConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
}

interface ImageAsset {
  name: string;
  path: string;
}

interface ScriptAsset {
  key: string;
  path: string;
}

interface TileMapsAsset {
  key: string;
  path: string;
}

interface SpritesheetsAsset {
  name: string;
  path: string;
  width: number;
  height: number;
  frames: number;
  spacing?: number;
}

interface SoundAsset {
  name: string;
  paths: Array<string>;
}

interface AudioSpriteAsset {
  name: string;
  jsonpath: string;
  paths: Array<string>;
  instance: { instance: number };
}

interface BitmapfontAsset {
  name: string;
  imgpath: string;
  xmlpath: string;
}

interface AtlasAsset {
  key: string;
  imagepath: string;
  jsonpath: string;
}
