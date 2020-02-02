import { SVG_NS, KEYS } from "../settings.js";
import Board from "./Board.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Score from "./Scoredata.js";

export default class Game {
  constructor(element, width, height, spaceBar) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.paddleWidth - this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );

    this.r = 8;
    this.fill = "hotPink";

    this.ball = new Ball(this.r, this.width, this.height, this.fill);

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    //dh delete me
    // this.score1 = new Score(this.width / 2 - 50, 150, 30);
    // this.score2 = new Score(this.width / 2 + 25, 150, 30);

    // console.log("player1 Score: ", this.score1);
    // console.log("player2 Score: ", this.score2);
    // console.log("This is this.player1: ", this.player1);
    // console.log("This is this.player2: ", this.player2);

    // console.log(this.player2);
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause; // if not paused, then pause. If paused, then unpause.
          this.player1.speed = 10;
          this.player2.speed = 10;
          break;
      }
    });
  }

  secondsDelay(numbSeconds) {
    const currentDate = new Date();
    const currentSeconds = currentDate.getSeconds() + 1000; // 1030
    var waitSeconds = currentSeconds + this.numbSeconds; // 1040

    setTimeout(function() {
      alert("Hello");
    }, 1000 * numbSeconds);

    // this.numbSeconds = 10;

    // alert("numbSeconds passed ", this.numbSeconds);

    // // console.log(clockSeconds, this.numbSeconds);
    // // alert("in secondsDelay");
    // console.log("currentSeconds ", currentSeconds, "waitSeconds", waitSeconds);

    // for (
    //   waitSeconds = waitSeconds;
    //   waitSeconds < currentSeconds;
    //   waitSeconds++
    // ) {
    //   console.log("waitSeconds ", waitSeconds);
    // }
  }

  emptyFunction(theParm) {
    for (var i = 0; i < 4; i++) {
      (function(i) {
        setTimeout(function() {
          console.log("Hello", i);
        }, theParm * 1000 * i);
      })(i);
    }
  }

  render() {
    // If the game is paused, do not render the whole game, simply return
    if (this.pause) {
      this.player1.speed = 0;
      this.player2.speed = 0;
      return;
    }

    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");

    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);

    this.gameElement.appendChild(svg); // Paint the Screen

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);

    //////////////////////////////////////////////////////////////////////////////////////
    // dhStretch3 - At the end of the game, have the loser score melt off the screen. ///
    ////////////////////////////////////////////////////////////////////////////////////

    const pScore1 = this.player1.score;
    const pScore2 = this.player2.score;
    const mScore = this.player1.maxScore;
    var lCounter = 0;
    var timeId = 0;

    if ((pScore1 || pScore2) === mScore) {
      // someone won!
      console.log(pScore1, pScore2, mScore);

      if (pScore1 > pScore2) {
        // alert("Player1 won");
        // Player1 wins, drop player2 score off the board

        for (lCounter = 0; lCounter < 256; lCounter++) {
          // += 10?
          // console.log(lCounter);
          // timeId = setTimeout(this.emptyFunction(2), 2000);

          this.score2 = new Score(this.width / 2 + 25, 30 + lCounter, 30);
          this.score2.render(svg, pScore2);
          // put delay here, so that the score-dropping goes slowly
          this.emptyFunction(1);
        }
      } else {
        // player2 wins, drop player1 score off the board
        // alert("player 2 won ");

        for (lCounter = 0; lCounter < 200; lCounter++) {
          this.score1 = new Score(this.width / 2 - 50, 30 + lCounter, 30);
          this.score1.render(svg, this.player2.score);

          // for (lCounter2 = 0; lCounter2 < 100; lCounter2++) {
          //   console.log("lCounter2b", lCounter, lCounter2);
          // }
        }
      }
      alert("game is over...in game.js");
      window.location.reload(true);
      //how to put game in pause mode?
    }

    /////////////////////////// End of dhStretch
  }
}
