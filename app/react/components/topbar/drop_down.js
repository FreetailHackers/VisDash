import React from 'react';
import MediaSongSelection from "./media_song_selection.js";

export default class InputDropDown extends React.Component {
    render() {
        return (
            <div id="media">
				<div className="type">
					<input type="radio" name="input" value="music" id="musicinput" />
					<label for="musicinput"><i className="material-icons">queue_music</i></label>
					<input type="radio" name="input" value="mic" id="micinput" />
					<label for="micinput"><i className="material-icons">mic</i></label>
					<input type="radio" name="input" value="file" id="fileinput" />
					<label for="fileinput"><i className="material-icons">insert_drive_file</i></label>
				</div>
				<div className="options">
					<MediaSongSelection />
					<div className="mic">
						You will need to grant permission to access your microphone.
						<button id="allowmic">Allow</button>
					</div>
					<div className="file">
						Drop a file or
						<div className="select">
							select
							<input type="file" />
						</div>
					</div>
				</div>
				<input type="range" className="volume" />
			</div>
        )
    }
}