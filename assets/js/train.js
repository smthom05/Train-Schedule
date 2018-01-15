$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCkVVVfQxr1C0Jrk8YQqqJsBI7Dktjmzg",
    authDomain: "train-schedule-901a0.firebaseapp.com",
    databaseURL: "https://train-schedule-901a0.firebaseio.com",
    projectId: "train-schedule-901a0",
    storageBucket: "train-schedule-901a0.appspot.com",
    messagingSenderId: "35308267428"
  };
  firebase.initializeApp(config);

  // Create a variable to store our Firebase Database
  var database = firebase.database();

  // Create our on click function for adding new trains
  $("#submit").on("click", function(event){

    // Add a prevent defalt
    event.preventDefault();

    // Grab the data values from our user inputs
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };

    // Uploads train data to our Firebase database
    database.ref().push(newTrain);

    // Confirm we are getting our new train data
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // Clear our input fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

  });

  // Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

  database.ref().on("child_added",function(childSnapshot, prevChildKey){

    // Confirm we are getting our data
    console.log(childSnapshot.val());

    // Store our info in variables
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Confirm we are getting the values
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // Generate our train frequency
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment().format("HH:mm");

    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(timeDiff);

    var tRemainder = timeDiff % frequency;

    var minutesAway = (frequency - tRemainder);

    var nextArrival = moment().add(minutesAway, "minutes");
        nextArrivalConverted = nextArrival.format("HH:mm");
    // Check our moment data
    console.log(currentTime);

    // Add train data to the HTML table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrivalConverted + "</td><td>" + minutesAway + "</td></tr>")

  });

// console.log($("train-name-input"))
console.log(document.getElementById("train-name-input"))

})
