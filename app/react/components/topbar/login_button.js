import React from 'react';
import ModalLogin from '../modal/login';
import store from '../../../redux/store';
import Editor from '../editor/editor';
import { post, get } from '../../../comm/comm';
import { setEditorState, updateEditing, updateLoginOpen, setUser } from '../../../redux/actions';

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
        get("/api/whoami", user => {
            if (user.status == 200) {
                this.setState({user: user});
                store.dispatch(setUser(user))

                console.log(store.getState());
                console.log("user updated");
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
        let loginOpen = store.getState().loginOpen;
        store.dispatch(updateLoginOpen(!loginOpen));
    }

    showEditor() {
		//this.setState({editorShown: true});
        let submission = new Object();
        submission.title = "untitled";
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

        let wrapper = new Object();
        wrapper.submission = submission;
        
        let user_has_untitled_submission = false;
        let user = store.getState().user;
        user.submissions.map(this_submission => {
            if (this_submission.title == submission.title) {
                user_has_untitled_submission = true;
                submission.likes = this_submission.likes;
                submission.code  = this_submission.code;
                submission._id   = this_submission._id;
            }
        })
        if (!user_has_untitled_submission) {
            post(`/api/users/${store.getState().user.id}/submissions/`, wrapper, output => {
                console.log(output);
                store.dispatch(setEditorState({
                    title: submission.title,
                    _id: output._id,
                    code: submission.code,

                }))
                console.log(store.getState());      
            });
        }
        else {
            store.dispatch(setEditorState({
                title: submission.title,
                _id: submission._id,
                code: submission.code,
            }))    
            msg.show("You must title your untitled project to create a new submission", {
                time: 5000,
                type: 'error'
            });
        }
        this.attemptTokenLogin();
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
