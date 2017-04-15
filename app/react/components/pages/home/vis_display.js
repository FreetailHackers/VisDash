import React from 'react';
import store from '../../../../redux/store'
import { updateEditing } from '../../../../redux/actions'

// import Visualizer from './magical_p5_shit'

export default class VisDisplay extends React.Component {
	constructor() {
		super();
		this.setEditorOn = this.setEditorOn.bind(this);
		this.state = {
			loaded: false,
			overlay: true,
			icon: "more_horiz",
			text: "Loading..."
		};
	}
	componentDidMount(props) {
		var waiting = setInterval(() => {
			if (songLoaded) {
				clearInterval(waiting);
				var code = this.props.code;
				// find all things that might be p5 vars or functions
				code = code.replace(/(\S+?)\b/gi, function(match, thing) {
					// if this part of the lib? prefix it if so
					if (p5things.indexOf(thing) > -1) thing = "p."+thing;
					return thing;
				})+';p.setup=function(){var c=p.createCanvas(400,300);c.drop(gotAudio);'
				+'if(typeof setup=="function")setup()};p.draw=draw;';
				var instance = new p5(new Function("p", code), this.props.canvasID);
				this.setState({
					p5: instance,
					loaded: true,
					//overlay: false
				});
			}
		}, 10);
	}
	setEditorOn() {
		if (store.getState().user) {
			store.dispatch(updateEditing(true));
		}
	}
	render() {
		var overlay, placeholder;
		if (this.state.overlay) {
			overlay = <div className="status">
				<i className="material-icons">{this.state.icon}</i>
				<div>{this.state.text}</div>
			</div>
		}
		if (!this.state.loaded) placeholder = <canvas width="400" height="300"></canvas>
		return (
			<div className="canvas" onClick={this.setEditorOn} id={this.props.canvasID}>
				{placeholder}
				{overlay}
			</div>
		)
	}
}
