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
var hexagons;
var chevrons;
var triangles;

var hexCount = 0;
var chevCount = 0;
var triCount = 0;

//init firebase to get all individual logged votes
firebase.initializeApp(config);
var getVotes = firebase.database().ref('answers/');
//when getVotes gets a new value run gotData or errData if there's an error
getVotes.on('value', gotData, errData);
console.log("trying to get data");


function gotData(data){
  //takes the data we got from 'value' and stores it in a var called votes
  //votes = data.val();
  //go through each vote and create shapes for the vote and categorize them into which MA
  data.forEach(function(childSnapshot) {

    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var questionID = childData.questionId;

    //if no array for microaggression instance exists, create one
    if(!votes[questionID]){
      votes[questionID] = [];
    }

    //shapeContainer holds all the votes for that individual MA
    var shapeContainer = votes[questionID];

    if (childData.optionId == "option1") {
      hexCount++;
      var hexagon = createHexagon();
      hexagons.add(hexagon);
      shapeContainer.push(hexagon);

    }
    if (childData.optionId == "option2") {
      chevCount++;
      var chevron = createChevron();
      chevrons.add(chevron);
      shapeContainer.push(chevron);
    }
    if (childData.optionId == "option3") {
      triCount++;
      var triangle = createTrianlge();
      triangles.add(triangle);
      shapeContainer.push(triangle);
    }
  });

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
var direction;
var MARGIN = 1;


function createHexagon(){
  direction = random(0,180);
  var hexagon = createSprite(random(0,width),random(0,height),10, 10);
  hexagon.addAnimation("normal", "assets/js/assets/hex1.png",  "assets/js/assets/hex2.png");
  hexagon.setCollider("circle", -2,2,25);
  hexagon.setSpeed(random(1,2), direction);
  hexagon.scale = 0.4;
  hexagon.mass = hexagon.scale;
  hexagon.restitution = 0.1;
  return hexagon;
}

function createTrianlge(){
  var triangle = createSprite(random(0,width),random(0,height), 10, 10);
  triangle.addAnimation("normal", "assets/js/assets/tri1.png",  "assets/js/assets/tri2.png");
  triangle.setCollider("circle", -2,2,25);
  triangle.setSpeed(random(1,2), random(1, 5));
  triangle.scale = 0.4;
  triangle.mass = triangle.scale;
  triangle.restitution = 0.1;
  return triangle;
}

function createChevron(){
  var chevron = createSprite(random(0,width),random(0,height), 10, 10);
  chevron.addAnimation("normal", "assets/js/assets/chev1.png",  "assets/js/assets/chev2.png");
  chevron.setCollider("circle", -2,2,25);
  chevron.setSpeed(random(1,2), direction);
  chevron.scale = 0.4;
  chevron.mass = chevron.scale;
  chevron.restitution = 0.1;
  return chevron;
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  hexagons = new Group();
  chevrons = new Group();
  triangles = new Group();
}

window.onresize = function() {
  canvas.resize(windowWidth, windowHeight);
};

function draw() {
  background('#EEB9B5');
  textFont("Space Mono");
  textSize(20);
  text("PENTA", 10, 30);
  fill(0, 102, 153);
  if (!hexagons){
    return;
  }
  //shapes bounce against each others and against boxes
  hexagons.bounce(chevrons);
  hexagons.bounce(triangles);
  triangles.bounce(chevrons);

  //all sprites bounce at the screen edges

  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  // s.limitSpeed(2);
  // s.attractionPoint(.2,width/2,height/2);
  //s.friction = 0.95;
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

//when you click on an MA link, filter shapes for the MA to cluster and disperse others
function filterShapes(groupName){
  for (let shapeGroupName in votes) {
    var shapeGroup = votes[shapeGroupName];

    for (var i = 0; i < shapeGroup.length; ++i) {
      console.log(shapeGroup);
      var shape = shapeGroup[i];
      shape.setSpeed(1, 45);
    }
  }

  var shapeContainer = votes[groupName];

  for (var i = 0; i < shapeContainer.length; ++i) {
    var shape = shapeContainer[i];
    shape.setSpeed(4, 90);
  }
}
