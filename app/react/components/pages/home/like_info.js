import React from 'react';

export default class LikeInfo extends React.Component {
	render() {
		return (
			<div className="likes">
				<span>{this.props.likes}</span>
				<button>
					<i className="material-icons">favorite_border</i>
				</button>
			</div>
        )
	}
}
