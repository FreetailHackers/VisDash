import React from 'react';
import ModalLogin from '../modal/login';
import store from '../../../redux/store';
import Editor from '../editor/editor';
import { post } from '../../../comm/comm';
import { updateEditing, updateLoginOpen } from '../../../redux/actions';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
			editorShown: false
        }
        this.attemptTokenLogin = this.attemptTokenLogin.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.hideEditor = this.hideEditor.bind(this);
    }

    componentDidMount() {
        this.attemptTokenLogin();
        let user = store.getState().user;
        this.setState({user: user});
        store.subscribe(() => {
            let user = store.getState().user;
            if (this.state.user != user) {
                this.setState({user: user})
            }
            if (store.getState().editing != this.state.editorShown) {
                this.setState({editorShown: store.getState().editing});
            }
        })
    }

    //Sets this components user state if token is found
    attemptTokenLogin() {
        if (this.state.user == null) {
            /*Attempt to verify*/
            let storeState = store.getState();
            let token = storeState.token;
            let user  = storeState.user;
            if (user) {
                updateLoginOpen(false);
            }
            if (token && !user) {
                post("/auth/login", {token: token}, user => {
                    this.setState({user: user});
                    updateLoginOpen(false);
                });
            }
        }
    }

    toggleModal() {
        loginOpen = store.getState().loginOpen;
        store.dispatch(updateLoginOpen(!loginOpen));
    }
    showEditor() {
		//this.setState({editorShown: true});
        store.dispatch(updateEditing(true));
    }
    hideEditor() {
		//this.setState({editorShown: false});
        store.dispatch(updateEditing(false));
    }

    render() {
        var current_user = this.state.user;
        var clickAction = null;
        if (this.state.user && this.state.editorShown)
            clickAction = this.hideEditor;
        else if (this.state.user)
            clickAction = this.showEditor;
        else
            clickAction = this.toggleModal;

        return (
            <div>
                <div className={this.state.editorShown ? "primary close" : "primary"} onClick={clickAction}>
                    <div>
                        { (current_user != null) ? <i className="material-icons">add</i> : "log in" }
                    </div>
                </div>
                <ModalLogin
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                />
				<Editor isShown={this.state.editorShown} />
            </div>
        )
    }
}
