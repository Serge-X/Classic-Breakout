let canvas = document.getElementById("gameSpace");
let ctx = canvas.getContext("2d");

//Ball
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

// Paddle
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

//keyboard inputs
let rightPressed = false;
let leftPressed = false;

// Brick
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 5;
let brickOffsetTop = 30;
let brickOffsetLeft = 10;

// sets up the bricks position
let bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1 };
    }
}




const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status==1){
            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

const drawBall = () => {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const keyDownHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;

    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

const keyUpHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;

    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


const collisionDetection = ()  =>
    {
        for (let c = 0; c < brickColumnCount; c++) 
        {
            for (let  r= 0; r < brickRowCount; r++) 
                {
                    let b = bricks[c][r];
                    // calculation 
                    if(b.status==1){
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) 
                        {
                            dy =-dy;
                            b.status=0;
                        }
                    }
                }
        }
    }

const draw = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {   // Check to see if ball is touching paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else // if ball goes passed paddle it is game over
        {
            alert("GAME OVER!!");
            document.location.reload();
            clearInterval(interval);
        }
    }

    // check if paddle is pressed
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }

    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    x += dx
    y += dy
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw, 10);