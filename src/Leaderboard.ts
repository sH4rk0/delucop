import * as firebase from "firebase";

export default class Leaderboard {
  private firebaseConfig = {
    apiKey: "AIzaSyCfwdGOZk5wOkLtkHz-nTF0FKjsYC_Q-lo",
    authDomain: "delucop.firebaseapp.com",
    databaseURL: "https://delucop.firebaseio.com",
    projectId: "delucop",
    storageBucket: "delucop.appspot.com",
    messagingSenderId: "946828017766",
    appId: "1:946828017766:web:7207d795728d4690f0eda7",
    measurementId: "G-0YSEBVKFM6",
  };
  private fireBaseApp: firebase.app.App;
  private fireBaseDb: firebase.database.Database;
  private scores: firebase.database.Reference;
  private highscores: Array<any>;
  private allscores: Array<any>;

  constructor() {
    this.fireBaseApp = firebase.initializeApp(this.firebaseConfig);
    this.fireBaseDb = this.fireBaseApp.database();
    this.scores = this.fireBaseDb.ref("scores");
    this.highscores = [];
    this.allscores = [];
    this.getData();
  }

  insertScore(score: ScoreConfig) {
    this.scores.push(score);
  }

  getHighscores() {
    return this.highscores;
  }

  getData() {
    this.scores.on("value", (data) => {
      //console.log(data.val());
      this.allscores = [];
      Object.entries(data.val()).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];
        this.allscores.push(value);
      });

      this.allscores.sort((a: any, b: any) => {
        const valueA = a.score;
        const valueB = b.score;

        let comparison = 0;
        if (valueA < valueB) {
          comparison = 1;
        } else if (valueA > valueB) {
          comparison = -1;
        }
        return comparison;
      });

      if (this.allscores.length > 0) {
        this.highscores = [];
        for (let i = 0; i < 5; i++) {
          this.highscores.push(this.allscores[i]);
        }
      }

      // console.log(this.highscores);
    });
  }
}
