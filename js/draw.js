
var drawModule = (function () {

  var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var point = function(x, y) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'black';
    ctx.font = "italic 13pt Arial";
    ctx.fillText(score_text, 245, h-5);
  }

  var drawSnake = function() {
      var length = 2;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i*20, y:20});
      }
  }

  var paint = function(){
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, w, h);
      btn.setAttribute('disabled', true);
      snakeX = snake[0].x;
      snakeY = snake[0].y;
      switch ( direction ) {
          case 'left':
                if(speedX == 0){
                  speedY = 0;
                  speedX = -1;
                }
              break;
          case 'right':
                if(speedX == 0){
                  speedY = 0;
                  speedX = 1;
                }
              break;
          case 'down':
                if(speedY == 0){
                  speedX = 0;
                  speedY = 1;
                }
              break;
          case 'up':
                if(speedY == 0){
                  speedX = 0;
                  speedY = -1;
                }
              break;
      }
      snakeX +=speedX;
      snakeY += speedY;

      if (snakeX < 0 || snakeY < 0 || snakeX == w/snakeSize || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {

          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);

          if(score > record) record = score;
          document.getElementById('record').innerHTML = "Record: " + record;
          gameloop = clearInterval(gameloop);
          return;
        }

        if(snakeX == food.x && snakeY == food.y) {
          var tail = {x: snakeX, y: snakeY};
          score ++;

          createFood();
        } else {
          var tail = snake.pop();
          tail.x = snakeX;
          tail.y = snakeY;
        }
        snake.unshift(tail);

        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        }

        point(food.x, food.y);
        scoreText();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      }
      return false;
  }

  var init = function(){
      score = 0;
      direction = 'right';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 100);
  }
    return {
      init : init
    };
}());
