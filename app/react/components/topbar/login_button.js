import React from 'react';
import ModalLogin from '../modal/login';
import store from '../../../redux/store';
import Editor from '../editor/editor';
import { post, get } from '../../../comm/comm';
import { setEditorState, updateEditing, updateLoginOpen } from '../../../redux/actions';

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
        /*Attempt to verify*/   
        console.log(user);        
        get("/api/whoami", user => {
            console.log(user);
            if (user.status == 200) {
                this.setState({user: user});
                store.dispatch(setUser(user))
            }
            else {
                console.log(user.message);
            }
        });
        let storeState = store.getState();
        let token = storeState.token;
        let user  = storeState.user;
        if (user) {
            store.dispatch(updateLoginOpen(false));
        }
    }

    toggleModal() {
        var loginOpen = store.getState().loginOpen;
        store.dispatch(updateLoginOpen(!loginOpen));
    }

    showEditor() {
		//this.setState({editorShown: true});
        var submission = new Object();
        submission.title = "submission title";
        submission.code =
`var mapMax = 1.0; 
function setup() {
    background(0);
    fill(255);
    noStroke();
}
function draw() {
    background(0);
    var level = amp.getLevel();
    text("Amplitude: " + level, 20, 20);
    text("mapMax: " + mapMax, 20, 40);
    var ellipseHeight = map(level, 0, mapMax, height, 0);
    ellipse(width/2, ellipseHeight, 100, 100);
}`;
        submission.likes = 0;

        var wrapper = new Object();
        wrapper.submission = submission;
        post(`/api/users/${store.getState().user.id}/submissions/`, wrapper, output => {
            store.dispatch(setEditorState({
                title: submission.title,
                id: output.id,
                code: submission.code,
            }))
        });

        store.dispatch(updateEditing(true));
    }
    hideEditor() {
		//this.setState({editorShown: false});
        store.dispatch(updateEditing(false));
    }

    render() {
        var current_user = this.state.user;
        var clickAction = null;
        if (!current_user)
            clickAction = this.toggleModal
        if (this.state.user && this.state.editorShown)
            clickAction = this.hideEditor;
        else if (this.state.user)
            clickAction = this.showEditor;
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
