<img src="https://media.giphy.com/media/11GLfCXU8gLB1C/giphy.gif" width="100%">

# :bug: Bug Out

A Breakout arcade game with a subtle twist.
This time the paddle is a developer, the ball is a "hack" and the bricks are bugs in dire need of fixing.
This was created using the [Phaser 3](https://phaser.io/) game engine.
You can find the link to the game right [here](https://bug-out.netlify.app/).

Go get 'em and good luck!

_Note: This game is set up for desktop usage on any browser except Brave._

# :beetle: Installation

_Opt. 1:_ Access the project live through [this link](https://bug-out.netlify.app/).

<details><summary><i>Opt. 2:</i> Download the project locally. 
</summary>

_Prerequisites - Here you will need both a code editor and [NPM](https://formulae.brew.sh/formula/node) installed._

1. Download this repo to your computer by pressing the green `Code` button.
2. Open up the folder in a code editor of your choice.
3. In your CLI `cd` all the way into the project's folder.
4. In your CLI type `npm run install` followed by `npm run start`.
5. Your CLI should now have kick started a localhost for you, on your browser. You can access the project from there. In your browser's URL type `http://localhost:1337/`, then you should be good to go. Have fun!
 </details>

# :snail: Changelog

<details><summary> Click here to toggle a list of all pull requests.
</summary>

-   [#1 - Testing permissions + pull request functionality.](https://github.com/dantemogrim/Bug-Out/pull/1)
-   [#2 - Testing out PixiJS.](https://github.com/dantemogrim/Bug-Out/pull/2)
-   [#3 - Updated README.md.](https://github.com/dantemogrim/Bug-Out/pull/3)
-   [#4 - Webpack boiler plate + ES6.](https://github.com/dantemogrim/Bug-Out/pull/4)
-   [#5 - Testing out Firebase.](https://github.com/dantemogrim/Bug-Out/pull/5)
-   [#6 - Getting started with Phaser.](https://github.com/dantemogrim/Bug-Out/pull/6)
-   [#7 - Delete package-lock.json.](https://github.com/dantemogrim/Bug-Out/pull/7)
-   [#8 - Updating .gitignore.](https://github.com/dantemogrim/Bug-Out/pull/8)
-   [#9 - Settings up score, level & lives.](https://github.com/dantemogrim/Bug-Out/pull/9/files)
-   [#10 - Updated visuals.](https://github.com/dantemogrim/Bug-Out/pull/10/)
-   [#11 - Paddle movement.](https://github.com/dantemogrim/Bug-Out/pull/11)
-   [#12 - Ball velocity.](https://github.com/dantemogrim/Bug-Out/pull/12)
-   [#13 - Testing HUD texts as global variables.](https://github.com/dantemogrim/Bug-Out/pull/13/files)
-   [#14 - Game Over scene created.](https://github.com/dantemogrim/Bug-Out/pull/14)
-   [#15 - Game Over scene functionality in GameScene.js + config.js.](https://github.com/dantemogrim/Bug-Out/pull/15)
-   [#16 - Updated ball functionality + README.md.](https://github.com/dantemogrim/Bug-Out/pull/16)
-   [#17 - HUD texts made dynamic and functional.](https://github.com/dantemogrim/Bug-Out/pull/17)
-   [#18 - Integrated formatting + linting with Prettier & ESLint.](https://github.com/dantemogrim/Bug-Out/pull/18)
-   [#19 - Testing out pause/resume & audio/mute functionality.](https://github.com/dantemogrim/Bug-Out/pull/19)
-   [#20 - Setting up Ball as a class + updated Firebase testing.](https://github.com/dantemogrim/Bug-Out/pull/20/)
-   [#21 - Updated Firebase settings + breaking down game objects into classes.](https://github.com/dantemogrim/Bug-Out/pull/21)
-   [#22 - Improved animations & faster bundler (from Webpack to Vite).](https://github.com/dantemogrim/Bug-Out/pull/22)
-   [#23 - Changelog updated + fixing brick bugs.](https://github.com/dantemogrim/Bug-Out/pull/23)
-   [#24 - Level bug + create bricks fixed.](https://github.com/dantemogrim/Bug-Out/pull/24)

</details>

# :honeybee: Code Review

1. Think about SRP, in scenes, i.e, you might wanna create a createControllButton, createStartButton method in PreloadScene and call those methods from within the create method.
2. `GameScene.js:167-204` The update method in GameScene has a very high amount of control statements, think about abstracting these out to separate methods to reduce code complexity and make debugging easier.
3. `Sidebars.js:13` In the Sidebars class, you have repeat set to 6 in every config object, you might wanna make a const for that and use that variable to make refactoring easier incase you wanted to change the repeats number to something else.
4. `GameScene.js: 140` Forces to ball to always go down to the right, you might wanna this makes the ball not being able to bounce up if hitting brick from upside down, might wanna adjust these values.
5. `GameScene.js:108-118` When the first if-statement is false, the second case will always be true. Therefore the second if-statement is redundant.
6. `Ball.js:21`: Might not wanna have two multiline comments inside the function call.
7. `Paddle.js:19` Your paddle is more of a rectangular shape, but you have givent it a circular hitbox. Why is that?
8. `Brick.js:19-22` Might wanna wanna use more const's instead of lets when you have properties that will not change, to prevent accidental mutations from other parts of your code.
9. `SideBars.js:13-35` Triple assignment feels redundant, the last assignment to this.object should probably take preceedence over the earlier once, thus making the earlier assignments redundant.
10. Very nice illustrations, makes the game feel very unique.

# :space_invader: Testers

_Tested by the following people:_

1. Simon Lindstedt
2. Amanda Fager
3. Marcel Branleur
4. Julia K. Lindstedt

_Tested by the following muggles (non-coders):_

1. Miranda Samuelsson
2. Wissam Abuajwa
3. Ali Mohamad
4. Axel Erlandsson

## :unicorn: Creators

-   [Aseel Mohamad](https://github.com/Aseel88)
-   [Dante Mogrim](https://github.com/dantemogrim)

## :ant: Stack

-   Engine: [![Phaser 3](https://img.shields.io/badge/Phaser-V.3-teal.svg)](https://phaser.io/)
-   Formatting: [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
-   Hosting: [![Netlify Status](https://api.netlify.com/api/v1/badges/0cb3b88c-30f3-4c4a-ad01-de12e7fb77bc/deploy-status)](https://app.netlify.com/sites/bug-out/deploys)

## :globe_with_meridians: License

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
