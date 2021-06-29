let canvas = document.getElementById("gameSpace");
let ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20,40,50,50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240,120,20,0, Math.PI*2, false);
ctx.fillStyle = "#0000FF";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160,10,100,40);
ctx.strokeStyle = "rgba(0,0,255,0.5)";
ctx.stroke();
ctx.closePath();
