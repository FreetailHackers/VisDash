import React from 'react';
import store from '../../../redux/store';

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        var canSave = false;
        if (this.props.isShown) {
            var userSubmissions = store.getState().user.submissions;
            var currSubmissionId = this.props.submissionId;
            
            for(let sub of userSubmissions) {
                if (sub._id == currSubmissionId)
                    canSave = true;
            }
        }
        
        return (
    			<div className="menubar">
    				<input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" />
    				<div className="buttons">
    					{ canSave &&
                            <button className="run" title="Run">
    						    <i className="material-icons" onClick={this.props.save}>play_arrow</i>
    					    </button>
                        }
    				</div>
    			</div>
        )
    }
}
