window.onload = function () {
  var stage = document.getElementById('stage');
  var ctx = stage.getContext('2d');
  document.addEventListener('keydown', keyPush);

  setInterval(game, 60);

  // Velocidade
  const vel = 1;

  // Variáveis de posição do pixel
  var velocityX = velocityY = 0;
  var pixelX = 10;
  var pixelY = 15;
  var sizePixel = 20;
  var amount = 20;
  var appleX = appleY = 15;

  // Rastro do pixel
  var trail = [];
  var tail = 5;

  // Função principal do jogo
  function game() {
    pixelX += velocityX;
    pixelY += velocityY;

    // Verificar se o pixel saiu da área de jogo e corrigir sua posição
    if (pixelX < 0) {
      pixelX = amount - 1;
    }
    if (pixelX > amount - 1) {
      pixelX = 0;
    }
    if (pixelY < 0) {
      pixelY = amount - 1;
    }
    if (pixelY > amount - 1) {
      pixelY = 0;
    }

    // Limpar o canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, stage.width, stage.height);

    // Desenhar a maçã
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * sizePixel, appleY * sizePixel, sizePixel, sizePixel);

    // Desenhar o pixel e verificar colisões
    ctx.fillStyle = 'green';
    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * sizePixel, trail[i].y * sizePixel, sizePixel, sizePixel);

      // Verificar colisão com o próprio rastro
      if (trail[i].x === pixelX && trail[i].y === pixelY) {
        velocityX = velocityY = 0;
        tail = 5;
      }
    }

    // Adicionar posição atual do pixel ao rastro
    trail.push({ x: pixelX, y: pixelY });

    // Reduzir o tamanho do rastro para o tamanho correto
    while (trail.length > tail) {
      trail.shift();
    }

    // Verificar se houve colisão com a maçã e aumentar o tamanho do rastro
    if (appleX === pixelX && appleY === pixelY) {
      tail++;
      appleX = Math.floor(Math.random() * amount);
      appleY = Math.floor(Math.random() * amount);
    }
  }

  // Função para tratar eventos de teclado
  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // Esquerda
        velocityX = -vel;
        velocityY = 0;
        break;
      case 38: // Cima
        velocityX = 0;
        velocityY = -vel;
        break;
      case 39: // Direita
        velocityX = vel;
        velocityY = 0;
        break;
      case 40: // Baixo
        velocityX = 0;
        velocityY = vel;
        break;

      default:
        break;
    }
  }
}
