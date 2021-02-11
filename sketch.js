var monkey, monkeyrunning;
var banana, bananaimage, obstacle, obstacleimage, ground, groundimage;
var foodgroup, obstaclegroup;
var score = 0;

function preload(){
  monkeyrunning = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("obstacle.png");
  
}

function setup(){  
  var survivaltime = 0;
  
  monkey = createSprite(80, 320, 20, 20);
  monkey.addAnimation("moving", monkeyrunning);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 405, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;
  
  foodgroup = new Group();
  obstaclegroup = new Group();
  
  
}

function draw(){
  background("lightblue");
  
  if(ground.x < 0){
    ground.x = ground.width / 2;
    
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
    
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  createfood();
  createobstacles();
  
  drawSprites();
  
  text("Score :" + score, 500, 50)
  
  if(obstaclegroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    foodgroup.setVelocityXEach(0);
    
    obstaclegroup.setLifetimeEach(-1);
    foodgroup.setLifetimeEach(-1);
    
  }
  
  if(foodgroup.isTouching(monkey)){
    foodgroup.destroyEach();
    
  }
  
  survivaltime = Math.ceil(frameCount/frameRate())
  text("Survival Time :" + survivaltime, 100, 50);
  
}

function createfood(){
  if(frameCount % 80 === 0){
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;
    banana.lifetime = 300;
    
    monkey.depth = banana.depth + 1;
    
    banana.addImage(bananaimage);
    banana.scale = 0.05;
    
    foodgroup.add(banana);
    
  }
  
}

function createobstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(800, 375, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    
    obstaclegroup.add(obstacle);
    
  }
  
}