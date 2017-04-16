import React from 'react';
import store from '../../../redux/store';

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

	componentDidMount() {
		store.subscribe(() => {
            this.forceUpdate();
        })
	}

    render() {
        var canSave = false;
        if (this.props.isShown) {
            var userSubmissions = store.getState().user.submissions;
            var currSubmissionId = store.getState().submission._id;

            for(let sub of userSubmissions) {
                if (sub._id == currSubmissionId)
                    canSave = true;
            }
        }
		canSave = true;
        return (
    			<div className="menubar">
                    { canSave ? (
                            <input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" />
                        ) : (
                            <input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" readOnly />
                        )
                    }
    				<input ref="title" type="text" value={this.props.title} placeholder="My cool visualizer" />
    				<div className="buttons">
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
                                <button className="fork" title="Fork" onClick={this.props.fork}>
                                    <i className="material-icons">get_app</i>
                                </button>
                            )
                        }
    				</div>
    			</div>
        )
    }
}
