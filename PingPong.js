/**
 *Goblins game
 *
 * This program consists of a Ping Pong game where the user plays against the computer.
 * 
 * By Elia El Atram on 24/10/2020 8:00
 */


// Create the class Game
class Game {

    // constructor of the class
    constructor() {
        this.width = 800; // setting the width
        this.height = 600; // setting the height
        this.spritesArray = []; // declaring the sprites array
        this.canvas = document.getElementById("EliaCanvas"); // getting the canvas
        this.ctx = this.canvas.getContext("2d"); // getting the context
    }

    // update of the class
    update() {
        for (var i = 0; i < this.spritesArray.length; i++)
            this.spritesArray[i].update(); // updating the elements of the sprites array
    }

    // drawing the class elements
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.spritesArray.length; i++)
            this.spritesArray[i].draw(this.ctx); // drawing the elements of the sprites array
    }

    // add elements to the sprites array
    addSprite(paramSprite) {
        this.spritesArray.push(paramSprite)
    }

}

// Creating the abstract Sprite class
class Sprite {

    constructor() {}

    update() {}

    draw() {}
}

// Create the User paddle class
class User extends Sprite {

    /**
     * constructor of the class
     * @param {*} posX x coordinate of the paddle
     * @param {*} posY y coordinate of the paddle
     * @param {*} width width of the paddle
     * @param {*} height height of the paddle
     * @param {*} color color of the paddle
     */
    constructor(posX, posY, width, height, color) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // update of the class
    update() {
        if (38 in keysDown && this.posY > 0) {
            this.posY -= 8;
        } else if (40 in keysDown && (this.posY < 600 - this.height)) {
            this.posY += 8;
        }
    }

    // draw of the class
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
}

// Create the Computer paddle class
class CPU extends Sprite {

    /**
     * constructor of the class
     * @param {*} posX x coordinate of the paddle
     * @param {*} posY y coordinate of the paddle
     * @param {*} width width of the paddle
     * @param {*} height height of the paddle
     * @param {*} color color of the paddle
     * @param {*} ball ball object 
     */
    constructor(posX, posY, width, height, color, ball) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ball = ball;
    }

    // update of the class
    update() {
        this.posY += ((this.ball.posY - (this.posY + this.height / 2))) * 0.09;
    }

    // draw of the class
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
}

// Background image class
class Background extends Sprite {

    // Constructor of the class
    constructor() {
        super();
    }

    // drawing the background along with the rules and features of the game
    draw(ctx) {

        ctx.beginPath();
        // set a style
        ctx.fillStyle = "green"; /* whatever comes below this acquires black color (#000). */
        // draws the black board
        ctx.fillRect(0, 0, 800, 600);

        // P for pause
        ctx.fillStyle = "white";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("Press P for pause", 200, 30);
    }

    update() {}

}

// Create the Net class
class Net extends Sprite {

    /**
     * constructor of the class
     * @param {*} posX x coordinate of the net
     * @param {*} posY y coordinate of the net
     * @param {*} width width of the net
     * @param {*} height height of the net
     * @param {*} color color of the net
     */
    constructor(posX, posY, width, height, color) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // update of the class
    update() {

    }

    // draw of the class
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
}

// Create the Ball class
class Ball extends Sprite {

    /**
     * constructor of the class
     * @param {*} posX x coordinate of the ball
     * @param {*} posY y coordinate of the ball
     * @param {*} radius radius of the ball
     * @param {*} speed speed of the ball
     * @param {*} directionX x direction of the ball
     * @param {*} directionY y direction of the ball
     * @param {*} color color of the ball
     * @param {*} user user object
     * @param {*} computer computer object
     */
    constructor(posX, posY, radius, speed, directionX, directionY, color, user, computer) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.speed = speed;
        this.directionX = directionX;
        this.directionY = directionY;
        this.color = color;
        this.userScore = 0;
        this.computerScore = 0;
    }

    // update of the class
    update() {

        // move the ball
        this.posX += this.directionX;
        this.posY += this.directionY;

        // check if ball hits top or bottom wall
        if (this.posY + this.radius >= 600 || this.posY - this.radius <= 0) {
            this.directionY = -this.directionY;
        }

        // if ball hit on right wall
        if (this.posX + this.radius >= 800) {
            this.userScore += 1;
            this.reset();
        }

        // if ball hit on left wall
        if (this.posX - this.radius <= 0) {
            this.computerScore += 1;
            this.reset();
        }

        if ((this.posX - this.radius) < (user.posX + user.width) && (this.posY - this.radius) < (user.posY + user.height) &&
            (this.posX + this.radius) > (user.posX) && (this.posY + this.radius) > user.posY) {

            let angle = 0;

            // if ball hit the top of paddle
            if (this.posY < (user.posY + user.height / 2)) {

                angle = -1 * Math.PI / 4;
            } else if (this.posY > (user.posY + user.height / 2)) {

                angle = Math.PI / 4;
            }

            /* change velocity of ball according to on which paddle the ball hitted */
            this.directionX = 1 * this.speed * Math.cos(angle);
            this.directionY = this.speed * Math.sin(angle);

        } else if ((this.posX - this.radius) < (computer.posX + computer.width) && (this.posY - this.radius) < (computer.posY + computer.height) &&
            (this.posX + this.radius) > (computer.posX) && (this.posY + this.radius) > computer.posY) {

            let angle = 0;

            // if ball hit the top of paddle
            if (this.posY < (computer.posY + computer.height / 2)) {

                angle = -1 * Math.PI / 4;
            } else if (this.posY > (computer.posY + computer.height / 2)) {

                angle = Math.PI / 4;
            }

            /* change velocity of ball according to on which paddle the ball hitted */
            this.directionX = -1 * this.speed * Math.cos(angle);
            this.directionY = this.speed * Math.sin(angle);
        }
    }

    // draw of the class
    draw(ctx) {

        // drawing the ball
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        // User Score
        ctx.fillStyle = "red";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Score: " + this.userScore, 32, 32);

        // Computer Score
        ctx.fillStyle = "red";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText("Score: " + this.computerScore, 780, 32);


    }

    // reset the ball
    reset() {

        // reset ball's value to older values
        this.posX = 800 / 2;
        this.posY = 600 / 2;

        // changes the direction of ball
        this.directionX = -this.directionX;
        this.directionY = -this.directionY;
    }
}

var paused = false; // pause state of the game is false

// handling the state of the game
function pause() {
    if (!paused) {
        paused = true;
    } else if (paused) {
        paused = false;
    }
}

// Handle keyboard controls
var keysDown = {};

// add an eventListener to browser window
addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode === 80) // p key
    {
        pause();
    }
}, false);

// add an eventListener to browser window
addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var myGame = new Game(); // creating the game object

var user = new User(10, myGame.height / 2 - 50, 10, 100, "red"); // creating the user object

var background = new Background(); // creating the background object

var ball = new Ball(myGame.width / 2, myGame.height / 2, 7, 7, 5, 5, "orange", user, computer); // creating the ball object

var computer = new CPU(myGame.width - 20, myGame.height / 2 - 50, 10, 100, "red", ball); // creating the computer object

var net = new Net(myGame.width / 2, 0, 10, myGame.width, "white"); // creating the net object

myGame.addSprite(background); // adding the background to the sprites array
myGame.addSprite(user); // adding the user to the sprites array
myGame.addSprite(ball); // adding the ball to the sprites array
myGame.addSprite(computer); // adding the computer to the sprites array
myGame.addSprite(net);

// gameLoop
main = function() {
    if (!paused) {
        myGame.update(); // update function
    }
    myGame.draw(); // draw function
    requestAnimationFrame(main);
}

main(); // calling the game loop