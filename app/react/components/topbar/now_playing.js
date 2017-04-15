import React from 'react';
import store from "../../../redux/store";

export default class NowPlaying extends React.Component {
    constructor() {
        super();
        this.state={
			artist: "",
			title: ""
        }
    }

	componentDidMount() {
		if (store.getState().nowPlaying != null) this.setState(store.getState().nowPlaying);
		store.subscribe(() => {
			if (store.getState().nowPlaying != null) this.setState(store.getState().nowPlaying);
		});
	}

    render() {
        return (
        	<div className="playing">{this.state.title} - {this.state.artist}</div>
        )
    }
}
