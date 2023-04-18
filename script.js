
var x = 400;
var y = 775;
var dx = 2;
var dy = -5;
var ctx;
var canvas;
var height;
var width;
var paddlex;
var paddleh;
var paddlew;
var canvasMinX;
var canvasMaxX;
var rightDown;
var leftDown;
var interval;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

function init() {
  height = 800;
  width = 800;
  paddlew = 100;
  paddlex = (width/2)-(paddlew/2);
  paddleh = 10;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  return interval= setInterval(draw, 10); //klic funkcije draw vsakih 10 ms; http://www.w3schools.com/jsref/met_win_setinterval.asp
}




function draw() {
  if (x + dx > width - 10 || x + dx < 7)
    dx = -dx;
  if ( y + dy < 10)
    dy = -dy;
  
    
  ctx.clearRect(0, 0, height, width);

  
  
  

  //premik ploščice z tipkovnico
  if(paddlex < width && paddlex >0){
    if (rightDown && paddlex + paddlew < width) paddlex += 10;
    else if (leftDown && paddlex >0) paddlex-=10;
  }
  else{
    if (rightDown && paddlex + paddlew < width) paddlex += 10;
    else if (leftDown && paddlex >0) paddlex-=10;
  }


  ctx.beginPath();
  ctx.rect(paddlex, height - paddleh-5, paddlew, paddleh);
  ctx.arc(x, y, 10, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  x += dx;
  y += dy;



  if (y + dy < 7)
    dy = -dy;
  else if (y + dy > height-7) {
  if (x > paddlex && x < paddlex + paddlew)
    dx = 9 * ((x-(paddlex+paddlew/2))/paddlew);
  else if(y + dy > height - 8)
    stop();
    dy = -dy;
  }
  
   
}
function stop() {
  clearInterval(interval);
  

}

function onKeyDown(evt) {
  if (evt.keyCode == 39)
    rightDown = true;
  else if (evt.keyCode == 37) 
    leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39)
    rightDown = false;
  else if (evt.keyCode == 37) 
    leftDown = false;
}

init();
init_mouse(); 
$(document).mousemove(onMouseMove); 
$(document).keyup(onKeyUp); 
$(document).keydown(onKeyDown); 


// premikanje ploščka z miško
function init_mouse() {
  //canvasMinX = $("#canvas").offset().left;
  canvasMinX = $("canvas").offset().left+ paddlew/2;
  canvasMaxX = canvasMinX + width - paddlew;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}


//inicializacija opek - polnjenje v tabelo
function initbricks() { 
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

initbricks();




/*

function draw() {
  ctx.clearRect(0,0,height,width);
  
  
  ctx.rect(paddlex, height-paddleh, paddlew, paddleh);

  if (x + dx > width-10 || x + dx < 7)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > height-7) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval(setInterval);
  }

  x += dx;
  y += dy;
}

*/
