import React from 'react';
import store from '../../../../redux/store'
import { updateEditing } from '../../../../redux/actions'

// import Visualizer from './magical_p5_shit'

export default class VisDisplay extends React.Component {
	constructor() {
		super();
		this.setEditorOn = this.setEditorOn.bind(this);
	}
	componentWillReceiveProps(props) {
		var waiting = setInterval(function() {
			if (songLoaded) {
				clearInterval(waiting);
				var code = props.code;
				// find all things that might be p5 vars or functions
				code = code.replace(/(\S+?)\b/gi, function(match, thing) {
					// if this part of the lib? prefix it if so
					if (p5things.indexOf(thing) > -1) thing = "p."+thing;
					return thing;
				})+'p.setup=function(){var c=p.createCanvas(400,300);c.drop(gotAudio);'
				+'if(typeof setup=="function")setup()};p.draw=draw;';
				this.setState({ p5: new p5(new Function("p", code), props.canvasID) });
			}
		}, 10);
	}
	setEditorOn() {
		console.log("clicked");
		store.dispatch(updateEditing(true));
	}
	render() {
		return (
			<div className="canvas">
				<canvas onClick={this.setEditorOn} id={this.props.canvasID} width="400" height="300"></canvas>
			</div>
		)
	}
}
