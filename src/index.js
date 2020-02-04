import "./styles/game.css";
import Game from "./partials/Game";

// create a game instance
const game = new Game("game", 512, 256);

let counter = 0;
//
(function gameLoop(now) {
  // counter++;
  game.render();
  // if (counter > 2 && now < 2000) {
  requestAnimationFrame(gameLoop);
  // }
  // repaint the screen. Comment out for debuging256
  // console.log("Millaseconds", now);
  // console.log("counter", counter);
})();

//
