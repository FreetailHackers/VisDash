import React from 'react';
import store from '../../../../redux/store'
import { updateEditing } from '../../../../redux/actions'

// import Visualizer from './magical_p5_shit'

export default class VisDisplay extends React.Component {
	constructor() {
		super();
		this.setEditorOn = this.setEditorOn.bind(this);
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
				console.log(instance);
				this.setState({ p5: instance });
			}
		}, 10);
	}
	setEditorOn() {
		if (store.getState().user) {
			store.dispatch(updateEditing(true));
		}
	}
	render() {
		return (
			<div className="canvas" onClick={this.setEditorOn} id={this.props.canvasID}></div>
		)
	}
}
