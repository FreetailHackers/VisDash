import React from 'react';
import EditorToolbar from './toolbar';

export default class Primary extends React.Component {
    render() {
        return (
            <div id="editor">
				<EditorToolbar />
				<pre id="code">function setup() {
createCanvas(400, 300); // this line cannot be changed
// additional setup code if needed
}

function draw() {
// your code
}
</pre>
            </div>
        )
    }
}
