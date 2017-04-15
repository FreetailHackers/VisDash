import React from 'react';

export default class MicPrompt extends React.Component {
	constructor() {
		super();
		this.requestAccess = this.requestAccess.bind(this);
	}

	requestAccess() {
		mic.start();
	}

    render() {
		if (!mic.enabled) {
			return (
				<div className="mic">
					You will need to grant permission to access your microphone.
					<button id="allowmic" onClick={this.requestAccess}>Allow</button>
				</div>
			)
		} else {
			return (
				<div className="mic">Thank you for granting access to your microphone!</div>
			)
		}
    }
}
