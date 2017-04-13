import React from 'react';

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state={
        }
    }

    render() {
        return (
			<div className="tools">
				<input ref="title" type="text" value="{this.props.title}" value="Your Awesome Visualizer" />
				<button className="run" title="Run">
					<i className="material-icons">play_arrow</i>
				</button>
			</div>
        )
    }
}
