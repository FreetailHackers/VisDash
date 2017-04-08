import React from 'react';
import Modal from 'react-modal';
import store from '../../../redux/store'
import setUserAndToken from '../../../redux/actions'
import post from '../../../comm/comm'

export default class ModalLogin extends React.Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    submit() {
        var form = {username: this.refs.username.value, password: this.refs.password.value};
        post('/login', form, user => {
            if (user.token) {
                store.dispatch(setUserAndToken(user.user, user.token));
            }
        })
        if (!store.getState().user) {
            post('/register', form, user => {
                store.dispatch(setUserAndToken(user.user, user.token));
            })
        }
    }

    render() {
        return (       
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    onAfterOpen={this.props.onAfterOpen}
                    onRequestClose={this.props.onRequestClose}
                    contentLabel="Login"
                    >
                    <div>
                        You need to log in!
                        {/*I dont use a standard form here because I dont want
                        the page to refresh*/}
                        <form ref="login">
                            <input type="text" ref="username" name="username"/>
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