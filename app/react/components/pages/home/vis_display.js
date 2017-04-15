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
			if (p5stuff.songLoaded) {
				clearInterval(waiting);
				var code = this.props.code;
				// find all things that might be p5 vars or functions
				code = code.replace(/(\S+?)\b/gi, function(match, thing) {
					// if this part of the lib? prefix it if so
					if (p5stuff.things.indexOf(thing) > -1) thing = "p."+thing;
					return thing;
				})+';p.setup=function(){p.createCanvas(400,300);'
				+'if(typeof setup=="function")setup()};p.draw=draw;';
				try {
					var instance = new p5(new Function("p", code), this.props.canvasID);
					this.setState({
						p5: instance,
						loaded: true,
						overlay: false
					});
					p5stuff.instances[this.props.canvasID] = instance;
				} catch (e) {
					if (this.state.p5) this.state.p5.noLoop();
					this.setState({
						overlay: true,
						icon: "error",
						text: "There was an error running this code"
					});
				}
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
			overlay = <div className="status"><div>
				<i className="material-icons">{this.state.icon}</i>
				<div>{this.state.text}</div>
			</div></div>
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
