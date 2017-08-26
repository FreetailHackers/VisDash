angular.module('reg')
  .controller('EditorCtrl', [
    '$rootScope',
    '$scope',
    '$sce',
    '$http',
    'currentUser',
    'Utils',
    'AuthService',
    'UserService',
    'EVENT_INFO',
    function($rootScope, $scope, $sce, $http, currentUser, Utils, AuthService, UserService){
      var user = currentUser.data;
      $scope.user = user;
      $scope.title = "Your Title Here";
      $scope.editorCode = "\n/*\r\n * getLevel() from the p5.Amplitude object\r\n * and map it to the ellipse position.\r\n *\/\r\n\r\nvar mic, soundFile;\r\nvar amplitude;\r\nvar mapMax = 1.0;\r\n\r\nfunction preload() {\r\n  \/\/ load the sound, but don\'t play it yet\r\n  soundFile = loadSound(\'..\/..\/music\/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3\')\r\n}\r\n\r\nfunction setup() {\r\n  c = createCanvas(windowWidth, windowHeight);\r\n  background(0);\r\n  fill(255);\r\n  noStroke();\r\n\r\n  mic = new p5.AudioIn();\r\n  mic.start();\r\n\r\n  \/\/ soundFile.play();\r\n\r\n  amplitude = new p5.Amplitude();\r\n  amplitude.setInput(mic);\r\n  \/\/ amplitude.smooth(0.8); \/\/ <-- try this!\r\n}\r\n\r\nfunction draw() {\r\n  background(0);\r\n\r\n  var level = amplitude.getLevel();\r\n  text(\'Amplitude: \' + level, 20, 20);\r\n  text(\'mapMax: \' + mapMax, 20, 40);\r\n\r\n  \/\/ map ellipse height\r\n  var ellipseHeight = map(level, 0, mapMax, height, 0);\r\n  ellipse(width\/2, ellipseHeight, 100, 100);\r\n}"


      $scope.updateCode = function(){
        submission = {};
        submission['title'] = $scope.title;
        submission['owner'] = currentUser.data.id;
        submission['likes'] = 0;
        submission['code'] = $scope.editorCode;
        UserService.addSubmission(currentUser.data.id, submission);
      };

    }]);
