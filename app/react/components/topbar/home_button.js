import React from 'react';
import { browserHistory } from 'react-router-dom';

export default class HomeButton extends React.Component {
    constructor() {
        super();
        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        browserHistory.push("/");
    }

    render() {
        return (
            <div className="topbar-button home">   
            </div>
        )
    }
}