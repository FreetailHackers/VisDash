import React from 'react';
import store from '../../../../redux/store';
import { post, httpdelete } from '../../../../comm/comm'

export default class LikeInfo extends React.Component {
	constructor() {
		super();
		this.state = {
			liked: this.props.id in store.getState().user.likes,
		}
		this.likeColors = {
			liked: "#FF00FF",
			default: "#000000",
		}
		this.toggleLike = this.toggleLike.bind(this);
		this.getColorFromState = this.getColorFromState.bind(this);
		this.getClassFromState = this.getClassFromState.bind(this);
	}

	//checks if the submission is liked when the user is loaded
	componentDidMount() {
		//TODO: FINISH THIS
		
	}

	//Changes the internal state, then sends to server
	toggleLike() {
		var liked = this.state.liked;
		var user = store.getState().user;
		this.setState({liked: !liked});
		if (liked) {
			//then, it is no longer liked after we toggle it
			post(`/api/${user.id}/likes/${this.props.id}`);
		}
		if (!liked) {
			httpdelete(`/api/${user.id}/likes/${this.props.id}`);
		}
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
