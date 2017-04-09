import React from 'react';

export default class LikeInfo extends React.Component {
	constructor() {
		super();
		this.state = {
			liked: false,
		}
		this.likeColors = {
			liked: "#FF00FF",
			default: "#000000",
		}
		this.toggleLike = this.toggleLike.bind(this);
		this.getColorFromState = this.getColorFromState.bind(this);
		this.getClassFromState = this.getClassFromState.bind(this);
	}

	toggleLike() {
		var liked = this.state.liked;
		this.setState({liked: !liked});
	}

	getColorFromState() {
		return this.state.liked ? this.likeColors.liked : this.likeColors.default;
	}

	getClassFromState() {
		return this.state.liked ? "favorite" : "favorite_border";	
	}
	render() {
		return (
			<div className="likes">
				<span>{this.props.likes}</span>
				<button onClick={this.toggleLike}>
					<i style={{color: this.getColorFromState()}} className="material-icons">
						{this.getClassFromState()}
					</i>
				</button>
			</div>
        )
	}
}
