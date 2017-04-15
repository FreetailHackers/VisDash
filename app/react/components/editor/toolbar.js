import React from 'react';

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state={
        }
    }

	componentDidMount() {
		console.log(this.props);
	}

    render() {
        return (
    			<div className="menubar">
    				<input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" />
    				<div className="buttons">
    					<button className="run" title="Run" onClick={this.props.save}>
    						<i className="material-icons">play_arrow</i>
    					</button>
    				</div>
    			</div>
        )
    }
}
