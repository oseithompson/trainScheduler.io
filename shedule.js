  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDzB9h7TBUO_Ns0GMUA60K0uaAuxrC2DG4",
    authDomain: "my-new-project-52ea9.firebaseapp.com",
    databaseURL: "https://my-new-project-52ea9.firebaseio.com",
    projectId: "my-new-project-52ea9",
    storageBucket: "my-new-project-52ea9.appspot.com",
    messagingSenderId: "754598554443"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Button for adding Name and Schedule
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();
      console.log("hello")

  // Grabs User Input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#train-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
      "train": trainName,
      "destination": destination,
      "time": trainTime,
      "frequency": frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  //Logs everything to the console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    // Calculate the next arrival

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td" + timePretty + "</td><td>" + frequency + "</td></tr>");
});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().age);
    console.log(snapshot.val().comment);

    // Change the HTML to reflect
    $("#trainName-display").text(snapshot.val().trainName);
    $("#destination-display").text(snapshot.val().destination);
    $("#time-display").text(snapshot.val().time);
    $("#frequency-display").text(snapshot.val().frequency);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });