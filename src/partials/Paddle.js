import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10; // speed of the paddle movement. Could be called distance
    this.score = 0;
    this.fill = "yellow";
    this.maxScore = 10;

    document.addEventListener("keydown", event => {
      // console.log(event);
      switch (event.key) {
        case up:
          this.up();
          // console.log("go up");
          break;
        case down:
          // console.log("go down");
          this.down();
          break;
      }
    });
  }

  up() {
    this.y = Math.max(0, this.y - this.speed);

    //dhStretch1a - Wrap Paddle1
    if (this.y === 0) {
      this.y = 256;
    }
  }

  down() {
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);

    //dhStretch1b - Wrap Paddle2
    if (this.y === 200) {
      this.y = -56;
    }
  }
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, "rect");
    // your code here
    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "y", this.y);
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "fill", this.fill);

    svg.appendChild(rect);
  }
}
