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
      $scope.editorCode = "/*\n * getLevel() from the p5.Amplitude object\n * and map it to the ellipse position.\n *\/\n\nvar mic, soundFile;\nvar amplitude;\nvar mapMax = 1.0;\n\nfunction preload() {\n  \/\/ load the sound, but don\'t play it yet\n  soundFile = loadSound(\'..\/..\/music\/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3\')\n}\n\nfunction setup() {\n  c = createCanvas(windowWidth, windowHeight);\n  background(0);\n  fill(255);\n  noStroke();\n\n  mic = new p5.AudioIn();\n  mic.start();\n\n  \/\/ soundFile.play();\n\n  amplitude = new p5.Amplitude();\n  amplitude.setInput(mic);\n  \/\/ amplitude.smooth(0.8); \/\/ <-- try this!\n}\n\nfunction draw() {\n  background(0);\n\n  var level = amplitude.getLevel();\n  text(\'Amplitude: \' + level, 20, 20);\n  text(\'mapMax: \' + mapMax, 20, 40);\n\n  \/\/ map ellipse height\n  var ellipseHeight = map(level, 0, mapMax, height, 0);\n  ellipse(width\/2, ellipseHeight, 100, 100);\n}"


      $scope.updateCode = function(){
        swal({
  	    title: "Are you sure?",
  	    text: "Please confirm your submission",
  	    type: "warning",
  	    showCancelButton: true,
  	    confirmButtonColor: "#7FFF00",
  	    confirmButtonText: "Yes",
  	    closeOnConfirm: false
	},
	function(){
 	 swal("Success!", "Your project has been successfully submitted", "success");
	 submission = {};
         submission['title'] = $scope.title;
         submission['owner'] = currentUser.data.id;
         submission['likes'] = 0;
         submission['code'] = $scope.editorCode;
         console.log(submission);
         UserService.addSubmission(currentUser.data.id, submission);
	});
      };

	  $scope.initializeEditor = function() {
			var flask = new CodeFlask,
				selector = '#editorwrapper',
				fixing = true,
				textarea;
			flask.run(selector, {
				language: 'javascript',
				lineNumbers: true
			});
			textarea = document.querySelector(selector+" textarea");
			flask.onUpdate(function(code) {
				if (fixing) {
					var prevStart = textarea.selectionStart,
						prevEnd = textarea.selectionEnd,
						cleaned = code.replace(/^\s+/g, ""),
						offset = cleaned.length - code.length;
					fixing = false;
					flask.update(cleaned);
					fixing = true;
					textarea.selectionStart = prevStart + offset;
					textarea.selectionEnd = prevEnd + offset;
				}
			});
			flask.update($scope.editorCode);
			return true; // because I don't get Angular
	  }

    }]);
