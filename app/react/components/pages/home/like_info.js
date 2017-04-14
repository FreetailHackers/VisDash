import React from 'react';
import store from '../../../../redux/store';
import { post, httpdelete } from '../../../../comm/comm'

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
		this.tempUpdateLikes = this.tempUpdateLikes.bind(this);
	}

	// checks if the submission is liked when the user is loaded
	componentDidMount() {
		// TODO: FINISH THIS
		console.log(store.getState().user);
		this.setState({ liked: (store.getState().user.likes.includes(String(this.props.id))), likes: this.props.likes });
	}

	tempUpdateLikes(liked) {
		var newLikes = liked ? this.state.likes + 1 : this.state.likes - 1;
		this.setState({ likes: newLikes });
	}

	//Changes the internal state, then sends to server
	toggleLike() {
		var liked = this.state.liked;
		var user = store.getState().user;
		
		this.setState({liked: !liked});
		this.tempUpdateLikes(!liked);
		if (liked) {
			//then, it is no longer liked after we toggle it
			httpdelete(`/api/users/${user.id}/likes/${this.props.id}`);
		}
		if (!liked) {
			post(`/api/users/${user.id}/likes/${this.props.id}`);
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
				<span>{this.state.likes}</span>
				<button onClick={this.toggleLike}>
					<i style={{color: this.getColorFromState()}} className="material-icons">
						{this.getClassFromState()}
					</i>
				</button>
			</div>
        )
	}
}
