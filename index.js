window.onload = function () {

  var stage = document.getElementById('stage');
  var ctx = stage.getContext('2d');
  document.addEventListener('keydown', keyPush);


  setInterval(game, 60);

  //velocidade
  const vel = 1;

  /**
   * velocityX = velocidadeX
   * velocityY = velocidadeY
   * pixelX = pixelX
   * pixelY = pixelY
   * sizePixel = tamanho pixel
   * amount = quantidade
   * appleX = appleX
   * appleY = appleY
   */
  var velocityX = velocityY = 0;
  var pixelX = 10;
  var pixelY = 15;
  var sizePixel = 20;
  var amount = 20;
  var appleX = appleY = 15;

  //trail rastro
  var trail = [];
  var  tail = 5;

  function game () {
    pixelX += velocityX;
    pixelY += velocityY;

    if (pixelX < 0) {
      pixelX = amount -1;
    }
    if (pixelX > amount -1) {
      pixelX = 0;
    }
    if (pixelY < 0) {
      pixelY = amount -1;
    }
    if (pixelY > amount-1) {
      pixelY = 0;
    }

    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0, stage.width, stage.height);

    ctx.fillStyle = 'gray';
    ctx.fillRect(appleX*sizePixel, appleY*sizePixel, sizePixel,sizePixel);

    ctx.fillStyle = 'gray';

    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x*sizePixel, trail[i].y*sizePixel, sizePixel ,sizePixel);

      if (trail[i].x == pixelX && trail[i].y == pixelY) 
      {
        velocityX = velocityY = 0;
        tail = 5;
      }

    }

    trail.push({x: pixelX, y:pixelY})
    while (trail.length > tail) {
      trail.shift();
    }

    if (appleX == pixelX && appleY == pixelY) {
      tail++;
      appleX = Math.floor(Math.random()*amount);
      appleY = Math.floor(Math.random()*amount);
    }

  }

  function keyPush (event) {
     switch (event.keyCode) {
       case 37: //left
        velocityX = -vel;
        velocityY = 0;
        break;
      case 38: // up
        velocityX = 0;
        velocityY = -vel;
        break;
      case 39: //right
        velocityX = vel;
        velocityY = 0;
        break;
      case 40: //down
        velocityX = 0;
        velocityY = vel;
        break;

      default:

      break;
    }
  }








}