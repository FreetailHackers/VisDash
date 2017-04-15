import React from 'react';
import MediaPlaylist from "./dropdown/playlist";
import MicPrompt from "./dropdown/mic";
import FilePicker from "./dropdown/file";

export default class InputDropDown extends React.Component {
    constructor() {
        super();
        this.state = {
            volume: 0,
			optionPane: "music"
        }
        this.scrub = this.scrub.bind(this);
        this.sourceChange = this.sourceChange.bind(this);
    }

	scrub(e) {
		p5stuff.i.masterVolume(parseFloat(e.target.value));
	}

	sourceChange(e) {
		this.setState({
			optionPane: e.target.value
		});
		switch (e.target.value) {
			case "music":
			case "file":
				song.stop();
				song.play();
				mic.stop();
				fft.setInput(song);
				amp.setInput(song);
				break;
			case "mic":
				if (mic.enabled) mic.start();
				song.stop();
				fft.setInput(mic);
				amp.setInput(mic);
				break;
		}
	}

    render() {
		var panel, volume = <div className="volume">
			<input type="range" min="0" max="1" step="0.01" ref="scrubber" onChange={this.scrub} />
		</div>;
		switch (this.state.optionPane) {
			case "music":
				panel = <MediaPlaylist />;
				break;
			case "mic":
				panel = <MicPrompt />;
				volume = null;
				break;
			case "file":
				panel = <FilePicker />;
				break;
		}
        return (
            <div id="media" onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} className = {this.props.open ? "open" : ""}>
				<div className="type">
					<input type="radio" name="input" value="music" id="musicinput" checked={this.state.optionPane == "music"} onChange={this.sourceChange} />
					<label htmlFor="musicinput" title="Playlist"><i className="material-icons">queue_music</i></label>
					<input type="radio" name="input" value="mic" id="micinput" checked={this.state.optionPane == "mic"} onChange={this.sourceChange} />
					<label htmlFor="micinput" title="Microphone"><i className="material-icons">mic</i></label>
					<input type="radio" name="input" value="file" id="fileinput" checked={this.state.optionPane == "file"} onChange={this.sourceChange} />
					<label htmlFor="fileinput" title="File"><i className="material-icons">insert_drive_file</i></label>
				</div>
				<div className="options">{panel}</div>
				{volume}
				<div className="cover"></div>
			</div>
        )
    }
}
