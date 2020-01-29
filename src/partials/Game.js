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

    // document.addEventListener("keydown", event => {
    //   // console.log(event.key);
    //   // console.log(event);
    //   switch (event.key) {
    //     case " ":
    //       //pause here
    //       console.log("hello", event);

    //   }
    // });

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
    // console.log(this.width);

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

    // console.log(this.player2);
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          this.player1.speed = 10;
          this.player2.speed = 10;
          break;
      }
    });
  }

  render() {
    // console.log(this.board);
    if (this.pause) {
      this.player1.speed = 0;
      this.player2.speed = 0;
      return;
    }

    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
