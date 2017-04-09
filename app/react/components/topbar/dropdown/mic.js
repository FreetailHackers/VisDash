import React from 'react';

export default class MicPrompt extends React.Component {
    render() {
        return (
			<div className="mic">
				You will need to grant permission to access your microphone.
				<button id="allowmic">Allow</button>
			</div>
        )
    }
}
