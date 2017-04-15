import React from 'react';
import store from '../../../redux/store';
import EditorToolbar from './toolbar';

export default class Editor extends React.Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
		this.editor = null;
		this.session = null;
		this.submission_id = null;
	}
	submit() {
		var form = {
			title: this.refs.title.value,
			submission: this.editor.getValue()
		};
		post('/auth/login', form, user => {
			if (user.token) {
				store.dispatch(setUserAndToken(user.user, user.token));
				this.setState({loggedIn: true});
			}
		});
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
		});
		//editor.getValue();
		/*editor.getSession().on("change", function(e) {
		    // e.type, etc
		});*/
		this.editor = editor;
		this.session  = session;
    }
    render() {
				if (this.editor != null) {
					var curr_store = store.getState();
					var code = curr_store.code;
					if (this.submission_id != curr_store.submission_id) {
						this.submission_id = curr_store.submission_id;
						this.editor.setValue(code);
					}
				}
        return (
            <div id="editor" className={this.props.isShown ? "shown" : ""}>
				<EditorToolbar title={this.props.title} />
				<pre id="code">{this.props.code}</pre>
            </div>
        )
    }
}
