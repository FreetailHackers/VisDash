import React from 'react';
import VisDisplay from './vis_display';
import VisInfo from './vis_info';

export default class Panel extends React.Component {
	changeTitle() {
		this.setState()
	}

	handleChange(e) {
		this.props.onTitleChange(e.target.value);
	}

	render() {
		return (
            <div className="dashboard panel">
            	<VisDisplay/>
            	<VisInfo username={this.props.user} title={this.props.title} likes={this.props.likes}/>
            </div>
        )
	}
}