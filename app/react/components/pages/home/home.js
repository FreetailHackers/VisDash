import React from 'react';
import Panel from './panel';
import store from '../../../../redux/store'
import fetchUsers from '../../../../redux/actions'

export default class Home extends React.Component {
    /*
     Initialize your component here. This usually involves creating
     your initial state, and binding functions to the class variable 'this'
     */
    constructor(props) {
    	super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.getUsers = this.getUsers.bind(this);

        // Test panel object; feel free to change this schema if necessary
        // There's probably a better way to do this
        this.panels = [
            {
                id: 1, // lol
                user: "KanyeWest",
                title: "Famous",
                likes: 4,
            },
        ]
    }

    getUsers() {
        return store.dispatch(fetchUsers());
    }
    /*
     *Fires after the component is mounted and the DOM is loaded
     *it would be useful to add event handlers here
     */
    componentDidMount() {
        console.log(this.getUsers());
    }

    /*
     This is useful for updating the component's state upon receiving
     a component property update, i.e. <MyComponent color='blue'> was
     changed to <MyComponent color='red'>.
    */
    componentWillReceiveProps(nextProps) {

    }

    /*
     Return false if a component should not be re-rendered
     upon a state change. No return or true return = AOK
     */
    shouldComponentUpdate(nextProps, nextState) {

    }

    handleTitleChange(id, title) {
        for (i = 0; i < this.panels.length; i++) {
            if (this.panels[i].id === id) {
                this.panels[i].title = title;
                break;
            }
        }
    }

    handleLike(id, liked) {
        const likes = this.panels[i].likes;
        for (i = 0; i < this.panels.length; i++) {
            if (this.panels[i].id === id) {
                this.panels[i].likes = liked ? likes + 1 : likes - 1;
                break;
            }
        }
    }

    render() {
        const testPanel = this.panels[0]
        return (
            <div className="dashboard">
                { /* Render all existing panels here */ }
                <Panel user={testPanel.user} title={testPanel.title} likes={testPanel.likes} onTitleChange={this.handleTitleChange}
                onLike={this.handleLike}/>
            </div>
        )
    }
}
