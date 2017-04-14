require('dotenv').load();

// Connect to mongodb
var mongoose        = require('mongoose');
var database        = process.env.DATABASE || { url: "mongodb://localhost:27017"};
mongoose.connect(database.url);
mongoose.Promise = require('bluebird');

var UserController = require('../app/server/controllers/UserController');

var users = 10;
var username = 'hacker';

var submission = new Object();
submission.title = "submission title";
submission.code =
'var mic, soundFile; var amplitude;var mapMax = 1.0; function preload() { soundFile = loadSound("../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3") }function setup() {c = createCanvas(windowWidth, windowHeight);background(0); fill(255);noStroke();  mic = new p5.AudioIn();mic.start();  amplitude = new p5.Amplitude();  amplitude.setInput(mic);}function draw() {background(0);var level = amplitude.getLevel();text("Amplitude: " + level, 20, 20);text("mapMax: " + mapMax, 20, 40);var ellipseHeight = map(level, 0, mapMax, height, 0); ellipse(width/2, ellipseHeight, 100, 100);}';
submission.likes = 0;

for (var i = 0; i < users; i++){
  console.log(username, i);
  UserController
    .createUser(username + i + '@school.edu', 'foobar', function(err, user){
      if (err){
        console.log(err);
      }
      else {
        UserController.pushSubmissionById(user.user._id, submission, function(err, user) {
                 if (err){
                   console.log(err);
                 }
                 else {
                   console.log(user);
                 }
              });
      }
  });
}

console.log("JOB'S DONE");
