// Set the configuration for your app
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBRCaeKgH9VUtqeDLCHSIlNZUhJ0_GaDqU",
  authDomain: "microjustice-idp.firebaseapp.com",
  databaseURL: "https://microjustice-idp.firebaseio.com",
  projectId: "microjustice-idp",
  storageBucket: "microjustice-idp.appspot.com",
  messagingSenderId: "1031959043789"
};

var hexCount;
var chevCount;
var triCount;
firebase.initializeApp(config);
var getVotes = firebase.database().ref('answer/');
//when getUserId gets a new value run gotData or errData if there's an error
getVotes.on('value', gotData, errData);
console.log("trying to get data");

function preload() {

}

function gotData(data){
  //takes the data we got from 'value' and stores it in a var called users
  votes = data.val();
  console.log(votes.MA0);
  hexCount = votes.MA0.option1.counter;
  chevCount = votes.MA0.option2.counter;
  triCount = votes.MA0.option3.counter;
  console.log(triCount);
  console.log(hexCount);
  if (!shapes){
    initShapes();
  } else {
    //how do i know which shape to add? does firebase let me know which element has updated?
    addShape();
  }
}

function errData(err){
  console.log("Error!");
  console.log(err);
}


//Drawing the shapes
var canvas;
var shapes;
var direction;
var MARGIN = 1;

//Initializes all the shapes based on database
function initShapes() {
  shapes = new Group();
  console.log(hexCount);
  for(var i=0; i<hexCount; i++) {
    direction = random(0,180);
    var circle = createSprite(random(0,width),random(0,height),10, 10);
    circle.addAnimation("normal", "assets/js/assets/hex1.png",  "assets/js/assets/hex2.png");
    circle.setCollider("circle", -2,2,25);
    circle.setSpeed(random(1,2), direction);
    circle.scale = random(0.4, 0.4);
    circle.mass = circle.scale;
    shapes.add(circle);
  }
  for(var i=0; i<chevCount; i++) {
    var chevron = createSprite(random(0,width),random(0,height), 10, 10);
    chevron.addAnimation("normal", "assets/js/assets/chev1.png",  "assets/js/assets/chev2.png");
    chevron.setSpeed(random(1,2), random(1, 5));
    chevron.scale = random(0.4, 0.4);
    chevron.mass = circle.scale;
    shapes.add(chevron);
  }
  for(var i=0; i<triCount; i++) {
    var triangle = createSprite(random(0,width),random(0,height), 10, 10);
    triangle.addAnimation("normal", "assets/js/assets/tri1.png",  "assets/js/assets/tri2.png");
    triangle.setCollider("circle", -2,2,25);
    triangle.setSpeed(random(1,2), random(1, 5));
    triangle.scale = random(0.4, 0.4);
    triangle.mass = circle.scale;
    shapes.add(triangle);
  }
}

function addShape() {
  var circle = createSprite(random(0,width),random(0,height),10, 10);
  circle.addAnimation("normal", "assets/js/assets/oval1.png",  "assets/js/assets/oval2.png");
  circle.setCollider("circle", -2,2,25);
  circle.setSpeed(random(1,2), direction);
  circle.scale = random(0.4, 0.4);
  circle.mass = circle.scale;
  shapes.add(circle);
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

}

window.onresize = function() {
  canvas.resize(windowWidth, windowHeight);
};

function draw() {
  background('#EEB9B5');
  textFont("Space Mono");
  textSize(20);
  text("Microaggression", 10, 30);
  fill(0, 102, 153);
  if (!shapes){
    return;
  }
  //shapes bounce against each others and against boxes
  shapes.bounce(shapes);

  //all sprites bounce at the screen edges

  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<0) {
    s.position.x = 1;
    s.velocity.x = abs(s.velocity.x);
  }

  if(s.position.x>width) {
    s.position.x = width-1;
    s.velocity.x = -abs(s.velocity.x);
    }

  if(s.position.y<0) {
    s.position.y = 1;
    s.velocity.y = abs(s.velocity.y);
  }

  if(s.position.y>height) {
    s.position.y = height-1;
    s.velocity.y = -abs(s.velocity.y);
    }
  }

  drawSprites();

}
