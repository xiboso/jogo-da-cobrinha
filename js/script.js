const squareSize = 15;
const squareAmount = 20;

const snakeSpawn = [
    { x: 11, y: 10 },
    { x: 10, y: 10 },
    { x: 9, y: 10 }
];

let firstPosition = {
    x: Math.floor(Math.random() * squareAmount),
    y: Math.floor(Math.random() * squareAmount)
};

 while (snakeColision(firstPosition)) {
    firstPosition.x = Math.floor(Math.random() * squareAmount)
    firstPosition.y = Math.floor(Math.random() * squareAmount);
};

const fruit ={
    x: firstPosition.x,
    y: firstPosition.y
 };

let score = 0;

let direction = { x: 1, y: 0 };

const canvas = document.getElementById('tabuleiro');
const ctx = canvas.getContext('2d');

const start = document.getElementById('start');

const scoreScreen = document.getElementById('score');

const gameOver = document.getElementById('gameOver');

let sI;

function startGame(){
        sI = setInterval(() => {
        const newHead = {
            x: snakeSpawn[0].x + direction.x,
            y: snakeSpawn[0].y + direction.y
        };

        if(newHead.x < 0 || newHead.x >= squareAmount || newHead.y < 0 || newHead.y >= squareAmount){
            clearInterval(sI)

            gameOver.style.display = 'flex';

            return; 
        };

        let bodyColision = false;

        snakeSpawn.forEach((item) => {
            if(newHead.x === item.x && newHead.y === item.y){
                bodyColision = true;
            }
        });

        if(bodyColision){
            clearInterval(sI);

            gameOver.style.display = 'flex';

            return;
        };

        snakeSpawn.unshift(newHead);

        if(newHead.x === fruit.x && newHead.y === fruit.y) {
            while (snakeColision(fruit)) {
                fruit.x = Math.floor(Math.random() * squareAmount)
                fruit.y = Math.floor(Math.random() * squareAmount);
            }

            score++;

        } else {
            snakeSpawn.pop();
        }

        ctx.clearRect( 0, 0, squareAmount * squareSize, squareAmount * squareSize)

        const fruitPixelX = fruit.x * squareSize;
        const fruitPixelY = fruit.y * squareSize;

        ctx.fillStyle = '#eb4034'
        ctx.fillRect(fruitPixelX, fruitPixelY, squareSize, squareSize);

        ctx.fillStyle = '#40ad5d'
        snakeSpawn.forEach((item) => {
        const pixelX = item.x * squareSize;
        const pixelY = item.y * squareSize;

        ctx.fillRect(pixelX, pixelY, squareSize, squareSize);
        });

        scoreScreen.textContent = `Score: ${score}`;

        }, 150);
};

function snakeColision(pos) {
    let colision = false;

    snakeSpawn.forEach((item) => {
        if (pos.x === item.x && pos.y === item.y) {
            colision = true;
        }
    });

    return colision;
}

function resetGame() {
    snakeSpawn.length = 0;
    snakeSpawn.push(
        { x: 11, y: 10 },
        { x: 10, y: 10 },
        { x: 9, y: 10 }
    );

    direction = { x: 1, y: 0 };

    score = 0;

    scoreScreen.textContent = 'Score: 0';

    while (snakeColision(fruit)) {
        fruit.x = Math.floor(Math.random() * squareAmount)
        fruit.y = Math.floor(Math.random() * squareAmount);
    }
};

const exitButton = document.getElementById('exitButton');

exitButton.addEventListener('click', (event) => {
    gameOver.style.display = 'none';
    resetGame();
    ctx.clearRect(0, 0, squareAmount * squareSize, squareAmount * squareSize)
});

start.addEventListener('click', (event) => {
    startGame();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    }
    if (event.key === 'ArrowDown' && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    }
    if (event.key === 'ArrowLeft' && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    }
    if (event.key === 'ArrowRight' && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
});