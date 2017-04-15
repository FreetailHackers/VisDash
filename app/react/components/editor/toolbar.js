import React from 'react';
import store from '../../../redux/store';
import { post, put, httpdelete } from '../../../comm/comm'

export default class EditorToolbar extends React.Component {
    constructor() {
        super();
        this.state={
        }
        this.postNewSubmission = this.postNewSubmission.bind(this);
    }

    postNewSubmission() {
      var user = store.getState().user;

      var submission = new Object();
      submission.title = "submission title";
      submission.code = this.props.code;
      submission.likes = 0;

      var wrapper = new Object();
      wrapper.submission = submission;


      post(`/api/users/${user.id}/submissions`, wrapper, function(res) {
        console.log(res);
      });
  	}

    render() {
        return (
    			<div className="menubar">
    				<input ref="title" type="text" value={this.props.title} />
    				<div className="buttons">
    					<button className="run" title="Run">
    						<i className="material-icons" onClick={this.postNewSubmission} >play_arrow</i>
    					</button>
    				</div>
    			</div>
        )
    }
}
