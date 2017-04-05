import React from 'react';
import UserDisplay from './user_display';
import TitleDisplay from './title_display';
import LikeInfo from './like_info.js';

export default class VisInfo extends React.Component {
	render() {
		return (
            <div className="dashboard panel info">
            	<UserDisplay/>
            	<TitleDisplay/>
            	<LikeInfo/>
            </div>
        )
	}
}