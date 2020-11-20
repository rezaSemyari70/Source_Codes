const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

let snake = [
    { x: 150 , y: 150 }, 
    { x: 140 , y: 150 }, 
    { x: 130 , y: 150 }, 
    { x: 120 , y: 150 }, 
    { x: 110 , y: 150 }
]

let foodX , foodY ;
let dx = 10;
let dy = 0;
let changingDir ;
let score = 0;

function main() {
    // Check Game Over Function
    if(isGameOver()) return;

    setTimeout(() => {
        changingDir = false; // Dot allow change direction left <-> right & top <-> button 
        clearCanvas();
        drawFood();
        snakeMove();
        snakeDraw();

        main();
    }, 200);
}

isGameOver = () => {
    // Check coord head snake equal with body snake
    for(let i = 1; i < snake.length ; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            return true ;
        }
    }
    // Check head snake that hit to walls
    return (
        snake[0].x < 0 || 
        snake[0].y < 0 || 
        snake[0].y > gameCanvas.height - 10 || 
        snake[0].x > gameCanvas.width - 10 
    )
}
// For toggle (clear \ create) canvas frame
let clearCanvas = () => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}
// Create num for crate coords
let randomNum = (min, max) => (Math.round((Math.random() * (max - min) + min) / 10)) * 10
let createFood = () => {
    foodX = randomNum(0, gameCanvas.width - 10);
    foodY = randomNum(0, gameCanvas.height - 10);
    console.log(foodX, foodY);
// Check snake eate food
    snake.forEach(snakePart => {
        if (foodX == snakePart.x && foodY == snakePart.y) {
            createFood();
        }
    })
}
// When press key 
document.addEventListener('keydown' , changeDirection)
function changeDirection (event){
    const KEY_TOP = 38;
    const KEY_DOWN = 40;
    const KEY_RIGHT = 39;
    const KEY_LEFT = 37;

    const keyPressed = event.keyCode;

    if(changingDir) return ;
    changingDir = true ; 
    
    switch (keyPressed) {
        case KEY_LEFT :

            if(dx != 10){
                dx = -10;
                dy = 0;
            }
            break;
        case KEY_TOP  :

            if(dy != 10){
                dx = 0;
                dy = -10;
            }
            break;
        case KEY_RIGHT :

            if(dx != -10){
                dx = 10;
                dy = 0;
            }
            
            break;
        case KEY_DOWN :

            if(dy != -10){
                dx = 0;
            dy = 10;
            }
            break;
    
        default:
            break;
    }
}


let snakeMove = () => {
    const headSnake = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(headSnake); //move head of snake
    // Check eat food 
    if(foodX == headSnake.x && foodY == headSnake.y){
        score += 10;
        document.querySelector('#score').innerText = score;
        createFood();
    }else{
        snake.pop(); // move end of snake 
    }
}

let snakeDraw = () => snake.forEach(snakePart => {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
})

let drawFood = () => {
    ctx.fillStyle = '#fc3c63'
    ctx.strokeStyle = 'black';
    ctx.fillRect(foodX, foodY, 10, 10)
}

createFood();
main();