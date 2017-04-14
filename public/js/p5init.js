var song, mic, fft, amp, gotAudio, // shared variables
	source = "file", songLoaded = false,
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
		if (source == "file") {
			fft = new p5.FFT();
			song.loop();
			song.play();
			mic.stop();
			fft.setInput(song);
			amp.setInput(song);
		} else if (source == "mic") {
			fft = new p5.FFT();
			mic.start();
			song.stop();
			fft.setInput(mic);
			amp.setInput(mic);
		}
		songLoaded = true;
	}
	gotAudio = function(file) {
		song.dispose();
		song = p.loadSound(file, function() {
			// loaded!
		});
	}
});
