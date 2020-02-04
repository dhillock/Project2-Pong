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

    document.addEventListener("keydown", event => {
      console.log(event.key);

      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause; // if not paused, then pause. If paused, then unpause.
          this.player1.speed = 10;
          this.player2.speed = 10;
          break;
      }
    });
  }

  secondsDelay(theParm) {
    for (var i = 0; i < 4; i++) {
      (function(i) {
        setTimeout(function() {
          // console.log("HelloJJJJJ", i);
        }, theParm * 400000000 * i);
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
    var lCounter,
      lCounter2 = 0;

    if ((pScore1 || pScore2) === mScore) {
      // someone won!
      console.log(pScore1, pScore2, mScore);

      if (pScore1 > pScore2) {
        // alert("Player1 won");
        // Player1 wins, drop player2 score off the board

        let loserScore = pScore2;
        let counter2 = 2;

        for (lCounter = 0; lCounter < 256; lCounter += 35) {
          this.score2.textContext = "   ";
          this.score2.render(svg, pScore2); // Render the blank score

          this.score2.textContextr = loserScore; // Load the actual losing score

          this.score2.y = 30 + lCounter; // Set the new scoreboard location for this looser
          this.score2.render(svg, pScore2); // Render the new scoreboard, with the losing score

          // The game renders 50 times per second
          for (counter2 = 0; counter2 < 50; counter2++) {
            // console.log(counter2);
          }
          // Slow down the loop
          // this.secondsDealy(1)
          // loop for 1 seconds
        }
      } else {
        // player2 wins, drop player1 score off the board
        // alert("player 2 won ");

        let loserScore = pScore1;
        let counter2 = 2;

        for (lCounter = 0; lCounter < 256; lCounter += 35) {
          this.score1.textContext = "   ";
          this.score1.render(svg, pScore1); // Render the blank score

          this.score1.textContextr = loserScore; // Load the actual losing score

          this.score1.y = 30 + lCounter; // Set the new scoreboard location for this looser
          this.score1.render(svg, pScore1); // Render the new scoreboard, with the losing score

          // The game renders 50 times per second
          for (counter2 = 0; counter2 < 50; counter2++) {
            // console.log(counter2);
          }
          // Slow down the loop
          // this.secondsDealy(1)
          // loop for 1 seconds
        }
      }

      // alert("game is over...in game.js");
      // window.location.reload(true);
      //how to put game in pause mode?
    }

    /////////////////////////// End of dhStretch
  }
}
