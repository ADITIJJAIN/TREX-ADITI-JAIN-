var  PLAY=1
var END=0
var gamestate=PLAY

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score=0
var obstaclegroup;
var cloudgroup;

var restart;
var gameover;
var restartimg;
var gameoverimg

var checkpoint;
var die;
var jump;




function preload(){

  checkpoint=loadSound("checkpoint.mp3")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")

  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
 
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");

  restartimg=loadImage("restart.png");
  gameoverimg=loadImage("gameOver.png");
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite(60,height-100,20,50);
  trex.addAnimation("running", trex_running);
  
  trex.addAnimation("collide",trex_collided)
  trex.scale = 0.5;

  


  
  //create a ground sprite
  ground = createSprite(width/2,height-70,width,20);
  ground.addImage("ground",groundImage);
  
  
  //creating invisible ground
  invisibleGround = createSprite(width/2,height-50,width,10);
  invisibleGround.visible = false;

  //restart and gameover
  restart=createSprite(width/2,height/2)
  restart.addImage(restartimg)
  gameover=createSprite(width/2,height/2-50)
  restart.scale=0.3
  gameover.scale=2
gameover.addImage(gameoverimg)
  obstaclegroup=createGroup()
cloudgroup=createGroup()

  
  
  //generate random numbers
  //var rand =  Math.round(random(1,100))
 // console.log(rand)

 trex.setCollider("circle",0,0,40)
 trex.debug=true

}

function draw() {
  //set background color
  background(180);

  text(" score: " +score,500,50)

  if(gamestate===PLAY){

        restart.visible=false
        gameover.visible=false

        console.log(frameCount);

        ground.x = ground.width /2;
  ground.velocityX =-(6+3*score/100)
  
  score=score+Math.round(getFrameRate()/60)

       if(score>0 && score%100===0){
        checkpoint.play()
       }

        // jump when the space key is pressed
        if(keyDown("space")&& trex.y >= height-120  ||  touches.length>0) {
          jump.play()
         
          trex.velocityY = -10;
          touches=[]
        }
        
        trex.velocityY = trex.velocityY + 0.8
        
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
        
        //stop trex from falling down
        
        
        //Spawn Clouds
        spawnClouds()
      
        //obstacles
        obstacles()

        if(obstaclegroup.isTouching(trex)){
          die.play()
                gamestate=END
        }
        
 }


 else if(gamestate===END){
    ground.velocityX=0

    restart.visible=true
    gameover.visible=true

    trex.changeAnimation("collide",trex_collided.png)

    obstaclegroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)

    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
    
   if(mousePressedOver(restart) || touches.length>0){
    touches=[]
    Reset()
   }
 }

  




  
 trex.collide(invisibleGround);
 drawSprites();
  
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if(frameCount%60===0){
  cloud=createSprite(width,height-300,40,10);
  cloud.y=Math.round(random(100,200));
 cloud.velocityX=-3;
 cloud.addImage(cloudImage);
 cloud.scale=0.4;
 cloud.lifetime=300
 cloud.depth=trex.depth
 trex.depth=trex.depth+1
 cloudgroup.add(cloud)
 }
}



function obstacles(){

if(frameCount%100===0){
  obstacle=createSprite(width/2,height-80,width,10)
obstacle.velocityX=-(6+3*score/100)
var no=Math.round(random(1,6))
switch(no){
case 1: obstacle.addImage(obstacle1)
        break;
case 2: obstacle.addImage(obstacle2)
        break;
case 3: obstacle.addImage(obstacle3)
        break;

case 4: obstacle.addImage(obstacle4)
        break;

case 5: obstacle.addImage(obstacle5)
        break;

case 6: obstacle.addImage(obstacle6)
        break;

default:break;

}


obstacle.scale=0.5
obstacle.lifetime=300
obstaclegroup.add(obstacle)
}
}

function Reset(){

  gamestate=PLAY
  gameover.visible=false
  restart.visible=false

  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  score=0
}
























