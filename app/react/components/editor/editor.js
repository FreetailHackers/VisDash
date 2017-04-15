import React from 'react';
import store from '../../../redux/store';
import { updateEditing } from '../../../redux/actions';
import EditorToolbar from './toolbar';
import VisDisplay from '../pages/home/vis_display';
import { post, put, httpdelete } from '../../../comm/comm';

export default class Editor extends React.Component {
	constructor() {
		super();
		this.state = { code: "" };
		this.editor = null;
		this.session = null;
		this.submission_id = null;
		this.editor_open = false;
		this.waiting;
        this.postNewSubmission = this.postNewSubmission.bind(this);
	}

    postNewSubmission() {
		var user = store.getState().user;

		var submission = new Object();
		this.setState({ code: this.editor.getValue() });

		submission.title = "submission title";
		submission.code = this.state.code;
		submission.likes = 0;

		var wrapper = new Object();
		wrapper.submission = submission;

		post(`/api/users/${user.id}/submissions`, wrapper, function(res) {
			console.log(res);
		});
  	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state != nextState;
	}

	componentDidMount() {
		var editor = ace.edit("code"),
			session  = editor.getSession();
		editor.setTheme("ace/theme/twilight");
		editor.setShowPrintMargin(false);
		editor.setHighlightActiveLine(false);
		session.setMode("ace/mode/javascript");
		session.setTabSize(4);
		/*var Range = ace.require("ace/range").Range,
			range = new Range(0, 0, 2, 0),
			markerId = session.addMarker(range, "readonly");
		editor.keyBinding.addKeyboardHandler({
			handleKeyboard : function(data, hash, keyString, keyCode, event) {
				if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false;
				if (editor.getSelectionRange().intersects(range)) return {
					command: "null",
					passEvent: false
				};
			}
		});*/
		//editor.getValue();
		this.editor = editor;
		this.session  = session;
		store.dispatch(updateEditing(false));
		store.subscribe(() => {
			console.log(store.getState().editing);
			console.log(this.state.editor_open)
			if (this.state.editor_open != store.getState().editing) {
				this.setState({editor_open: store.getState().editing});
			}
		})
    }
    
    render() {
    	var currStore = store.getState(), toolbar = <EditorToolbar
			code="DUMMY VALUE"
			title={this.props.title}
			save={this.postNewSubmission}
			isShown={this.props.isShown} />;
		if (this.editor && currStore.submission) {
			// console.log(currStore);
			var code = currStore.submission.code || "";
			if (this.submission_id != currStore.submission.submission_id) {
				this.submission_id = currStore.submission.submission_id;
				this.editor.setValue(code);
			}
			toolbar = <EditorToolbar submissionId={this.submission_id}
				code={this.editor.getValue()}
				title={currStore.submission.title}
				save={this.postNewSubmission}
				isShown={this.props.isShown} />;
	    }
	    return (
			<div id="editor" className={this.props.isShown ? "shown" : ""}>
				{ toolbar }
				<pre id="code">{this.props.code}</pre>
				<VisDisplay code={this.state.code} canvasID="livepreview" />
			</div>
		)

	}
}
