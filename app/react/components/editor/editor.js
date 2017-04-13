import React from 'react';
import EditorToolbar from './toolbar';

export default class Editor extends React.Component {
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
	}
    render() {
        return (
            <div id="editor">
				<EditorToolbar title={this.props.title} />
				<pre id="code">{this.props.code}</pre>
            </div>
        )
    }
}
