let canvas = document.getElementById("gameSpace");
let ctx = canvas.getContext("2d");

//Ball
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

// Paddle
let paddleHeight= 10;
let paddleWidth= 75;
let paddleX = (canvas.width-paddleWidth)/2;

//keyboard inputs
let rightPressed = false;
let leftPressed = false;




const drawBall = () => 
{
    ctx.beginPath()
    ctx.arc(x,y, ballRadius,0, Math.PI*2);
    ctx.fillStyle= "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () =>
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle ="#0095DD";
    ctx.fill();
    ctx.closePath();
}

const keyDownHandler= (e) =>
{
    if (e.key == "Right" || e.key == "ArrowRight") 
    {
        rightPressed=true;

    } else if(e.key == "Left" || e.key == "ArrowLeft")
            {
                leftPressed= true;
            }
}

const keyUpHandler= (e) =>
{
    if (e.key == "Right" || e.key == "ArrowRight") 
    {
        rightPressed=false;

    } else if(e.key == "Left" || e.key == "ArrowLeft")
            {
                leftPressed= false;
            }
}

const draw= () =>
{
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    drawBall();
    drawPaddle();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius)
        {   // Check to see if ball is touching paddle
            if (x> paddleX && x < paddleX + paddleWidth) 
            {
                dy=-dy   
            } else // if ball goes passed paddle it is game over
            {
                alert("GAME OVER!!");
                document.location.reload();
                clearInterval(interval);
            }
        }

    // check if paddle is pressed
    if (rightPressed) 
    {
        paddleX += 7;
        if(paddleX + paddleWidth > canvas.width)
            {
                paddleX= canvas.width - paddleWidth;
            }

    } else if (leftPressed)
    {
        paddleX-= 7;
        if(paddleX < 0)
        {
            paddleX =0;
        }
    }

    x+=dx
    y+=dy
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval= setInterval(draw, 10);