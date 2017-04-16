var song, mic, fft, amp, gotAudio, // shared variables
	source = "file", p5stuff = {
		instances: {},
		things: [], // will contain p5 instance vars
		gotAudio,
		songLoaded: false
	};

function progress(text, number) {
	if (text === true) {
		ld.container.style.display = "none";
	} else {
		var percent = (number*100 || ld.percent);
		if (text != ld.text) {
			var line = document.createElement("div");
			line.innerHTML = ld.text = text;
			ld.status.insertBefore(line, ld.status.firstChild);
		}
		ld.number.innerHTML = Math.round(percent)+"%";
		ld.bar.style.width = percent+"%";
		ld.container.style.display = "block";
		ld.percent = percent;
	}
}

window.alert = window.confirm = window.prompt = function(){}; // disable annoying stuff

progress("Initializing p5...");

p5stuff.i = new p5(function(p) {
	// collect all vars now for faster lookup later
	for (var t in p) p5stuff.things.push(t);
	p5stuff.loadAudio = function(url, callback) {
		progress("Loading audio...", p);
		if (song) song.stop();
		//song.dispose();
		song = p.loadSound(url, function() {
			progress("Connecting...", 1);
			if (song) {
				song.play();
				fft && fft.setInput(song);
				amp && amp.setInput(song);
			}
			if (mic) mic.stop();
			if (callback) callback();
			progress(true);
		}, function () {
			progress("Failed to load audio!", 1);
		}, function(p) {
			progress("Loading audio...", p);
			if (parseInt(p*100) == 99) progress("Decoding audio data...", 1);
		});
	};
	p.preload = function() {
		p5stuff.loadAudio("/audio/DetraceWaterfront.mp3", function() {
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
		});
	}
	p.setup = function() {
		p.noCanvas();
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
