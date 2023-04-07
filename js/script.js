
const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')
let gameOn = false
let animationId

const background = new Image()
background.src = '../images/bg.png'

const fabbyImg = new Image()
fabbyImg.src = '../images/flappy.png'

const fabby = {
  x: 600,
  y: 300,
  width: 0,
  height: 0,
  speedX: 0,
  speedY: 0,
  gravity: 0,
  gravitySpeed: 0,

  update(){
    ctx.drawImage(fabbyImg, this.x, this.y, this.width, this.heigth)
  },
  
  newPosition() {
    
  }
}



function animationLoop() {
  ctx.clearRect(0, 0, 1200, 600)
  ctx.drawImage(background, 0, 0, 1200, 600)

}

function startGame() {
  gameOn = true
  animationId = setInterval(animationLoop, 16)

  console.log('starting')
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

};
