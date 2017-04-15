import React from 'react';
import Modal from 'react-modal';
import AlertContainer from 'react-alert';
import store from '../../../redux/store';
import { setUserAndToken, updateLoginOpen } from '../../../redux/actions';
import { post } from '../../../comm/comm';

export default class ModalLogin extends React.Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.state = {
            loginOpen: store.getState().login_open,
        }
        this.showAlert = this.showAlert.bind(this);
    }

    //Attempts to log the user in with their email and password before registering
    submit(e) {
        var form = {email: this.refs.email.value, password: this.refs.password.value};
        post('/auth/login', form, user => {
            if (user.token) {
                store.dispatch(setUserAndToken(user.user, user.token));
                store.dispatch(updateLoginOpen(false));
            }
        })
        if (!this.state.loggedIn) {
            post('/auth/register', form, response => {
                if (response.status == 200) {
                    store.dispatch(setUserAndToken(response.user, response.token));
                    store.dispatch(updateLoginOpen(false));
                }
                else if (response.status == 400) {
                    this.showAlert(response.message);
                }
            })
        }
		e.preventDefault();
    }

    //This page will automatically be togglable once the user is no longer logged in.
    componentDidMount() {
        store.subscribe(() => {
            let login_open = store.getState().loginOpen;
            if (this.state.loginOpen != login_open) {
                this.setState({loginOpen: login_open});
            }
        })
    }

    showAlert(error){
      msg.show(error, {
        time: 2000,
        type: 'error'
      });
    }

    render() {
        return (
            <div>
                <Modal className = "loginmodal"
                    isOpen={this.state.loginOpen}
                    onAfterOpen={this.props.onAfterOpen}
                    onRequestClose={this.props.onRequestClose}
                    contentLabel="Login">
                    <div>
                        You need to log in!
                        {/*I dont use a standard form here because I dont want
                        the page to refresh*/}

                        <form className="form" ref="login" onSubmit={this.submit}>
                    			<input type="text" ref="email" name="email" placeholder="E-mail Address"></input>
                    			<input type="password" ref="password" name="password" placeholder="Password"></input>
                    			<button type="submit" id="login-button" className = "login">Login or Sign Up</button>
                    		</form>
                    </div>
                </Modal>
                <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
            </div>
        )
    }
}
