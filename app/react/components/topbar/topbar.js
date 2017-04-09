import React from 'react';
import HomeButton from './home_button';
import Toggle from './toggle_play';
import InputDropDown from './drop_down';
import LoginButton from './login_button';
import Primary from './primary_button';
import NowPlaying from "./now_playing";
import updateTime from "../../../redux/actions.js"

export default class TopBar extends React.Component {
    constructor() {
        super();
        this.state={
            playbackProgress: 0,
        }
        this.scrub = this.scrub.bind(this);
    }

	scrub() {
		store.dispatch(updateTime(this.refs.scrubber.value));
	}

    render() {
        return (
        	<div id="bottom">
				<div className="current">
					<button className="prev"><i className="material-icons">skip_previous</i></button>
					<NowPlaying artist="" title="" />
					<button className="next"><i className="material-icons">skip_next</i></button>
				</div>
				<div className="progress">
					<div style={{width:this.state.playbackProgress*100+"%"}}><div></div></div>
					<input type="range" min="0" max="1" step="0.0001" ref="scrubber" onChange={this.scrub} />
				</div>
				<div className="controls">
					<a href="#">saffron</a>
					<button className="repeat"><i className="material-icons">repeat</i></button>
					<button className="media"><i className="material-icons">volume_up</i></button>
					<LoginButton/>
				</div>
				<InputDropDown />
			</div>
        )
    }
}
