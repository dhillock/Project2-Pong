import { SVG_NS } from "../settings";
import pingSound from "../../public/sounds/pong-01.wav";
import pingSound2 from "../../public/sounds/pong-02.wav";
import pingSound3 from "../../public/sounds/pong-03.wav";
import pingSound4 from "../../public/sounds/pong-04.wav";

export default class Ball {
  constructor(radius, boardWidth, boardHeight, fill) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.fill = fill;
    this.direction = 1;
    this.ping = new Audio(pingSound);
    this.ping2 = new Audio(pingSound2);
    this.reset();
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    //Generate random number between -5 and 5. This is for the y axis
    // Make sure number does not equal 0...to get around a bug
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  paddleCollision(player1, player2) {
    //
    // if the vx number is positive...moving to the right, player 2
    // if vx is greater than 0, detect paddle2, else detect paddle1
    // console.log(player1);
    // console.log(player2);
    if (this.vx > 0) {
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );

      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.ping.play();
        this.vx = -this.vx;
      }
    } else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius <= rightX &&
        this.x - this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.ping2.play();
        this.vx = -this.vx;
      }
    }
    // console.log(player1);
    // console.log(player2);
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }
  goal(player) {
    player.score++;
    this.reset();

    // console.log(player.score);
    // console.log(player);
    if (player.x === 10) {
      // console.log("Player1 Scored");
    } else {
      // console.log("Player2 Scored");
    }
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();

    this.paddleCollision(player1, player2);

    let ball = document.createElementNS(SVG_NS, "circle");
    //yourcode here
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "cx", this.x);
    ball.setAttributeNS(null, "cy", this.y);
    ball.setAttributeNS(null, "fill", this.fill);

    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    //paint the screen
    svg.appendChild(ball);

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
    ///////////////////////////////
    //dhStretch2 - If player reaches 80% of maxScore, color paddle green
    //           - If player reaches 80% of maxScore, make paddle smaller

    // console.log(svg);
    // alert();

    const pScore1 = player1.score;
    const pScore2 = player2.score;
    const mScore = player1.maxScore;
    // reset the ball
    console.log(pScore1, pScore2, mScore);

    if ((pScore1 || pScore2) === mScore) {
      alert("Game over!");
      //reset game
      window.location.reload(true);
    }

    if (pScore1 >= mScore * 0.8) {
      player1.fill = "green";
      player1.height = Math.max(26, player1.height - 10);
    }

    if (pScore2 >= mScore * 0.8) {
      player1.fill = "orange";
      player1.height = Math.max(26, player2.height - 10);
    }
    //////////////////////////////
  }
}
