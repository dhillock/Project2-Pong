import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener("keydown", event => {
      // console.log(event);
      switch (event.key) {
        case up:
          // console.log("go up");
          this.y = this.y - this.speed;
          console.log("go up");
          break;
        case down:
          this.y = this.y + this.speed;
          console.log("go down");
          break;
      }
    });
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, "rect");
    // your code here
    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "y", this.y);
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "fill", "white");

    svg.appendChild(rect);
  }
}
