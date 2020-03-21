interface AsteroidConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  options: AsteroidConfigOptions;
}

interface AsteroidConfigOptions {
  speed: number;
}

interface level {
  level: string;
  title: string;
  type: number;
  time?: number;
  asteroids?: {
    quantity: number;
    spawn?: { min: number; max: number };
    speed?: { min: number; max: number };
  };
}

interface ScoreConfig {
  name: string;
  score: number;
  date?: number;
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

interface EarthConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  options?: any;
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
