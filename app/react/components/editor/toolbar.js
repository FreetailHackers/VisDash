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
        console.log(canSave);
        return (
    			<div className="menubar">
                    { canSave ? (
                            <input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" />
                        ) : (
                            <input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" readOnly />
                        )
                    }
    				<input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" />

    					{ canSave ? (
                  <span className="buttons">
                                <button className="run" title="Run" onClick={this.props.save}>
        						                    <i className="material-icons">play_arrow</i>
        					             </button>

                               <button className="del" title="Del" onClick={this.props.del}>
                                        <i className="material-icons">delete</i>
                                </button>
                                </span>
                            ) : (
                                  				<span className="buttons">
                                <button className="fork" title="Fork" onClick={this.props.fork}>
                                    <i className="material-icons">get_app</i>
                                </button>
                                		</span>
                            )
                        }

    			</div>
        )
    }
}
