import React from 'react';

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state={
        }
    }

    render() {
        return (
			<div class="tools">
				<input type="text" value="{this.props.title}" value="Your Awesome Visualizer" />
				<button class="run" title="Run">
					<i class="material-icons">play_arrow</i>
				</button>
			</div>
        )
    }
}
