var balloon;
var database, height;
var back, Balloon;

function preload(){

back = loadImage("sprites/Hot Air Ballon-01.png")
Balloon = loadAnimation("sprites/Hot Air Ballon-03.png", "sprites/Hot Air Ballon-04.png", "sprites/Hot Air Ballon-02.png")

}

function setup() {

  database = firebase.database();
  console.log(database)

  createCanvas(800,400);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("Balloon", Balloon)
  balloon.scale = 0.4

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError)
}

  function draw() {
    background(back); 

  if(keyDown(UP_ARROW)){
        updateHeight(0,-10)     
       // balloon.addAnimation("Balloon", Balloon)
        balloon.scale-=0.005
}   

if(keyDown(DOWN_ARROW)){
        updateHeight(0,+10)
        //balloon.addAnimation("Balloon", Balloon)
        balloon.scale+=0.005

}

      if(keyDown(RIGHT_ARROW)){
        updateHeight(+10,0)     
}   

if(keyDown(LEFT_ARROW)){
        updateHeight(-10,0)

}
    
  drawSprites();
}

function updateHeight(x,y){

database.ref('balloon/height').set({
'x': height.x + x,
'y': height.y + y
  })

}

function readHeight(data){
    height = data.val();
    balloon.x = height.x;
    balloon.y = height.y;

}

function showError(){

  console.log("Error in writing to the database");
}
