var bg, bgImage, bgImage2, gameState;
var marilyn, goal, goalImage;
var obstacleImage;
var wallGroup
var input, button, playerName

function preload() {
  bgImage = loadImage("images/bg.gif");
  bgImage2 = loadImage("images/bg2.gif");
  goalImage = loadImage("images/goal.gif");
  obstacleImage = loadImage("images/obstacle.gif");
}

function setup() {
  createCanvas(400, 400);
  bg = createSprite(200, 200, 400, 400);
  bg.addImage("background", bgImage);
  bg.addImage("background2", bgImage2);
  bg.scale = 0.63;

  
  obstacleGroup =createGroup()
  wallGroup=createGroup()

  

  gameState = "start";
  
  input=createInput("ENTER YOUR NAME")
  input.position(400,200)
  button=createButton("SUBMIT")
  button.position(400,220)
  
}

function draw() {
  background("yellow");

  button.mousePressed(()=>{
    marilyn = createSprite(200, 380, 10, 10);
    goal = createSprite(200, 30, 10, 10);
    goal.addImage("goal", goalImage);
    goal.scale = 0.1;
    for (var i = 0; i < 6; i = i + 1) {
      createObstacles(random(20+i*70,80+i*70),random(80,320));
    }

    button.hide()
    input.hide()
    gameState="play"
    playerName=input.value()

  })

  if (gameState === "play" || gameState === "world1") {
    text(playerName,100,100)
    marilynMovement();

  }
if (gameState==='play'){
  if (marilyn.isTouching(obstacleGroup)||marilyn.isTouching(wallGroup)) {
    gameState = "end";
  }
text(playerName,100,100)
 if (marilyn.isTouching(goal)) {
    gameState = "world1";
    marilyn.x = 10;
    marilyn.y = 380;
  }
}
  
  drawSprites();

  if (gameState === "end") {
    text("GAME OVER", 200, 200);
  }

  

  if (gameState === "world1") {
    bg.changeImage("background2", bgImage2);
    bg.scale = 2;
    obstacleGroup.destroyEach();
    text(playerName,100,100)
    textSize(50)
    createMazeWalls();
  }
}
