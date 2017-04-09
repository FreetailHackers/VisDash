import React from 'react';
// import Visualizer from './magical_p5_shit'

export default class VisDisplay extends React.Component {
	render() {
        return (
			<div className="canvas" id={this.props.canvasID}>
				<canvas width="400" height="300"></canvas>
            	{/*<Visualizer/>*/}
			</div>
        )
    }
}
