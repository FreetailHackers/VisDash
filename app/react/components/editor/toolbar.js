import React from 'react';

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state={
        }
    }

    render() {
        return (
    			<div className="menubar">
    				<input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" />
    				<div className="buttons">
    					<button className="run" title="Run">
    						<i className="material-icons" onClick={this.props.save}>play_arrow</i>
    					</button>
    				</div>
    			</div>
        )
    }
}
