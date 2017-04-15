import React from 'react';
import InputDropDown from './drop_down';
import LoginButton from './login_button';
import NowPlaying from "./now_playing";
import { updateTime, clearData, setNowPlaying } from "../../../redux/actions.js";
import store from '../../../redux/store';


export default class TopBar extends React.Component {
    constructor() {
        super();
        this.state = {
			user: store.getState().user,
            playbackProgress: 0,
			dropDownOpen: false,
			preparingToCloseDropDown: false,
			song: "music",
			title: "",
			artist: "",
			currSong: 0
        }
        this.scrub = this.scrub.bind(this);
		this.logout = this.logout.bind(this);
		this.openDropDown = this.openDropDown.bind(this);
		this.requestCloseDropDown = this.requestCloseDropDown.bind(this);
		this.songs = [{
			title: "Detrace",
			artist: "Waterfront (ft. Skyloud)",
			file: "DetraceWaterfront.mp3"
		}, {
			title: "Jazzy Frenchy",
			artist: "Bensound",
			file: "bensound-jazzyfrenchy.mp3"
		}];
		this.changeSong = this.changeSong.bind(this);
		this.prevSong = this.prevSong.bind(this);
		this.nextSong = this.nextSong.bind(this);
		this.setSong = this.setSong.bind(this);
    }

	changeSong(e) {
		this.setSong(parseInt(e.target.id.replace("song", "")));
	}

	prevSong() {
		this.setSong(this.state.currSong - 1);
	}

	nextSong() {
		this.setSong(this.state.currSong + 1);
	}

	setSong(index) {
		if (index < 0) index = 0;
		else index %= this.songs.length;
		this.setState({ currSong: index });
		var selected = this.songs[index];
		store.dispatch(setNowPlaying(selected));
		song.stop();
		//song.dispose();
		song = p5stuff.i.loadSound("/audio/"+selected.file, () => {
			song.play();
			mic.stop();
			fft.setInput(song);
			amp.setInput(song);
		});
	}

	componentDidMount() {
		store.subscribe(() => {
			var current_user = store.getState().user;
			if (this.state.user != current_user) {
				this.setState({user: current_user});
			}
		});
		setInterval(() => {
			this.setState({ playbackProgress: song.currentTime()/song.duration() });
		}, 200);
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
		}, 200)
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
		var items = [];
		for (var i = 0; i < this.songs.length; i++) {
			items.push(<div key={i} onClick={this.changeSong} id={`song${i}`}>
				{this.songs[i].title} - {this.songs[i].artist}
			</div>);
		}
        return (
        	<div id="bottom">
				<div className="current">
					<button className="prev" onClick={this.prevSong}><i className="material-icons">skip_previous</i></button>
					<NowPlaying artist="" title="" />
					<button className="next" onClick={this.nextSong}><i className="material-icons">skip_next</i></button>
				</div>
				<div className="progress">
					<div style={{width:this.state.playbackProgress*100+"%"}}><div></div></div>
					<input type="range" min="0" max="1" step="0.0001" ref="scrubber" onChange={this.scrub} />
				</div>
				<div className="controls">
					<a href="/">saffron</a>
					{ logout }
					<button onMouseEnter={this.openDropDown}
					        onMouseLeave={this.requestCloseDropDown}
							className="media">
						<i className="material-icons">volume_up</i>
					</button>
					<LoginButton/>
				</div>
				<InputDropDown items={items}
								open={this.state.dropDownOpen}
				               onMouseEnter={this.openDropDown}
							   onMouseLeave={this.requestCloseDropDown}/>
			</div>
        )
    }
}
