const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')

let gameOn = false

let score = 0

let obstacleArray = []

let animationId
let obstacleId

const background = new Image()
background.src = './images/bg.png'

const fabbyImg = new Image()
fabbyImg.src = './images/flappy.png'

const obstacleTopImg = new Image()
obstacleTopImg.src = './images/obstacle_top.png'

const obstacleBottomImg = new Image()
obstacleBottomImg.src = './images/obstacle_bottom.png'

const fabby = {
  x: 400,
  y: 200,
  width: 80,
  height: 56,
  speedY: 0,
  gravity: .1,
  // gravitySpeed: 0,

  update() {
    if (this.y + this.height >= canvas.height) {
        this.y -= 20
      }
    if (this.y <= 0) {
        this.y += 20
      }
    if (this.speedY < 8) { 
        this.speedY += this.gravity
      } else {
        this.speedY = this.speedY
      }
    this.y += this.speedY
    ctx.drawImage(fabbyImg, this.x, this.y, this.width, this.height)
    },

  newPostion(event) {

    switch (event.code) {
      case 'ArrowLeft':
        this.x -= 6
        break;
      case 'ArrowRight':
        this.x += 6
        break;
      case 'Space':
        if (this.speedY > -5){
        this.speedY -= 1}
        break;
    }

  }

}


class Obstacle {

  constructor() {
    this.x = canvas.width;
    this.gap = 200;
    this.y = Math.random() * (canvas.height - this.gap);
    this.bottomY = this.y + this.gap;
    this.width = 138;

  }

  update() {
    this.x -= 2
  }

  draw() {
    ctx.drawImage(obstacleTopImg, this.x, this.y - obstacleTopImg.height)
    ctx.drawImage(obstacleBottomImg, this.x, this.bottomY)
  }

}

function generateObstacles () {
  
  obstacleArray.push(new Obstacle())
  
}

function gameOver() {
  clearInterval(animationId)
  clearInterval(obstacleId)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'
  ctx.font = '40px Arial'

  if (score > 2) {
    ctx.fillText('You win', 450, 250)
    ctx.font = '32px Arial'
    ctx.fillText(`Final Score: ${score}`, 450, 350)


  } else {

    ctx.fillText('You lose', 450, 250)
    ctx.font = '32px Arial'
    ctx.fillText(`Final Score: ${score}`, 450, 350)

  }




  obstacleArray = []
  fabby.x = 400
  fabby.y = 200
  fabby.speedY = 0

  gameOn = false

  score = 0

  console.log('game over')

}



function checkCollision(object) {

  
  if (fabby.x < object.x + object.width &&
    fabby.x + fabby.width > object.x)
    
    {
    if  (fabby.y <= object.y) {
      fabby.y += 20
    }
    if (fabby.y + fabby.height >= object.bottomY) {
      fabby.y -= 20
    }
  }

  if (fabby.x < object.x + object.width &&
    fabby.x + fabby.width > object.x && 
    !
    (
      fabby.y > object.y &&
      fabby.y + fabby.height < object.bottomY
    )   
    ) {
    gameOver()
  }
}


function animationLoop() {

  ctx.clearRect(0, 0, 1200, 600)
  ctx.drawImage(background, 0, 0, 1200, 600)


  // fabby.update()
  
  // obstacleArray.forEach((obstacle, i, arr) => {
  //   obstacle.update()
  //   obstacle.draw()
  //   checkCollision(obstacle)
  //   if (obstacle.x + obstacle.width < 0) {
  //     arr.splice(i, 1)
  //   }
  // })

  for (let i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].update()
    obstacleArray[i].draw()
    checkCollision(obstacleArray[i])
    if (obstacleArray[i].x + obstacleArray[i].width < 0) {
      score += 1
      obstacleArray.splice(i, 1)
    }
  }

  fabby.update()

  ctx.fillStyle = 'black'
  ctx.fillRect(20, 20, 100, 50)
  ctx.fillStyle = 'white'
  ctx.font = '15px Arial'
  ctx.fillText(`Score: ${score}`, 30, 50)
  
}



function startGame() {

  gameOn = true

  animationId = setInterval(animationLoop, 16)
  obstacleId = setInterval(generateObstacles, 4000)

}


window.onload = function() {
  document.getElementById("start-button").onclick = function() {

    if (!gameOn) {
      
      let logo = document.getElementById('logo')
      logo.style.visibility = 'hidden'
      logo.style.height = '0px'
  
      let container = document.getElementById('game-board')
      container.style.visibility = 'visible'
      container.style.height = '600px'
  
      let gameBoard = document.getElementById('my-canvas')
      gameBoard.height = '600'
      gameBoard.width = '1200'
  
      startGame();

    }
  };

  document.addEventListener("keydown", (event) => {
    event.preventDefault()
    if (gameOn) {
      fabby.newPostion(event)
    }

  });


};