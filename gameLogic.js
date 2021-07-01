let canvas = document.getElementById("gameSpace");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;




const DrawBall = () => 
{
    ctx.beginPath()
    ctx.arc(x,y, ballRadius,0, Math.PI*2);
    ctx.fillStyle= "#0095DD"
    ctx.fill();
    ctx.closePath();
}


const Draw= () =>
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    DrawBall();

    if(y + dy < ballRadius)
    {
        dy=-dy;
    }

    if(x + dx < ballRadius)
    {
        dx=-dx;
    }

    if(y + dy > canvas.height-ballRadius)
    {
        dy= -dy;
    }
    if(x + dx > canvas.width-ballRadius)
    {
        dx= -dx;
    }

        x+=dx
        y+=dy
}

setInterval(Draw, 10)