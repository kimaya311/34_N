//Create variables here
var dog,happyDog,database,foodS,foodStock;
function preload()
{
  //load images here
dog_image = loadImage("images/dogImg.png");
happyDog  = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,40,40);
  dog.scale =0.6;
  dog.addImage("dog",dog_image);
  dog.addImage("doggy",happyDog);
  database = firebase.database();
  foodStock =database.ref('food');
  foodStock.on("value",readStock);
}

function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
 // foodS=foodS-1;
  dog.changeImage("doggy",happyDog);
}
if(keyWentUp(UP_ARROW)){
  dog.changeImage("dog",dog_image);
}
  drawSprites();
   //add styles here
 fill("white");
 stroke("white");
 text("Food remaining: "+foodS,150,180,textSize(16));
 text("Note:Press UP ARROW key to feed Drago milk!",50,40,textSize(20));

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
 if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}


