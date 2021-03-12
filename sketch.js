var obstacle,obstacleGroup,obstacleAnimation;
var brick,brickImage,brickGroup;
var backgroundImg,back1;
var mario,marioAnimation;
var ground;
var gameState = "PLAY";
var score = 0;
var restart,gameover,restartImage,gameoverImage;
function preload() {
 backgroundImg= loadImage("bg.png");
 marioAnimation=loadAnimation("mario00.png","mario02.png","mario03.png")
 obstacleAnimation=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
 brickImage=loadImage("brick.png");
 gameoverImage=loadImage("gameOver.png")
 restartImage=loadImage("restart.png")
 mariodie=loadAnimation("collided.png")
}

function setup(){
imageMode(CENTER);

createCanvas (800,400);

back1=createSprite(600,200);
backgroundImg.resize(1600,400);
back1.addImage(backgroundImg);
back1.velocityX = -4;

ground =createSprite(100,350,100,10);
ground.visible = false;

mario=createSprite(100,310);
mario.addAnimation("Running",marioAnimation);
mario.addAnimation("die",mariodie);
mario.scale=2;
mario.setCollider("rectangle", 0, 0, 20, mario.height);

gameover=createSprite(400,100);
gameover.addImage(gameoverImage)
gameover.visible=false;

restart=createSprite(400,150);
restart.addImage(restartImage)
restart.visible=false;
restart.scale=0.5


obstacleGroup=new Group()
brickGroup=new Group()
}
function draw(){
 if(gameState === "PLAY"){

    score  = score + Math.round(getFrameRate() / 60);

    if( back1.x<0){
        back1.x = back1.width/2;
    }
    if(keyDown("space")&& mario.y>300){
        mario.velocityY=-13
    }
    mario.velocityY += 0.5;

    if(mario.isTouching(brickGroup)){
        brickGroup.destroyEach()
    }

    if(mario.isTouching(obstacleGroup)){
        gameState="END";
        mario.changeAnimation("die",mariodie)
        gameover.visible = true;
        restart.visible = true;
    }

    spwanObstacles();
    bricks();
    drawSprites();

    textSize(20)
    fill ("red");
    text("Score : "+ Math.round(score),500,50);
}
 if(gameState ==="END"){
    back1.velocityX = 0;
 
    console.log("its working");
    brickGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    brickGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)){
        restartGame()
        
    }
   
 
 }
    mario.collide(ground);



}

function spwanObstacles(){
    if(frameCount%200==0){
        obstacle=createSprite(800,320)
        obstacle.addAnimation("obstacles",obstacleAnimation)
        obstacle.velocityX=-4;
        
       obstacle.lifetime=400;
       obstacleGroup.add(obstacle);
    }
}

function bricks(){
    if(frameCount%250==0){
        brick=createSprite(800,Math.round(random(150,250)));
        brick.addImage(brickImage);
        brickGroup.add(brick);

        brick.lifetime=400;
        brick.velocityX=-4; 
    }  
}

function restartGame(){
   gameState="PLAY" ;
   gameover.visible=false
   restart.visible=false
   brickGroup.destroyEach()
   obstacleGroup.destroyEach()
   back1.velocityX=-4
   score=0
}