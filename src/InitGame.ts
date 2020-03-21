import "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import Game from "./scenes/Game";
import Hud from "./scenes/Hud";
import GameOver from "./scenes/GameOver";
import ScoreInput from "./scenes/ScoreInput";
import Leaderboard from "./Leaderboard";
export let leaderboard: Leaderboard;

window.addEventListener("load", () => {
  leaderboard = new Leaderboard();

  const config: any = {
    type: Phaser.WEBGL,
    backgroundColor: "#000000",
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: 1280,
      height: 800
    },
    scene: [Boot, Preloader, Intro, Game, Hud, GameOver, ScoreInput],
    render: { pixelArt: true, antialias: false },
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  };

  const game = new Phaser.Game(config);

  /*
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/"
      })
      .then(
        function(registration) {
          //console.log("ServiceWorker registration successful with scope: ",registration.scope);
        },
        function(err) {
          //console.log("ServiceWorker registration failed: ", err);
        }
      );

  
  }
  */
});
