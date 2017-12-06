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

// Global count variables for shapes

//votes contains the arrays which hold each microaggression and their related votes
var votes = {};
var shapes;
var currentGroup;
var hexCount = 0;
var chevCount = 0;
var triCount = 0;

//init firebase to get all individual logged votes
firebase.initializeApp(config);
var getVotes = firebase.database().ref('answers/');
//when getVotes gets a new value run gotData or errData if there's an error
//getVotes.on('value', gotData, errData);
console.log("trying to get data");
getVotes.on('child_added', newData, errData);

function newData(snapshot,prevChildKey) {
  var newPost = snapshot.val();
  var newShape = newPost.optionId;
  var questionID = newPost.questionId;
  console.log(newPost);
  console.log(newShape);

  if(!votes[questionID]){
    votes[questionID] = [];
  }
  var shapeContainer = votes[questionID];

  if (newShape == "option1") {
    hexCount++;
    var hexagon = createHexagon();
    shapes.add(hexagon);
    shapeContainer.push(hexagon);

  }
  if (newShape == "option2") {
    chevCount++;
    var chevron = createChevron();
    shapes.add(chevron);
    shapeContainer.push(chevron);
  }
  if (newShape == "option3") {
    triCount++;
    var triangle = createTrianlge();
    shapes.add(triangle);
    shapeContainer.push(triangle);
  }

console.log(hexCount);
console.log(chevCount);
console.log(triCount);
}

function errData(err){
  console.log("Error!");
  console.log(err);
}


//Drawing the shapes
var canvas;
var filterOn = false;
var direction;
var MARGIN = 1;


function createHexagon(){
  direction = random(0,180);
  var hexagon = createSprite(random(0,width),random(0,height),10, 10);
  hexagon.addAnimation("normal", "assets/js/assets/hex1.png",  "assets/js/assets/hex2.png");
  hexagon.setCollider("circle", -2,2,30);
  hexagon.setSpeed(random(1,2), direction);
  hexagon.scale = 0.4;
  hexagon.mass = hexagon.scale;
  //hexagon.restitution = 0.1;
  return hexagon;
}

function createTrianlge(){
  var triangle = createSprite(random(0,width),random(0,height), 10, 10);
  triangle.addAnimation("normal", "assets/js/assets/tri1.png",  "assets/js/assets/tri2.png");
  triangle.setCollider("circle", -2,2,30);
  triangle.setSpeed(random(1,2), random(1, 5));
  triangle.scale = 0.4;
  triangle.mass = triangle.scale;
  //triangle.restitution = 0.1;
  return triangle;
}

function createChevron(){
  var chevron = createSprite(random(0,width),random(0,height), 10, 10);
  chevron.addAnimation("normal", "assets/js/assets/chev1.png",  "assets/js/assets/chev2.png");
  chevron.setCollider("circle", -2,2,25);
  chevron.setSpeed(random(1,2), direction);
  chevron.scale = 0.4;
  chevron.mass = chevron.scale;
  //chevron.restitution = 0.1;
  return chevron;
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  hexagons = new Group();
  chevrons = new Group();
  triangles = new Group();
  shapes = new Group();
}

window.onresize = function() {
  canvas.resize(windowWidth, windowHeight);
};

function draw() {
  background('#EEB9B5');
  // textFont("Space Mono");
  // textSize(20);
  // text("PENTA", 10, 30);
  // fill(0, 102, 153);
  if (!shapes){
    return;
  }
  //shapes bounce against each others and against boxes
  if (!filterOn) {
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
  } else {
    noFill();
    strokeWeight(4);
    rect(width/3-225, height/3-225, 500, 500);
  }
  drawSprites();

}
var cast = {
}


//when you click on an MA link, filter shapes for the MA to cluster and disperse others
function filterShapes(groupName){
  currentGroup = groupName;
  filterOn = true;
  //for all shapes disperse them
  for (let shapeGroupName in votes) {
    var shapeGroup = votes[shapeGroupName];
    for (var i = 0; i < shapeGroup.length; ++i) {
      var shape = shapeGroup[i];
      var dir = shape.getDirection();
      shape.setSpeed(1,dir);
    }
  }

  var shapeContainer = votes[groupName];
  //shapeContainer.collide(shapeContainer);
  var lineheight = 0;

  for (var i = 0; i < shapeContainer.length; ++i) {
    var shape = shapeContainer[i];
    TweenMax.to(shape.position, 5, {x: width/3, y: height/3, ease: Back.easeOut});
    TweenMax.to(shape, 1.5, {rotation: 0, ease: Back.easeOut});
    TweenMax.to(shape.velocity, 1, {x:0, y:0, ease: Back.easeOut});
  }

  //align shapes into rectangle

}
