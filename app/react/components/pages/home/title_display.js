import React from 'react';

export default class TitleDisplay extends React.Component {
	render() {
		return (
            <div className="dashboard panel info title">
            	{this.props.title}
            </div>
        )
	}
}