var playerShip, psImage
var enemyShip , esImage
var boss , bossImage 
var enemyGroup
var bossGroup
var beam , beamImage
var PLAY = 1 
var END = 0
var gamestate = PLAY
var blast 
var bar 
var gameOver 
var gameOverImage 
var score = 0 

function preload(){
psImage= loadAnimation("playerImg.png")


esImage= loadImage("enemy.png")


bossImage= loadImage("boss.png")

blast = loadAnimation("explosion.png")

gameOverImage = loadImage("GAMEOVER.png")
}

function setup(){
  createCanvas(400,600)

  playerShip= createSprite(200,500,20,20)
  playerShip.addAnimation(".",psImage)
playerShip.x = 200
 
 playerShip.scale= 0.030
 enemyGroup= new Group()
 bossGroup= new Group()

 bar = createSprite(200,530,400,10)
 
 gameOver= createSprite(200,300)
 gameOver.addImage("seeesh",gameOverImage)
gameOver.scale= 0.8
}


function draw(){
  background("black")
  text("SCORE "+ score,320,50)
  if (gamestate === PLAY){
  drawSprites()
  enemyLoad()
  bossLoad()
  gameOver.visible = false
  if (frameCount % 10 === 0) {
    score = score + 1 
  }
  if(enemyGroup.isTouching(playerShip)){
    score = score - 5
  }
  if (keyDown("left")){
    playerShip.x= playerShip.x-3
  }
  if (keyDown("right")){
    playerShip.x= playerShip.x+3 
  }

  if(keyDown("space")){

    launch()
  }
  
if(enemyGroup.isTouching(bar) ){
  gamestate = END 

}

}
else if(gamestate === END){
 
  bossGroup.destroyEach()

  enemyGroup.destroyEach()



gameOver.visible = true
}

}

function enemyLoad() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
    var enemyShip = createSprite(200,10,10,10);
    enemyShip.x = Math.round(random(0,350));
    enemyShip.addImage(esImage);
    enemyShip.scale = 0.025;
    enemyShip.velocityY = 2;
    
    enemyShip.lifetime= 400
    
    //adjust the depth
    enemyShip.depth = playerShip.depth;
    playerShip.depth = playerShip.depth + 1;
    
    //add each cloud to the group
    enemyGroup.add(enemyShip);
  }
}
function bossLoad() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var boss = createSprite(200,10,10,10);
    boss.x = Math.round(random(0,350));
    boss.addImage(bossImage);
    boss.scale = 0.11;
    boss.velocityY = 1;

 boss.lifetime = 600
    
    
    
    //adjust the depth
    boss.depth = playerShip.depth;
    playerShip.depth = playerShip.depth + 1;
    
    //add each cloud to the group
    bossGroup.add(boss);
  }
}

function launch(){
  beam = createSprite(playerShip.x,playerShip.y-30,5,20)
  beam.shapeColor="red"
beam.velocityY= -4
}
