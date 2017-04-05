import React from 'react';
import VisDisplay from './vis_display';
import VisInfo from './vis_info';

export default class Panel extends React.Component {
	render() {
		return (
            <div className="dashboard panel">
            	<VisDisplay/>
            	<VisInfo/>
            </div>
        )
	}
}