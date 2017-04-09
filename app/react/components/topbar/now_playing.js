import React from 'react';

export default class NowPlaying extends React.Component {
    constructor() {
        super();
        this.state={
            
        }
    }

    render() {
        return (
        	<div className="playing">{this.props.artist} - {this.props.title}</div>
        )
    }
}
