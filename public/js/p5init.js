var song, mic, fft, amp, gotAudio, // shared variables
	source = "file", songLoaded = false, p5instances = {},
	gotAudio, p5things = []; // will contain p5 instance vars

window.alert = window.confirm = window.prompt = function(){}; // disable annoying stuff

var p = new p5(function(p) {
	// collect all vars now for faster lookup later
	for (var t in p) p5things.push(t);
	p.preload = function() {
		song = p.loadSound("/audio/DetraceWaterfront.mp3");
	}
	p.setup = function() {
		p.noCanvas();
		// these will be shared with all instances
		fft = new p5.FFT();
		mic = new p5.AudioIn();
		amp = new p5.Amplitude();
		song.loop();
		song.play();
		mic.stop();
		fft.setInput(song);
		amp.setInput(song);
		songLoaded = true;
	}
	gotAudio = function(file) {
		song.dispose();
		song = p.loadSound(file, function() {
			// loaded!
		});
	}
});

window.addEventListener("scroll", function() {
	var canvases = document.getElementsByClassName("canvas");
	for (var i = 0; i < canvases.length; i++) {
		var c = canvases[i];
		if (p5instances[c.id]) {
			var p = c.offsetParent,
				offset = p.offsetTop;
			if (offset > document.body.scrollTop + document.documentElement.clientHeight || offset < document.body.scrollTop - p.offsetHeight) {
				p5instances[c.id].noLoop();
			} else {
				p5instances[c.id].loop();
			}
		}
	}
});
