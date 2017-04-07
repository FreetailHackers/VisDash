import React from 'react';
import store from '../../../redux/store';
import { togglePlay } from '../../../redux/actions';

export default class Toggle extends React.Component {
    constructor() {
        super();
        let storeState = store.getState();
        this.state={
            status: storeState.playing ? 'Pause' : 'Play',
        }
        this.toggleState = this.toggleState.bind(this);
    }

    toggleState() {
        var new_status = this.state.status == 'Play' ? 'Pause' : 'Play';
        this.setState({status: new_status});
        store.dispatch(togglePlay());
    }

    componentDidMount() {
        // store.subscribe(() => console.log(store.getState()));
    }

    render() {
        return (
            <div className="topbar-button toggle" onClick={this.toggleState}>
                {this.state.status}
            </div>
        )
    }
}