//Create variables here
var dog,happyDog,database,foodS,foodStock
var dogImage,happyDogImage

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  //create the sprite"dog"
  dog = createSprite(250,250,70,50);
  dog.addImage(dogImage);
  dog.addImage(happyDogImage);
  dog.scale = 0.2;
  
  //Creating the database
  database = firebase.database();

  //Creating the varible foodstock
  foodStock=database.ref('Food');
  foodStock.on("value", readStock)

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.changeImage(happyDogImage);
  }

  drawSprites();

  //add styles here
  textSize(15);
  fill(0,0,0);
  stroke(1);
  text("Note:Press The UP_ARROW key To Feed Drago Milk",60,20);
  text("Food Remaining: "+foodS,175,150)
}

//function to read values from database
function readStock(data)
{
  foodS=data.val();
}

//function to write values from database
function writeStock(x) 
{
  if(x<0){
  x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}