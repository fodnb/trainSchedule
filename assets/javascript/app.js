var config = {
    apiKey: "AIzaSyDyYbQVRpFHVL755gd4ecHaLmpqywTbuVE",
    authDomain: "trainhw-7a55e.firebaseapp.com",
    databaseURL: "https://trainhw-7a55e.firebaseio.com",
    storageBucket: "trainhw-7a55e.appspot.com",
    messagingSenderId: "135844172412"
};
firebase.initializeApp(config);
// already updated rules to true
var database = firebase.database();


var tNextTrain = " ";
var tName = " ";
var dest = " ";
var fTrain = 0;
var freq = 0;
var nxtTrain = 0;
var mAway = 0;


$("#submit").on("click", function(event) {
	//prevents form from submitting automatically
    event.preventDefault();

    //gets our values from the form.
    tName = $("#trainName").val().trim();
    dest = $("#destination").val().trim();
    fTrain = $("#firstTrain").val().trim();
    freq = $("#frequency").val().trim();
    // freq = Math.abs(freq);

    //Time inputted into the form for when trains first time is
    var firstTime = fTrain;

    // first time formatted for a moment
    var firstTimeConverted = moment(firstTime, "hh:mm");
    console.log(firstTimeConverted + "FIRST TIME CONVERTED");

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm:ss"));

    // Difference between the times this moment and the trains time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);


    //time apart math.abs fixes if we have a negative remainder
    var tRemainder = Math.abs(diffTime % freq);
    console.log(tRemainder);

    //Time til next train: frequency  - remainder gives us how long til the next train
    var tNextTrain = Math.abs(freq - tRemainder);
    console.log(tNextTrain + " Time Til Next Train");
  
    // converts the string into a number
    var parsedNxtTrain = parseInt(tNextTrain);
    console.log(typeof + parsedNxtTrain);


    //	taking the current time then adding the amount of time to the next time in minutes and then formatting it gives us the new trains time.																	
    var nextTrainTime = moment((currentTime)).add(parsedNxtTrain, 'm').format("HH:mm a"); // this is not working correctly
    console.log(nextTrainTime + " THIS SHOULD BE NEXT TRAINS TIME");



    // Here we're making sure that we have inputs before you can submmit
    if (tName.length > 0 && dest.length > 0 && fTrain.length > 0 && freq.length > 0 && (freq <= 1440)) {
    	freq = Math.abs(freq);
        // $("tbody").append("<tr>" 	+ "<td>" + tName + "</td>" + "<td>" + dest + "</td>" + "<td>" + freq + "</td>" + "<td>" + nxtTrain + "</td>" + "<td>" + mAway + "</td>" + "</tr>");
        console.log(tName);
        console.log(dest);
        console.log(fTrain);
        console.log(freq);

//pushing the values from our inputs and our calculations into firebase
        database.ref().push({
            tName: tName,
            dest: dest,
            fTrain: fTrain,
            freq: freq,
            nxtTrain: nxtTrain,
            tRemainder: tRemainder,
            tNextTrain: tNextTrain,
            nextTrainTime: nextTrainTime
        });


        // clearing the values in the form so we can enter the next train without having to delete what we entered
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
    }

});




// This function updates the time we have set on the page.
function updatePage() {
    var now = moment().format('h:mm A');
    $("#currentTime").html(now);
    setTimeout(updatePage, 1000);
}




// this function fires evertime a child is added into firebase
database.ref().on("child_added", function(snapshot) {
// // $("#tTable").empty();

// database.ref().set({



// });




// updating the DOM to show our values from the form/caluclations onto the page
    $("#tTable").append("<tr><td>" + snapshot.val().tName +
        "</td><td>" + snapshot.val().dest +
        "</td><td>" + snapshot.val().freq +
        "</td><td>" + snapshot.val().nextTrainTime +
        "</td><td>" + snapshot.val().tNextTrain +
        "</td></tr>");

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

updatePage();
























































// just in case - this works need to try and fix the page to update everyminute
// var config = {
//     apiKey: "AIzaSyDyYbQVRpFHVL755gd4ecHaLmpqywTbuVE",
//     authDomain: "trainhw-7a55e.firebaseapp.com",
//     databaseURL: "https://trainhw-7a55e.firebaseio.com",
//     storageBucket: "trainhw-7a55e.appspot.com",
//     messagingSenderId: "135844172412"
// };
// firebase.initializeApp(config);
// // already updated rules to true
// var database = firebase.database();


// var tNextTrain = " ";
// var tName = " ";
// var dest = " ";
// var fTrain = 0;
// var freq = 0;
// var nxtTrain = 0;
// var mAway = 0;


// $("#submit").on("click", function(event) {
// 	//prevents form from submitting automatically
//     event.preventDefault();

//     //gets our values from the form.
//     tName = $("#trainName").val().trim();
//     dest = $("#destination").val().trim();
//     fTrain = $("#firstTrain").val().trim();
//     freq = $("#frequency").val().trim();


//     //Time inputted into the form for when trains first time is
//     var firstTime = fTrain;

//     // first time formatted for a moment
//     var firstTimeConverted = moment(firstTime, "hh:mm");
//     console.log(firstTimeConverted + "FIRST TIME CONVERTED");

//     // Current Time
//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm:ss"));

//     // Difference between the times this moment and the trains time
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);


//     //time apart math.abs fixes if we have a negative remainder
//     var tRemainder = Math.abs(diffTime % freq);
//     console.log(tRemainder);

//     //Time til next train: frequency  - remainder gives us how long til the next train
//     var tNextTrain = Math.abs(freq - tRemainder);
//     console.log(tNextTrain + " Time Til Next Train");
  
//     // converts the string into a number
//     var parsedNxtTrain = parseInt(tNextTrain);
//     console.log(typeof + parsedNxtTrain);


//     //	taking the current time then adding the amount of time to the next time in minutes and then formatting it gives us the new trains time.																	
//     var nextTrainTime = moment((currentTime)).add(parsedNxtTrain, 'm').format("HH:mm a"); // this is not working correctly
//     console.log(nextTrainTime + " THIS SHOULD BE NEXT TRAINS TIME");



//     // Here we're making sure that we have inputs before you can submmit
//     if (tName.length > 0 && dest.length > 0 && fTrain.length > 0 && freq.length > 0 && (freq <= 1440)) {

//         // $("tbody").append("<tr>" 	+ "<td>" + tName + "</td>" + "<td>" + dest + "</td>" + "<td>" + freq + "</td>" + "<td>" + nxtTrain + "</td>" + "<td>" + mAway + "</td>" + "</tr>");
//         console.log(tName);
//         console.log(dest);
//         console.log(fTrain);
//         console.log(freq);

// //pushing the values from our inputs and our calculations into firebase
//         database.ref().push({
//             tName: tName,
//             dest: dest,
//             fTrain: fTrain,
//             freq: freq,
//             nxtTrain: nxtTrain,
//             tRemainder: tRemainder,
//             tNextTrain: tNextTrain,
//             nextTrainTime: nextTrainTime
//         });


//         // clearing the values in the form so we can enter the next train without having to delete what we entered
//         $("#trainName").val("");
//         $("#destination").val("");
//         $("#firstTrain").val("");
//         $("#frequency").val("");
//     }

// });




// // This function updates the time we have set on the page.
// function updatePage() {
//     var now = moment().format('h:mm A');
//     $("#currentTime").html(now);
//     setTimeout(updatePage, 1000);
// }




// // this function fires evertime a child is added into firebase
// database.ref().on("child_added", function(snapshot) {


// // updating the DOM to show our values from the form/caluclations onto the page
//     $("#tTable").append("<tr><td>" + snapshot.val().tName +
//         "</td><td>" + snapshot.val().dest +
//         "</td><td>" + snapshot.val().freq +
//         "</td><td>" + snapshot.val().nextTrainTime +
//         "</td><td>" + snapshot.val().tNextTrain +
//         "</td></tr>");

// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });

// updatePage();