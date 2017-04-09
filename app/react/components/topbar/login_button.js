import React from 'react';
import ModalLogin from '../modal/login'
import store from '../../../redux/store'
import post from '../../../comm/comm'

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            modalIsOpen: false,
        }
        this.attemptTokenLogin = this.attemptTokenLogin.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.attemptTokenLogin();
    }

    attemptTokenLogin() {
        if (this.state.user == null) {
            /*Attempt to verify*/
            let token = store.getState().token;
            if (token) {
                post("/login", {token: token}, user => this.setState({user: user}));
            }
        }
    }

    loginUser(username, password) {
        attemptTokenLogin();
    };

    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    };
    afterOpenModal() {
    }

    createSubmission() {

    }

    render() {
        var current_user = this.state.user;
        var clickAction = null;
        if (this.state.modalIsOpen)
            clickAction = this.closeModal;
        else if (this.state.user)
            clickAction = this.createSubmission;
        else
            clickAction = this.openModal;

        return (
            <div>
                <div className="primary" onClick={clickAction}>
                    <div>log in</div>
                </div>
                <ModalLogin
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                />
            </div>
        )
    }
}
