import React from 'react';
import store from '../../../../redux/store'
import { updateEditing } from '../../../../redux/actions'

// import Visualizer from './magical_p5_shit'

export default class VisDisplay extends React.Component {
	constructor() {
		super();
		this.setEditorOn = this.setEditorOn.bind(this);
	}

	setEditorOn() {
		console.log("clicked");
		store.dispatch(updateEditing(true));
	}

	render() {
        return (
			<div className="canvas">
				<canvas onClick={this.setEditorOn} id={this.props.canvasID} width="400" height="300"></canvas>
				<script dangerouslySetInnerHTML={{__html:
				`
				console.log("TACOOOOOOOOOOOOS");
				var canvas = document.getElementById("${this.props.canvasID}");
				var ctx = canvas.getContext("2d");
				ctx.fillStyle = "#FF0000";
				ctx.fillRect(0,0,150,75);
				`
			}}>
				</script>
			</div>
        )
    }
}
