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

firebase.initializeApp(config);

//variables
var uid;
var ma_id = 1;

//checks if the user is logged in or not.
firebase.auth().onAuthStateChanged(function(user) {
  // if user is true user is signed in
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    console.log("user is logged in : " + uid);
  } else {
    // if user is not true, user is not signed in, and we'll creat a new anonymous user
    console.log("user is not logged in");
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
});

//functiom for posting to the database
function hexToFirebase(){
  //store the values from the comment box as textToPost
  //var voteToPost = document.getElementById("hexagon");
  // "push" content to firebase under users/the user id/comments
  // this creates a new entry in the database with a timestamp
  // What we want to put on the database needs to be formatted as JSON
  firebase.database().ref('microaggression/' + ma_id).push({
    hexagon: 1
  });
  // after we've pushed to th FB database we'll reset the form.
  // $('input[type="text"], textarea').val('');
}

function triToFirebase(){
  firebase.database().ref('microaggression/' + ma_id + '/count').push({
    triangle: 1
  });
}

function chevToFirebase(){
  firebase.database().ref('microaggression/' + ma_id + '/count').push({
    chevron: 1
  });
}
