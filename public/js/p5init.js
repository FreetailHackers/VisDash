var song, mic, fft, amp, gotAudio, // shared variables
	source = "file", p5stuff = {
		instances: {},
		things: [], // will contain p5 instance vars
		gotAudio,
		songLoaded: false
	};

window.alert = window.confirm = window.prompt = function(){}; // disable annoying stuff

p5stuff.i = new p5(function(p) {
	// collect all vars now for faster lookup later
	for (var t in p) p5stuff.things.push(t);
	p.preload = function() {
		song = p.loadSound("/audio/DetraceWaterfront.mp3");
	}
	p.setup = function() {
		p.noCanvas();
		// these will be shared with all instances
		fft = new p5.FFT();
		mic = new p5.AudioIn();
		amp = new p5.Amplitude();
		song.play();
		mic.stop();
		fft.setInput(song);
		amp.setInput(song);
		song.jump(0);
		p5stuff.songLoaded = true;
	}
	p.select("html").drop(function(file) {
		if (file.type == "audio") {
			song = p.loadSound(file.data);
		}
	});
});

window.addEventListener("scroll", function() {
	var canvases = document.getElementsByClassName("canvas");
	for (var i = 0; i < canvases.length; i++) {
		var c = canvases[i], instance = p5stuff.instances[c.id];
		if (instance) {
			var p = c.offsetParent,
				offset = p.offsetTop;
			if (offset > document.body.scrollTop + document.documentElement.clientHeight || offset < document.body.scrollTop - p.offsetHeight) {
				instance.noLoop();
			} else {
				instance.loop();
			}
		}
	}
});
