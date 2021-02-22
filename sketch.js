var balloon;
var database, position;
var back, Balloon, Up, Down;

function preload(){

back = loadImage("sprites/Hot Air Ballon-01.png")
Balloon = loadAnimation("sprites/Hot Air Ballon-03.png")
Up = loadAnimation("sprites/Hot Air Ballon-02.png")
Down = loadAnimation("sprites/Hot Air Ballon-04.png")

}

function setup() {

  database = firebase.database();
  console.log(database)

  createCanvas(800,400);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("Balloon", Balloon)
  balloon.scale = 0.4

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", showError)
}

  function draw() {
    background(back); 

  if(keyDown(UP_ARROW)){
        updateHeight(-10,0)     
        balloon.addAnimation("hotAirBalloon",Up)
}   

if(keyDown(DOWN_ARROW)){
        updateHeight(+10,0)
        balloon.addAnimation("hotAirBalloon",Down)

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