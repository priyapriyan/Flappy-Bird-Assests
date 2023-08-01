document.addEventListener("DOMContentLoaded", () => {
    const bird = document.getElementById("bird");
    const pipes = document.getElementById("pipes");
    const scoreDisplay = document.getElementById("score");
    const startBtn = document.getElementById("start-btn");
    let gameInterval;
    let score = 0;
  
    function startGame() {
      startBtn.style.display = "none";
      bird.style.bottom = "50%";
      score = 0;
      scoreDisplay.textContent = score;
  
      bird.style.bottom = "50%";
      let birdBottom = 50;
      let birdVelocity = 0;
      const gravity = 0.25;
      const flapSpeed = -4.5;
      const pipeWidth = 50;
      const pipeHeight = 320;
      const pipeGap = 150;
      const pipeSpacing = 250;
  
      function flap() {
        birdVelocity = flapSpeed;
      }
  
      function createPipe() {
        const pipe = document.createElement("div");
        pipe.classList.add("pipe");
        pipe.style.height = `${pipeHeight}px`;
        pipes.appendChild(pipe);
        return pipe;
      }
  
      function movePipes() {
        const pipesList = Array.from(pipes.children);
        pipesList.forEach((pipe) => {
          const pipeLeft = parseInt(pipe.style.left);
          if (pipeLeft <= -pipeWidth) {
            pipe.remove();
            score += 1;
            scoreDisplay.textContent = score;
          } else {
            pipe.style.left = `${pipeLeft - 1}px`;
          }
        });
      }
  
      function checkCollision() {
        const birdTop = bird.offsetTop;
        const birdBottom = bird.offsetTop + bird.offsetHeight;
        const birdLeft = bird.offsetLeft;
        const birdRight = bird.offsetLeft + bird.offsetWidth;
        const pipesList = Array.from(pipes.children);
        for (let i = 0; i < pipesList.length; i++) {
          const pipe = pipesList[i];
          const pipeTop = pipe.offsetTop;
          const pipeBottom = pipe.offsetTop + pipe.offsetHeight;
          const pipeLeft = pipe.offsetLeft;
          const pipeRight = pipe.offsetLeft + pipe.offsetWidth;
          if (
            birdBottom > pipeTop &&
            birdTop < pipeBottom &&
            birdRight > pipeLeft &&
            birdLeft < pipeRight
          ) {
            return true;
          }
        }
        return birdTop <= 0 || birdBottom >= pipes.offsetHeight;
      }
  
      function gameLoop() {
        birdVelocity += gravity;
        birdBottom -= birdVelocity;
        bird.style.bottom = `${birdBottom}px`;
  
        if (checkCollision()) {
          clearInterval(gameInterval);
          alert("Game Over");
          startBtn.style.display = "block";
        }
  
        movePipes();
      }
  
      gameInterval = setInterval(gameLoop, 1000 / 60);
      document.addEventListener("keydown", flap);
    }
  
    startBtn.addEventListener("click", startGame);
  });
  