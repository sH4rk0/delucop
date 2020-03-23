export let GameData: any = {
  levels: [
    {
      level: "GET READY!",
      title: "Kill all virus vectors",
      type: 0,
      asteroids: {
        quantity: 100,
        speed: { min: 70, max: 60 },
        spawn: { min: 3000, max: 4000 }
      }
    },
    {
      level: "SWARM 2",
      title: "Destoy all the asteroids!",
      type: 0,
      asteroids: {
        quantity: 5,
        speed: { min: 70, max: 80 },
        spawn: { min: 1000, max: 2000 }
      }
    },
    {
      level: "SWARM 3",
      title: "Destoy all the asteroids!",
      type: 0,
      asteroids: {
        quantity: 7,
        speed: { min: 80, max: 90 },
        spawn: { min: 1000, max: 2000 }
      }
    },

    {
      level: "SWARM 4",
      title: "Destoy all the asteroids!",
      type: 0,
      asteroids: {
        quantity: 7,
        speed: { min: 80, max: 90 },
        spawn: { min: 1000, max: 2000 }
      }
    }
  ],
  tilemaps: [
    {
      key: "level0",
      path: "assets/map/level0.json"
    }
  ],
  spritesheets: [
    {
      name: "tiles",
      path: "assets/map/tilemap.png",
      width: 32,
      height: 32,
      spacing: 0
    },
    {
      name: "arm",
      path: "assets/images/game/player/arm.png",
      width: 156,
      height: 64,
      frames: 3
    },
    {
      name: "shockwave",
      path: "assets/images/game/shockwave.png",
      width: 192,
      height: 192,
      frames: 25
    },
    {
      name: "missile",
      path: "assets/images/game/missile.png",
      width: 30,
      height: 30,
      frames: 3
    },
    {
      name: "robocop",
      path: "assets/images/game/player/robocop.png",
      width: 176,
      height: 400,
      frames: 10
    }
  ],

  atlas: [],

  images: [
    {
      name: "bg1",
      path: "assets/images/game/bg/bg1.png"
    },
    {
      name: "level0",
      path: "assets/images/game/bg/level0.png"
    },
    {
      name: "rub",
      path: "assets/images/game/gameover/rub.png"
    },
    {
      name: "end",
      path: "assets/images/game/gameover/end.png"
    },
    {
      name: "block",
      path: "assets/images/game/gameover/block.png"
    },
    {
      name: "bg",
      path: "assets/images/game/menu/bg.png"
    },
    {
      name: "sky",
      path: "assets/images/game/menu/sky.png"
    },
    {
      name: "empty",
      path: "assets/images/game/empty.png"
    },

    {
      name: "delucop",
      path: "assets/images/game/menu/delucop.png"
    },

    {
      name: "deluca-robocop",
      path: "assets/images/game/menu/deluca-robocop.png"
    },
    {
      name: "fire",
      path: "assets/images/game/fire.png"
    }
  ],

  sounds: [
    {
      name: "intro",
      paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "game",
      paths: ["assets/sounds/game.ogg", "assets/sounds/game.m4a"],
      volume: 1,
      loop: false
    },

    {
      name: "shot",
      paths: ["assets/sounds/shot.ogg", "assets/sounds/shot.m4a"],
      volume: 1,
      loop: false
    },

    {
      name: "fire",
      paths: ["assets/sounds/fire.ogg", "assets/sounds/fire.m4a"],
      volume: 1,
      loop: false
    },

    {
      name: "shot2",
      paths: ["assets/sounds/shot2.ogg", "assets/sounds/shot2.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "charge",
      paths: ["assets/sounds/charge.ogg", "assets/sounds/charge.m4a"],
      volume: 1,
      loop: false
    },

    {
      name: "walk1",
      paths: ["assets/sounds/walk1.ogg", "assets/sounds/walk1.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "walk2",
      paths: ["assets/sounds/walk2.ogg", "assets/sounds/walk2.m4a"],
      volume: 1,
      loop: false
    }
    /*
    {
      name: "launch",
      paths: ["assets/sounds/launch.ogg", "assets/sounds/launch.m4a"],
      volume: 1,
      loop: false
    },
    {
      name: "seismic",
      paths: ["assets/sounds/seismic.ogg", "assets/sounds/seismic.m4a"],
      volume: 1,
      loop: false
    }*/
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
      path: "assets/js/webfonts.js"
    }
  ],

  bitmapfont: [
    {
      name: "carrier",
      imgpath: "assets/fonts/carrier_command.png",
      xmlpath: "assets/fonts/carrier_command.xml"
    },
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml"
    }
  ]
};
