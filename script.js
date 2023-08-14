let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rows = 20;
let cols = 20;
let snake = [{
    x: 19,
    y: 3
}];

let food;

let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let foodCollected = false;
let pauseGame = true;
let gameInterval;

let CurrentScore = document.getElementById("CurrentScore");

placeFood();

function draw() {
    ctx.fillStyle = '#b2c302';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#7d720b';

    snake.forEach(part => add(part.x, part.y));

    ctx.fillStyle = '#7d720b';
    add(food.x, food.y); // Food

    requestAnimationFrame(draw);
}

function counter() {
    let counting = document.getElementById("counter");
    counting.innerHTML++;
}

function currentScore(){

    CurrentScore.innerHTML++;
}


// Menu
let mainMenu = document.getElementById('mainMenu');

let menu = document.getElementById('startButton').onclick = function () {
    mainMenu.style.display = 'none';
    pauseGame = false; // Starte das Spiel

    if (!gameInterval) {
        gameInterval = setInterval(gameLoop, 250);
    }

    document.addEventListener('keydown', keyDown);

    draw();

    CurrentScore.innerHTML = '00';
};

function GameOver() {
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x === firstPart.x && part.y === firstPart.y);

    if (snake[0].x < 0 ||
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatePart
    ) {
        placeFood();
        snake = [{
            x: 19,
            y: 3
        }];
        direction = 'LEFT';

        mainMenu.style.display = 'block';


        let counting = document.getElementById("counter").innerHTML = '00';



        clearInterval(gameInterval); // Stoppe den Game-Loop
        gameInterval = null; // Setze das gameInterval zurück
        pauseGame = true; // Setze das Spiel auf Pause
        startButton.innerHTML = 'Replay';
    }
}

function placeFood() {
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);

    if (foodCollected) { // Countertest
        counter();
    }
    if(foodCollected){
        currentScore();
    }

    food = {
        x: randomX,
        y: randomY
    };
}

function add(x, y) {
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
}

function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function gameLoop() {
    if (pauseGame) {
        return; // Der Game-Loop stoppt, wenn das Spiel pausiert ist
    }

    GameOver();

    if (foodCollected) {
        snake = [{
            x: snake[0].x,
            y: snake[0].y
        }, ...snake];

        foodCollected = false;
    }

    shiftSnake();

    if (direction == 'LEFT') {
        snake[0].x--;
    }

    if (direction == 'RIGHT') {
        snake[0].x++;
    }

    if (direction == 'UP') {
        snake[0].y--;
    }

    if (direction == 'DOWN') {
        snake[0].y++;
    }

    if (snake[0].x == food.x &&
        snake[0].y == food.y) {
        foodCollected = true;

        placeFood();
    }
}

function keyDown(e) {
    if (e.keyCode == 37) {
        direction = 'LEFT';
    }
    if (e.keyCode == 38) {
        direction = 'UP';
    }
    if (e.keyCode == 39) {
        direction = 'RIGHT';
    }
    if (e.keyCode == 40) {
        direction = 'DOWN';
    }
}
