var PLAY = 1;
var END = 0;
var gameState = PLAY;
var pilot,obstacle;
var score=0;
var planelogo


function preload(){
PilotRunning=loadAnimation("Pilot1.png","Pilot2.png","Pilot3.png","Pilot3.png","Pilot4.png","Pilot5.png","Pilot6.png","Pilot7.png","Pilot8.png")
  
  pilothit=loadAnimation("Pilot1.png")
  OiltankImage=loadImage("OilTank.png")
  backgroundImage=loadImage("Airport.jpg")
  planeImage=loadImage("PlaneLogo.png")
  
  gameOverImg = loadImage("Mission Failed.png");
restartImg = loadImage("restart.png");

}

function setup() {
 createCanvas(600,600)
  
  background = createSprite(300,300);
  background.addImage(backgroundImage);
  
invisibleGround=createSprite(300,500,600,10)
  invisibleGround.visible = false;
  
  pilot=createSprite(30,400)
  pilot.addAnimation("moving",PilotRunning)
 pilot.addAnimation("collided",pilothit);
  pilot.scale=0.2
   
  gameOver = createSprite(300,250);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5
  
    restart = createSprite(300,400);
  restart.addImage(restartImg);
  restart.scale=0.3
  
    obstaclesGroup = new Group();
    airplaneGroup= new Group();
  
}

function draw(){
  pilot.setCollider("rectangle", 0, 25, 350, 700);
  //pilot.debug = true;
  background.velocityX = -5
 
 if (gameState===PLAY){
    
   gameOver.visible = false
   restart.visible = false;
    if(keyDown("space") && pilot.y >= 370) {
      pilot.velocityY = -14
  
}
     
  pilot.velocityY = pilot.velocityY + 0.8
  
    if(background.x<0){
    background.x= background.width/2
    }
   pilot.collide(invisibleGround);
   
   if (airplaneGroup.isTouching (pilot)){
     score=score+1
     airplaneGroup.destroyEach();
   }
    
   spawnObstacles();
   spawnLogos();
    if(obstaclesGroup.isTouching(pilot)){
        gameState = END;
    }
  
   
 }
  else if (gameState === END) {
 gameOver.visible = true;
     restart.visible = true;
    background.velocityX=0;
    pilot.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    airplaneGroup.setVelocityXEach(0);
 pilot.changeAnimation("collided",pilothit);
    obstaclesGroup.setLifetimeEach(-1);
     airplaneGroup.setLifetimeEach(-1);
     if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  stroke ("white")
  textSize(20)
  fill ("black")
  text ("Logos: " + score, 450,100)
  
  }
function spawnObstacles() {
  if(frameCount % 180 === 0) {
    var obstacle = createSprite(300,450);
    obstacle.setCollider("circle", 0, 25,150);
     //obstacle.debug = true;
    obstacle.velocityX = -5 ;
    
    obstacle.addImage(OiltankImage);
    obstacle.scale=0.2
    
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }


}
function spawnLogos(){
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var airplane = createSprite(300,100);
   airplane.y = Math.round(random(200,380));
   airplane.addImage(planeImage);
    airplane.scale = 0.1;
    airplane.velocityX = -5;
   
     //assign lifetime to the variable
     airplane.lifetime = 200;
    
    //adjust the depth
   
    
    //add each cloud to the group
   airplaneGroup.add(airplane);
  }
  
}








function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  pilot.changeAnimation("moving",PilotRunning);

  score=0
}