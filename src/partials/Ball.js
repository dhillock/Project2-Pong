import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight, fill) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.fill = fill;
    this.reset();
  }
  reset() {
    // code to center ball and for movement
  }
  render(svg) {
    let ball = document.createElementNS(SVG_NS, "circle");
    //yourcode here
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "cx", this.boardWidth / 2);
    ball.setAttributeNS(null, "cy", this.boardHeight / 2);
    ball.setAttributeNS(null, "fill", this.fill);

    //paint the screen
    svg.appendChild(ball);
  }
}
