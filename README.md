# Pong Game Starter

A starter project for a basic pong game using SVGs.

## Setup

Ensure you have [Node.js](https://nodejs.org/en/) installed first.

**Install dependencies:**

`$ npm install`

**Run locally with the Parcel dev server:**

`$ npm start`

Once you run the start command you can access your project at http://localhost:3000.

Read more about the [Parcel web application bundler here](https://parceljs.org/).

## Deploy

The deployment workflow for this project will be a bit different from what you've used when deploying simple static websites.

To deploy your finished Pong project as a GitHub page, you must first **update the `predeploy` script in the `package.json` file with the name of your repo.**

For example, if your repo URL is:

https://github.com/bob/pong-project

Update the `predeploy` script as follows:

```json
"predeploy": "rm -rf dist && parcel build index.html --public-url /pong-project",
```

Once you have done this, you can run:

`$ npm run deploy`

Now check out your deployed site 🙂

<H1 style='color:yellow'>Pong Game Starter - Project 2</H1>

<H2 style='color:yellow'>Brief Description:</H2>

This is the second project from RED Academy, in the **Web Development Program**.
The purpose of the project is to complete the development of the Pong game.
More specifically, the emphasis was on building our own Javascript classes and methods, and to learn how these classes and methods could interact with each other.
We were also challenged to complete a number of unspecified stretch-goals. Listed below are my stretch goals:

```
     - 1) The player paddles were modified so that the wrapped around the screen - for example, left the top of the screen, and entered at the bottom.
     - 2) If a player reaches 80% of the maxScore, the paddle colour changes to green - indicating that the player is close to winning.
     - 3) If a player reaches 80% of the maxScore, the paddle height is reduced by 50 percent - making it harder to win.
     - 4) If a player reaches 70% of the maxScore - meaning the other player is close to losing -- Chopin's Funeral March starts playing.
     - 5) Added sound when the ball strikes a paddle
     - 6) When the game is over, the loser's score melts off the screen...although i could not get this to "go slowly," as first intented.
     - 7) After some script modifications, I was able to get the Pong Game to play on an internet platform.
          http://dhconsulting.netfirms.com/12Pong/index.html

```

<H2 style='color:yellow'>Technology Used:</H2>

This project uses the following technology:

- HTML
- CSS
- Javascript
- GitHub
- iTerm2
- Yarn

Development tools include:

- Visual Code Studio

  ```
       - Bracket Pair Colorizer
       - GitLens
       - Live Server
       - Live Share
       - Path Autocomplete
       - Prettier - Code Formatter
  ```

<H2 style='color:yellow'>Personal Learnings:</H2>

In this project, I learned how to create a JSON package, and to use a yarn server. The server was necessary because the program
contaings it's own javascript classes, and methods, which browsers cannot compile and execute on the fly.

This project allowed me to learn how to capture both keystrokes and mouse clicks, using javascript. In addtion, I learned how to build two-dimensional svg (scalable Vector Graphics) graphic files, and then render them.

Through the pong game, it became obvious that javascript does not execute in a linear fashion, and therefore, to **_slow-down_** a website, or to control timing issues, more advanced knowledge is required.

<H2 style='color:yellow'>Install Information:</H2>

All necessary files are in the Project 1 folder, using the following folder structure:

- see above

**_ End of ReadMe.md _**
