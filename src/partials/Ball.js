import { SVG_NS } from "../settings";

export default class Ball {
  constructor(r, cx, cy, fill) {
    this.r = r;
    this.cx = cx;
    this.cy = cy;
    this.fill = fill;
  }

  render(svg) {
    let ball = document.createElementNS(SVG_NS, "circle");
    //yourcode here
    ball.setAttributeNS(null, "r", this.r);
    ball.setAttributeNS(null, "cx", this.cx);
    ball.setAttributeNS(null, "cy", this.cy);
    ball.setAttributeNS(null, "fill", this.fill);

    //paint the screen
    svg.appendChild(ball);
  }
}
