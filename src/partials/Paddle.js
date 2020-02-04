import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 40; // speed of the paddle movement. Could be called distance.... It's the distance the paddle moves with a single key stroke
    this.score = 0;
    this.fill = "yellow";
    this.maxScore = 10;

    document.addEventListener("keydown", event => {
      // console.log(event);
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });
  }

  up() {
    this.y = Math.max(0, this.y - this.speed);

    //dhStretch1a - Wrap Paddle
    if (this.y === 0) {
      this.y = 256; // 256
    }
  }

  down() {
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);

    //dhStretch1b - Wrap Paddle
    if (this.y === 200) {
      this.y = -56; // 56
    }
  }
  coordinates(x, y, width, height) {
    let leftX = x; // Left side of the paddle
    let rightX = x + width; // Right side of the paddle
    let topY = y; // Top of the paddle
    let bottomY = y + height; // Bottom of the paddle
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, "rect");

    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "y", this.y);
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "fill", this.fill);

    svg.appendChild(rect); // Paint the screen

    //dhDelete me...no paddles and end game quickly! Keep for testing
    // this.x = -56;
    // aaaathis.y = 256;
    // this.maxScore = 2;
  }
}
