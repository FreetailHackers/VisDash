import React from 'react';

export default class MediaPlaylist extends React.Component {
	render() {
		return (
			<div className="music">
				<div className="hint">Drop a file anywhere in this window to play it.</div>
				{ this.props.items }
			</div>
		)
	}
}
