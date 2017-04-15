import React from 'react';
import Toggle from './toggle_play';
import InputDropDown from './drop_down';
import LoginButton from './login_button';
import Primary from './primary_button';
import NowPlaying from "./now_playing";
import { updateTime, clearData } from "../../../redux/actions.js"
import store from '../../../redux/store'


export default class TopBar extends React.Component {
    constructor() {
        super();
        this.state = {
			user: store.getState().user,
            playbackProgress: 0,
			dropDownOpen: false,
			preparingToCloseDropDown: false,
        }
        this.scrub = this.scrub.bind(this);
		this.logout = this.logout.bind(this);
		this.openDropDown = this.openDropDown.bind(this);
		this.requestCloseDropDown = this.requestCloseDropDown.bind(this);
		setInterval(() => {
			this.setState({ playbackProgress: song.currentTime()/song.duration() });
		}, 20);
    }

	componentDidMount() {
		store.subscribe(() => {
			var current_user = store.getState().user;
			if (this.state.user != current_user) {
				this.setState({user: current_user});
			}
		})
	}

	openDropDown() {
		this.setState({
			dropDownOpen: true,
			preparingToCloseDropDown: false,
		})
	}

	requestCloseDropDown() {
		this.setState({preparingToCloseDropDown: true})
		setTimeout(() => {
			if (this.state.preparingToCloseDropDown) {
				this.closeDropDown();
			}
		}, 2000)
	}

	closeDropDown() {
		this.setState({
			preparingToCloseDropDown: false,
			dropDownOpen: false,
		})
	}

	logout() {
		store.dispatch(clearData());
		console.log(store.getState());
	}

	scrub() {
		song.jump(this.refs.scrubber.value*song.duration());
	}

    render() {
		var current_user_exists = this.state.user != null;
		var logout = null;
		if (current_user_exists) {
			logout = <button className="logout" onClick={this.logout}><i className="material-icons">exit_to_app</i></button>
		}
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
					<a href="/">saffron</a>
					{ logout }
					<button className="repeat"><i className="material-icons">repeat</i></button>
					<button onMouseEnter={this.openDropDown}
					        onMouseLeave={this.requestCloseDropDown}
							className="media">
						<i className="material-icons">volume_up</i>
					</button>
					<LoginButton/>
				</div>
				<InputDropDown open={this.state.dropDownOpen}
				               onMouseEnter={this.openDropDown}
							   onMouseLeave={this.requestCloseDropDown}/>
			</div>
        )
    }
}
