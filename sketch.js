var tower, towerImg
var door, doorImg, doorsGroup
var climber, climberImg, climberGroup
var ghost, ghostImg
var ib, ibGroup
var gameState = "Play"
var ing
var spooky





function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-jumping.png")
  spooky = loadSound("spooky.wav")

}



function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300, 100, 100);
  tower.addImage(towerImg);
  tower.velocityY = 1;


  doorsGroup = new Group();
  climberGroup = new Group();
  ibGroup = new Group();
  
  ghost = createSprite(300,300,100,100);
  ghost.addImage(ghostImg)
  ghost.scale = 0.5
  
  ing = createSprite(300,400,100,20)
  ing.visible = false
  
  ghost.debug = false
  ghost.setCollider("rectangle",0,0,185,150)
}




function draw() {
  background("white");
  if(gameState === "Play") {
    spooky.loop();
    ghost.collide(ing)
  
  if (tower.y > 500) {
    tower.y = 300;

  }

  
  if(keyDown("space")) {
    ghost.velocityY = -6;
    ing.destroy();
    
    
    
  }
  
  if(keyDown("left")) {
    ghost.x = ghost.x -3
    
    
  }
  
  if(keyDown("right")) {
    
    ghost.x = ghost.x +3
  }
  ghost.velocityY = ghost.velocityY + 0.5
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
 if(ibGroup.isTouching(ghost) || ghost.y > 600) {
   ghost.destroy();
   gameState = "end"
   
   
 }
  spawnDoors();

  drawSprites();
}

if(gameState === "end") {
  textSize (30)
  text("Game Over", 300,150)
  
}
}

function spawnDoors() {
  if (frameCount % 250 === 0) {
    door = createSprite(300, 100, 100, 100);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(100, 500));
    door.lifetime = 600;
    doorsGroup.add(door);
  
    climber = createSprite(300, 170, 100, 100);
    climber.addImage(climberImg);
    climber.x = door.x;  
    climber.velocityY = 1;
    climber.lifetime = 600;
    climberGroup.add(climber);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth +1;
    ib = createSprite(200,170,50,2)
    ib.width = climber.width
    ib.x = door.x
    ib.velocityY = 1;
    ibGroup.add(ib);
    ib.visble = false  
  }


}