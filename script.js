
var x = 150;
var y = 100;
var dx = 2;
var dy = 4;
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

function init() {
  height = 800;
  width = 800;
  paddlex = width / 2;
  paddleh = 10;
  paddlew = 100;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  return setInterval(draw, 10); //klic funkcije draw vsakih 10 ms; http://www.w3schools.com/jsref/met_win_setinterval.asp
}




function draw() {
  if (x + dx > width - 10 || x + dx < 7)
    dx = -dx;
  if (y + dy > height - 7 || y + dy < 10)
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
  ctx.rect(paddlex, height - paddleh, paddlew, paddleh);
  ctx.arc(x, y, 10, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  x += dx;
  y += dy;

}
function stop() {
  clearInterval(setInterval);


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
