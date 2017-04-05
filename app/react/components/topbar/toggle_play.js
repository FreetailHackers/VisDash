import React from 'react';

export default class Toggle extends React.Component {
    constructor() {
        super();
        this.state={
            status: 'Play',
        }
        this.toggleState = this.toggleState.bind(this);
    }

    toggleState() {
        var new_status = this.state.status == 'Play' ? 'Pause' : 'Play';
        this.setState({status: new_status});
    }

    render() {
        return (
            <div className="topbar-button toggle" onClick={this.toggleState}>
                {this.state.status}
            </div>
        )
    }
}