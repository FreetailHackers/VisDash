import React from 'react';
import Modal from 'react-modal';
import store from '../../../redux/store'
import { setUserAndToken } from '../../../redux/actions'
import { post } from '../../../comm/comm'

export default class ModalLogin extends React.Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.state = {
            loggedIn: (store.getState().token != null),
        }
    }

    //Attempts to log the user in with their email and password before registering
    submit() {
        var form = {email: this.refs.email.value, password: this.refs.password.value};
        post('/auth/login', form, user => {
            if (user.token) {
                store.dispatch(setUserAndToken(user.user, user.token));
                this.setState({loggedIn: true});
            }
        })
        if (!this.state.loggedIn) {
            post('/auth/register', form, user => {
                store.dispatch(setUserAndToken(user.user, user.token));
                this.setState({loggedIn: true});
            })
        }
    }

    //This page will automatically be togglable once the user is no longer logged in.
    componentDidMount() {
        store.subscribe(() => {
            let userHasToken = (store.getState().token != null);
            if (this.state.loggedIn != userHasToken) {
                this.setState({loggedIn: userHasToken});
            }
        })
    }

    render() {
        return (       
            <div>
                <Modal
                    isOpen={this.props.isOpen && !this.state.loggedIn}
                    onAfterOpen={this.props.onAfterOpen}
                    onRequestClose={this.props.onRequestClose}
                    contentLabel="Login"
                    >
                    <div>
                        You need to log in!
                        {/*I dont use a standard form here because I dont want
                        the page to refresh*/}
                        <form ref="login">
                            <input type="text" ref="email" name="email"/>
                            <input type="password" ref="password" name="password"/>
                        </form>
                        <div className="button login" onClick={this.submit}>
                            login
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}