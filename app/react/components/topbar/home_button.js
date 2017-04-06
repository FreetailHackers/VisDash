import React from 'react';
import { browserHistory } from 'react-router';

export default class HomeButton extends React.Component {
    constructor() {
        super();
        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        this.context.history.push('/cart');
    }

    render() {
        return (
            <div className="topbar-button home" onClick={this.redirect}>   
            </div>
        )
    }
}