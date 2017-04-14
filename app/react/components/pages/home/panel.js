import React from 'react';
import VisDisplay from './vis_display';
import VisInfo from './vis_info';

export default class Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			likes: this.props.likes,
		}
	}

	/*
     *Fires after the component is mounted and the DOM is loaded
     *it would be useful to add event handlers here
     */
    componentDidMount() {

    }

	render() {
		return (
            <div className="item">
            	<VisDisplay code={this.props.code} canvasID={this.props.id}/>
            	<VisInfo username={this.props.user} title={this.props.title} likes={this.props.likes} id={this.props.id}/>
            </div>
        )
	}
}

Panel.defaultProps = {
	title: 'Untitled',
	likes: 0,
};

Panel.propTypes = {
	user: React.PropTypes.string.isRequired,
	title: React.PropTypes.string,
	likes: React.PropTypes.number,
	onTitleChange: React.PropTypes.func.isRequired,
	onLike: React.PropTypes.func.isRequired,
};
