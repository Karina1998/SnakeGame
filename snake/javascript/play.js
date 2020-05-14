var canvas = document.getElementById("play");
var ctx = canvas.getContext("2d");

var mousepic = new Image();
mousepic.src = "pic/mousepic.png";

var count = 0;
var mouse = {
  x: Math.floor((Math.random() * 30 + 1)) * 30,
  y: Math.floor((Math.random() * 18 + 1)) * 30,
};

var snake = [];
snake[0] = {
  x: 15 * 30,
  y: 10 * 30
};


document.addEventListener("keydown", control);
var direction;
function control(e) {
  if(e.keyCode == 37 && direction != "right")
    direction = "left";
  else if(e.keyCode == 38 && direction != "down")
    direction = "up";
  else if(e.keyCode == 39 && direction != "left")
    direction = "right";
  else if(e.keyCode == 40 && direction != "up")
    direction = "down";
}

function draw() {
ctx.fillStyle ="Slategray";
ctx.fillRect(0,0, 960, 600);

ctx.fillStyle ="DarkSlateGray";
ctx.fillRect(30,30, 900, 540);

ctx.fillStyle = "red"; 
ctx.font = "27px Tahoma";
ctx.fillText(count, 60, 60);
  
ctx.drawImage(mousepic, mouse.x, mouse.y);
  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle ="black";
    ctx.fillRect(snake[i].x, snake[i].y, 30, 30);
  }

  var sX = snake[0].x;
  var sY = snake[0].y;
  if(sX == mouse.x && sY == mouse.y) {
    count++;
    mouse = {
      x: Math.floor((Math.random() * 30 + 1)) * 30,
      y: Math.floor((Math.random() * 18 + 1)) * 30,
    };
    
  } else {
    snake.pop();
  }
  if (sX < 30 || sX > 30 * 30
|| sY < 1 * 30 || sY > 30 * 18){
clearInterval(play);
ctx.fillStyle = "red";
ctx.font = "50px Tahoma";
ctx.fillText('Game Over', 380, 300)    
}
if(direction == "left") sX -= 30;
if(direction == "right") sX += 30;
if(direction == "up") sY -= 30;
if(direction == "down") sY += 30;
let newsnake = {
    x: sX,
    y: sY
  };
function eatself(head, body) {
  for(let i = 0; i < body.length; i++) {
    if(head.x == body[i].x && head.y == body[i].y){
      clearInterval(play);
      ctx.fillStyle = "red";
      ctx.font = "50px Tahoma";
      ctx.fillText('Game Over', 380, 300) 
    }
  }
}
eatself (newsnake, snake);
snake.unshift(newsnake);
}
let play = setInterval(draw, 150);
