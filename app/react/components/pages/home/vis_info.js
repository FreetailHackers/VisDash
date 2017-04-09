import React from 'react';
import LikeInfo from './like_info.js';

export default class VisInfo extends React.Component {
	render() {
		return (
            <div className="bottom">
	            <div className="text">
					<strong className="title">{this.props.title}</strong>
					<span> by </span>
					<a className="author" href={`/user/${this.props.username}`}>{this.props.username}</a>
	            </div>
            	<LikeInfo likes={this.props.likes} />
            </div>
        )
	}
}
