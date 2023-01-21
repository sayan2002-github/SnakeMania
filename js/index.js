let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const music = new Audio("music.mp3");
let paintTime = 0;
let speed = 4;
let score = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = { x: 6, y: 10 };


music.play();
// Game Functions
function main(currentTime) {
    window.requestAnimationFrame(main);
    // console.log(currentTime);
    if ((currentTime - paintTime) / 1000 < 1 / speed) {
        return;
    }
    paintTime = currentTime;
    gameEngine();
}

function isColid(arr){
    // If the snake bump into itself
    for(let i=1;i<snakeArray.length;i++){
        if(arr[0].x === arr[i].x && arr[0].y === arr[i].y){
            return true;
        }
    }
     // If the snake bump into the wall
    if(arr[0].x >= 18 || arr[0].x <= 0 || arr[0].y >= 18 || arr[0].y <= 0){
        return true;
    }
    return false;
}

function gameEngine() {
    // Update snake array and food
    if(isColid(snakeArray)){
        gameOverSound.play();
        music.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!! Press any key to restart.");
        snakeArray = [{ x: 13, y: 15 }];
        music.play();
        score = 0;
        scores.innerHTML = "Score: " + score;
    }

    // When the snake ate the food
    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        foodSound.play();
        score += 1;
        scores.innerHTML = "Score: " + score;
        if(score > hiscoreVal){
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
            hiScores.innerHTML = "High Score: " + hiscoreVal;
        }
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    //Moving the snake
    for (let i = snakeArray.length-2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};   
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Display sanke array and food
    board.innerHTML = "";
    //Display the snake
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('snakeHead');
        } else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    })

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snakeFood');
    board.appendChild(foodElement);
}


// Game logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
}else{
    hiscoreVal = JSON.parse(hiscore);
    hiScores.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("Arrow Right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        
        default:
            break;
    }
})