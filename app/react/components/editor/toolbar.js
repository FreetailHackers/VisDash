import React from 'react';
import store from '../../../redux/store';

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

	componentDidMount() {
		console.log(this.props);
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
    					{ canSave ? (
                                <button className="run" title="Run" onClick={this.props.save}>
        						    <i className="material-icons">play_arrow</i>
        					    </button> 
                            ) : (
                                <button className="fork" title="Fork">
                                    <i className="material-icons">get_app</i>
                                </button> 
                            )
                        }
    				</div>
    			</div>
        )
    }
}
