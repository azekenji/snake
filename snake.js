
//board
var score = -1
var blockSize = 28;
var dy = 30;
var dx = 30;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//еда
var foody;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = dy * blockSize;
    board.width = dx * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1500/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="gray";
    context.fillRect(1, 1, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foody, foodY, blockSize, blockSize);

    if (snakeX == foody && snakeY == foodY) {
        snakeBody.push([foody, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > dx*blockSize || snakeY < 0 || snakeY > dy*blockSize) {
        gameOver = true;
        alert("Игра окончена");
        window.location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Игра окончена");
            window.location.reload();
        }
    }
}

function changeDirection(e) {
    //стрелка вверх
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    //стрелка вниз
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    //стрелка лево
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    //стрелка права
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * dx -> (0-19.9999) -> (0-19) * 25
    foody = Math.floor(Math.random() * dx) * blockSize;
    foodY = Math.floor(Math.random() * dy) * blockSize;
}





