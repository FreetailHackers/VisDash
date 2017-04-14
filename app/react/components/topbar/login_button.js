import React from 'react';
import ModalLogin from '../modal/login';
import store from '../../../redux/store';
import Editor from '../editor/editor';
import { post } from '../../../comm/comm';
import { updateEditing } from '../../../redux/actions';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            modalIsOpen: false,
			editorShown: false
        }
        this.attemptTokenLogin = this.attemptTokenLogin.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.hideEditor = this.hideEditor.bind(this);
    }

    componentDidMount() {
        this.attemptTokenLogin();
        store.subscribe(() => {
            let user = store.getState().user;
            if (this.state.user != user) {
                this.setState({user: user})
            }
            if (store.getState().editing != this.state.editorShown) {
                this.setState({editorShown: store.getState().editing});
                console.log("passed")
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
            if (token && !user) {
                post("/auth/login", {token: token}, user => this.setState({user: user}));
            }
        }
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    };

    showEditor() {
		//this.setState({editorShown: true});
        store.dispatch(updateEditing(true));
		console.log(this.state);
    }
    hideEditor() {
		//this.setState({editorShown: false});
        store.dispatch(updateEditing(false));
		console.log(this.state);
    }

    render() {
        var current_user = this.state.user;
        console.log(store.getState());
        var clickAction = null;
        if (this.state.modalIsOpen)
            clickAction = this.closeModal;
        else if (this.state.user && this.state.editorShown)
            clickAction = this.hideEditor;
        else if (this.state.user)
            clickAction = this.showEditor;
        else
            clickAction = this.openModal;

        return (
            <div>
                <div className={this.state.editorShown ? "primary close" : "primary"} onClick={clickAction}>
                    <div>
                        { (current_user != null) ? <i className="material-icons">add</i> : "log in" }
                    </div>
                </div>
                <ModalLogin
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                />
				<Editor isShown={this.state.editorShown} />
            </div>
        )
    }
}
