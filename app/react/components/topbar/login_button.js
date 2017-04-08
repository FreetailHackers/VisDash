import React from 'react';
import store from '../../../redux/store'
import post from '../../../comm/comm'

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        if (this.state.user == null) {
            /*Attempt to verify*/
            let token = store.getState().token;
            if (token) { 
                post("/login", {token: token}, user => this.setState({user: user}));
            }
        }
    }

    render() {
        var current_user = this.state.user;
        return (
            <div className="topbar-button login">
                {JSON.stringify(current_user)};
            </div>
        )
    }
}