export let GameData: any = {
  levels: [
    {
      level: "LEVEL 2",
      title: "Stop the graduates",
      type: 0,
      bg: { key: "bg1", scale: 3, scroll: 0.05, x: 0, y: -100, visible: false },
      sky: "sky1",
      map: "level4",
    },
    {
      level: "LEVEL 2",
      title: "Destoy all the asteroids!",
      type: 0,
      bg: { key: "bg0", scale: 4, scroll: 0, x: 0, y: 0 },
      sky: "sky0",
      map: "level0",
    },
    {
      level: "LEVEL 3",
      title: "Kill all virus vectors",
      type: 0,
      bg: { key: "bg0", scale: 4, scroll: 0, x: 0, y: 0 },
      sky: "sky0",
      map: "level0",
    },
    {
      level: "LEVEL 4",
      title: "Kill all virus vectors",
      type: 0,
      bg: { key: "bg0", scale: 4, scroll: 0, x: 0, y: 0 },
      sky: "sky0",
      map: "level0",
    },
    {
      level: "LEVEL 5",
      title: "Kill all virus vectors",
      type: 0,
      bg: { key: "bg0", scale: 4, scroll: 0, x: 0, y: 0 },
      sky: "sky0",
      map: "level0",
    },
  ],
  tilemaps: [
    {
      key: "level0",
      path: "assets/map/level0.json",
    },
    {
      key: "level1",
      path: "assets/map/level1.json",
    },
    {
      key: "level2",
      path: "assets/map/level2.json",
    },
    {
      key: "level3",
      path: "assets/map/level3.json",
    },
    {
      key: "level4",
      path: "assets/map/level4.json",
    },
  ],
  spritesheets: [
    {
      name: "tiles",
      path: "assets/map/tilemap.png",
      width: 32,
      height: 32,
      spacing: 0,
    },
    {
      name: "enemy-1",
      path: "assets/images/game/npg/sprite-1.png",
      width: 30,
      height: 44,
      frames: 16,
    },
    {
      name: "enemy-2",
      path: "assets/images/game/npg/sprite-2.png",
      width: 88,
      height: 200,
      frames: 12,
    },
    {
      name: "blood",
      path: "assets/images/game/explosions/blood.png",
      width: 126,
      height: 126,
      frames: 8,
    },
    {
      name: "explosion",
      path: "assets/images/game/explosions/explosion.png",
      width: 80,
      height: 80,
      frames: 28,
    },
    {
      name: "bodyparts",
      path: "assets/images/game/explosions/bodyparts.png",
      width: 26,
      height: 18,
      frames: 4,
    },
    {
      name: "bonus",
      path: "assets/images/game/bonus/bonus-ammo.png",
      width: 32,
      height: 32,
      frames: 6,
    },
    {
      name: "fireman",
      path: "assets/images/game/explosions/fireman.png",
      width: 45,
      height: 64,
      frames: 22,
    },
    {
      name: "arm",
      path: "assets/images/game/player/arm.png",
      width: 156,
      height: 64,
      frames: 3,
    },

    {
      name: "missile",
      path: "assets/images/game/missile.png",
      width: 30,
      height: 30,
      frames: 3,
    },
    {
      name: "robocop",
      path: "assets/images/game/player/robocop.png",
      width: 176,
      height: 400,
      frames: 10,
    },
  ],

  atlas: [
    {
      key: "explosionParticles",
      imagepath: "assets/images/game/explosions/explosionParticles.png",
      jsonpath: "assets/images/game/explosions/explosionParticles.json",
    },
  ],

  images: [
    {
      name: "player-head",
      path: "assets/images/game/player/head.png",
    },
    {
      name: "robo1-chest",
      path: "assets/images/game/menu/robo1-chest.png",
    },
    {
      name: "robo1-head",
      path: "assets/images/game/menu/robo1-head.png",
    },
    {
      name: "robo1-left-arm",
      path: "assets/images/game/menu/robo1-left-arm.png",
    },
    {
      name: "robo1-right-arm",
      path: "assets/images/game/menu/robo1-right-arm.png",
    },
    {
      name: "robo1-under-chest",
      path: "assets/images/game/menu/robo1-under-chest.png",
    },

    {
      name: "bg1",
      path: "assets/images/game/bg/bg1.png",
    },
    {
      name: "rub",
      path: "assets/images/game/gameover/rub.png",
    },
    {
      name: "end",
      path: "assets/images/game/gameover/end.png",
    },
    {
      name: "block",
      path: "assets/images/game/gameover/block.png",
    },
    {
      name: "bg",
      path: "assets/images/game/menu/bg.png",
    },
    {
      name: "sky",
      path: "assets/images/game/menu/sky.png",
    },
    {
      name: "empty",
      path: "assets/images/game/empty.png",
    },
    {
      name: "empty60",
      path: "assets/images/game/empty60.png",
    },

    {
      name: "delucop",
      path: "assets/images/game/menu/delucop.png",
    },

    {
      name: "deluca-robocop",
      path: "assets/images/game/menu/deluca-robocop.png",
    },
    {
      name: "fire",
      path: "assets/images/game/fire.png",
    },
    {
      name: "energyHud",
      path: "assets/images/game/energy/energy-layer1.png",
    },
    {
      name: "energyBar",
      path: "assets/images/game/energy/energy-layer2.png",
    },
    {
      name: "energyMask",
      path: "assets/images/game/energy/energy-layer-mask.png",
    },
    {
      name: "bg0",
      path: "assets/images/game/bg/bg0.png",
    },
    {
      name: "bg1",
      path: "assets/images/game/bg/bg1.png",
    },
    {
      name: "sky0",
      path: "assets/images/game/bg/sky0.png",
    },
    {
      name: "sky1",
      path: "assets/images/game/bg/sky1.png",
    },
  ],

  sounds: [
    {
      name: "intro",
      paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
      volume: 1,
      loop: false,
    },
    {
      name: "explosion",
      paths: ["assets/sounds/explosion.ogg", "assets/sounds/explosion.m4a"],
      volume: 1,
      loop: false,
    },
    {
      name: "game",
      paths: ["assets/sounds/game.ogg", "assets/sounds/game.m4a"],
      volume: 1,
      loop: false,
    },

    {
      name: "shot",
      paths: ["assets/sounds/shot.ogg", "assets/sounds/shot.m4a"],
      volume: 1,
      loop: false,
    },

    {
      name: "fire",
      paths: ["assets/sounds/fire.ogg", "assets/sounds/fire.m4a"],
      volume: 1,
      loop: false,
    },

    {
      name: "shot2",
      paths: ["assets/sounds/shot2.ogg", "assets/sounds/shot2.m4a"],
      volume: 1,
      loop: false,
    },
    {
      name: "charge",
      paths: ["assets/sounds/charge.ogg", "assets/sounds/charge.m4a"],
      volume: 1,
      loop: false,
    },

    {
      name: "walk1",
      paths: ["assets/sounds/walk1.ogg", "assets/sounds/walk1.m4a"],
      volume: 1,
      loop: false,
    },
    {
      name: "walk2",
      paths: ["assets/sounds/walk2.ogg", "assets/sounds/walk2.m4a"],
      volume: 1,
      loop: false,
    },
    {
      name: "endlevel",
      paths: ["assets/sounds/endlevel.ogg", "assets/sounds/endlevel.m4a"],
      volume: 1,
      loop: false,
    },
    {
      name: "neutralizzati",
      paths: [
        "assets/sounds/neutralizzati.ogg",
        "assets/sounds/neutralizzati.m4a",
      ],
      volume: 1,
      loop: false,
    },
    {
      name: "sanzioni",
      paths: [
        "assets/sounds/passibile-sanzioni.ogg",
        "assets/sounds/possibile-sanzioni.m4a",
      ],
      volume: 1,
      loop: false,
    },
  ],

  audio: [
    /*{
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.mp3"],
      instances: 4
    }*/
  ],

  script: [
    {
      key: "webfont",
      path: "assets/js/webfonts.js",
    },
  ],

  bitmapfont: [
    {
      name: "carrier",
      imgpath: "assets/fonts/carrier_command.png",
      xmlpath: "assets/fonts/carrier_command.xml",
    },
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml",
    },
  ],
};
