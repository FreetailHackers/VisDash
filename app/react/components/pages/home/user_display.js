import React from 'react';

export default class UserDisplay extends React.Component {
	render() {
		return (
            <div className="dashboard panel info user">
            	{this.props.username}
            </div>
        )
	}
}