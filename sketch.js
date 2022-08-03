var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var gameOverImg,restartImg;
var dieSound
var rmaIMG,rma
var groundIMG,ground
var obstaclesGroup, obstacle1, obstacle2, obstacle3,obstacle4,obstacle
var invtimg
 var rmas
function preload(){
rmaIMG = loadAnimation("rma1.png","rma2.png","rma3.png","rma4.png");
groundIMG = loadImage("track.jpeg");
obstacle1 = loadImage("o1.png")
obstacle3 = loadImage("o3.png")
obstacle4 =  loadImage("o4.png")
restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  dieSound = loadSound("die.mp3")
  invtimg = loadImage("invt.jpeg")
  rmas = loadAnimation("rma1.png")
}

function setup() {
 createCanvas(600,200)
 rma = createSprite(50,175,20,50)
 rma.addAnimation("r",rmaIMG)
 rma.scale =0.1
 ground = createSprite(300,200,2500,50)
 
 invtg = createSprite(300,225,2500,50)
 
 invtg.visible = false
 gameOver = createSprite(300,100,1,15);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5
 restart = createSprite(300,125,15,15)
 restart.addImage(restartImg);
restart.scale = 0.5
 obstaclesGroup = createGroup(obstacle1,obstacle2,obstacle3,obstacle4 );

 rma.setCollider("circle",(0,0,rma.width),rma.height,0);
 
 
 score = 0  
}

function draw() {
 background(255)
 text("Score: "+ score, 500,50)
    drawSprites();
 if(gameState === PLAY){

 gameOver.visible = false;
 restart.visible = false;
        
 ground.velocityX = -(4 + 3* score/100)
 //scoring
 score = score + Math.round(getFrameRate()/60); 
 if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space")&& rma.y >= 150) {
        rma.velocityY = -12;
    }
     //add gravity
     rma.velocityY = rma.velocityY + 0.8
     rma.collide(invtg)
    }
    spawnObstacles();
    if(obstaclesGroup.isTouching(rma)){
        gameState = END;
        dieSound.play()
      
    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       rma.changeAnimation("c",rmas)
       
      
       
       
        ground.velocityX = 0;
        rma.velocityY = 0
      obstaclesGroup.setLifetimeEach(-1);
      
       
       obstaclesGroup.setVelocityXEach(0);
           
     }
     if(mousePressedOver(restart)) {
        reset();
      }
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
   obstaclesGroup.destroyEach();
   rma.changeAnimation("r",rmaIMG);
   score = 0;
  }
function spawnObstacles(){
    if (frameCount % 60 === 0){
     obstacle = createSprite(600,165,50,40);
      obstacle.velocityX = -(6 + score/500);
      
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2:  obstacle.addImage(obstacle3);
                 break;
         case 3: obstacle.addImage(obstacle4);
                 break;
         default: break;
       }
       obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
    obstacle.setCollider("rectangle",3,3,obstacle.width,obstacle.height);
    obstaclesGroup.add(obstacle);
    }
   
    
  
}