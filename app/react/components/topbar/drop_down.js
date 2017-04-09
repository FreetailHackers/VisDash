import React from 'react';
import MediaPlaylist from "./dropdown/playlist";
import MicPrompt from "./dropdown/mic";
import FilePicker from "./dropdown/file";

export default class InputDropDown extends React.Component {
    constructor() {
        super();
        this.state = {
            volume: 0,
        }
        this.scrub = this.scrub.bind(this);
    }

	scrub() {
		store.dispatch(updateVolume(this.refs.scrubber.value));
	}

    render() {
        return (
            <div id="media">
				<strong>Source</strong>
				<div className="type">
					<input type="radio" name="input" value="music" id="musicinput" defaultChecked />
					<label htmlFor="musicinput" title="Playlist"><i className="material-icons">queue_music</i></label>
					<input type="radio" name="input" value="mic" id="micinput" />
					<label htmlFor="micinput" title="Microphone"><i className="material-icons">mic</i></label>
					<input type="radio" name="input" value="file" id="fileinput" />
					<label htmlFor="fileinput" title="File"><i className="material-icons">insert_drive_file</i></label>
				</div>
				<div className="options">
					<MediaPlaylist />
					<MicPrompt />
					<FilePicker />
				</div>
				<strong>Volume</strong>
				<div className="volume">
					<input type="range" min="0" max="1" step="0.01" ref="scrubber" onChange={this.scrub} />
				</div>
				<div className="cover"></div>
			</div>
        )
    }
}
