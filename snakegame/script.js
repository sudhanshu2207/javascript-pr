const board = document.querySelector(".board");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const timeEl = document.getElementById("time");

const blockSize = 25;

let cols = Math.floor(board.clientWidth / blockSize);
let rows = Math.floor(board.clientHeight / blockSize);

// Create board blocks
const blocks = {};
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.top = `${r * blockSize}px`;
        block.style.left = `${c * blockSize}px`;
        board.appendChild(block);
        blocks[`${r}-${c}`] = block;
    }
}

// Snake initial position
let snake = [{ x: 2, y: 2 }];
let direction = "right";

// Food spawn
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
};

// Score and High Score
let score = 0;
let highScore = localStorage.getItem("snake-highscore") || 0;
highScoreEl.innerText = highScore;

// Timer
let seconds = 0;
setInterval(() => {
    seconds++;
    let m = String(Math.floor(seconds / 60)).padStart(2, "0");
    let s = String(seconds % 60).padStart(2, "0");
    timeEl.innerText = `${m}:${s}`;
}, 1000);

// Game Loop
function render() {
    // Place food
    blocks[`${food.x}-${food.y}`].classList.add("food");

    // Move snake head
    let head = { ...snake[0] };

    if (direction === "left") head.y--;
    if (direction === "right") head.y++;
    if (direction === "up") head.x--;
    if (direction === "down") head.x++;

    // Collision → GAME OVER
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        gameOver();
        return;
    }

    // Collision with self
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        gameOver();
        return;
    }

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");

        score++;
        scoreEl.innerText = score;

        // Update high score
        if (score > highScore) {
            highScore = score;
            highScoreEl.innerText = highScore;
            localStorage.setItem("snake-highscore", highScore);
        }

        // New food
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);

    // Clear board
    Object.values(blocks).forEach(b => b.classList.remove("fill"));

    // Draw snake
    snake.forEach(seg => {
        blocks[`${seg.x}-${seg.y}`].classList.add("fill");
    });
}

let intervalID = setInterval(render, 200);

// Controls
addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});

function gameOver() {
    alert("Game Over! Score: " + score);
    clearInterval(intervalID);
    location.reload();
}
