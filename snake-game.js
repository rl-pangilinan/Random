// Define the square size and initial snake position
const squareSize = 20;
let snake = [{ x: 1, y: 1 }];
let direction = "right";
let gameInterval; // Will store the game loop interval
let score = 0;
let highScore = 0;

// Check for high score in local storage
if (localStorage.getItem("highScore")) {
    highScore = parseInt(localStorage.getItem("highScore"));
}

// Define food's initial position
let food = { x: 5, y: 5 };

// Create a canvas element
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;

const context = canvas.getContext("2d");

// Function to draw a square with a border
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function drawGrid() {
    context.strokeStyle = "black";
    for (let x = 0; x < canvas.width; x += squareSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
    }
    for (let y = 0; y < canvas.height; y += squareSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
    }

    // Draw an outer border
    context.lineWidth = 2; // Set the line width for the outer border
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1; // Reset the line width for other elements
}
// Function to draw the snake
function drawSnake() {
    snake.forEach(segment => drawSquare(segment.x, segment.y, "green"));
}

// Function to draw the food
function drawFood() {
    drawSquare(food.x, food.y, "red");
}

// Function to move the snake
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        // The snake ate the food, generate a new food
        food = {
            x: Math.floor(Math.random() * (canvas.width / squareSize)),
            y: Math.floor(Math.random() * (canvas.height / squareSize)),
        };
        score += 10; // Increase the score
    } else {
        // The snake didn't eat the food, remove the last segment
        snake.pop();
    }

    // Update the high score if needed
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
}

// Function to handle keyboard input
function handleKeyInput(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
}

// Function to check for collisions
function checkCollision() {
    const head = snake[0];

    if (
        head.x < 0 ||
        head.x >= canvas.width / squareSize ||
        head.y < 0 ||
        head.y >= canvas.height / squareSize
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Function to start the game
function startGame() {
    snake = [{ x: 0, y: 1 }]; // Reset snake position
    direction = "right"; // Reset direction
    score = 0; // Reset the score
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(gameLoop, 100);
}

// Main game loop
function gameLoop() {
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over! Score: " + score + " High Score: " + highScore);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); // Draw the grid
    moveSnake();
    drawFood();
    drawSnake();
    drawScores(); // Draw the scores
}

// Function to draw the grid
function drawGrid() {
    context.strokeStyle = "black";
    for (let x = 0; x < canvas.width; x += squareSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
    }
    for (let y = 0; y < canvas.height; y += squareSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
    }
}

// Function to draw the scores
function drawScores() {
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, canvas.height + 20);
    context.fillText("High Score: " + highScore, 10, canvas.height + 40);
}

// Create a "Start" button to begin the game
const startButton = document.createElement("button");
startButton.textContent = "Start";
startButton.style.fontSize = "24px"; // Increase the font size
startButton.addEventListener("click", startGame);
document.body.appendChild(startButton);

// Create a container for scores and position it below the canvas
const scoreContainer = document.createElement("div");
scoreContainer.style.textAlign = "center";
scoreContainer.appendChild(startButton);
document.body.appendChild(scoreContainer);

// Listen for keyboard input
window.addEventListener("keydown", handleKeyInput);
