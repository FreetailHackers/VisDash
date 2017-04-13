import React from 'react';
import Panel from './panel';
import store from '../../../../redux/store'
import { fetchUsers, fetchUserById } from '../../../../redux/actions'

export default class Home extends React.Component {
    /*
     Initialize your component here. This usually involves creating
     your initial state, and binding functions to the class variable 'this'
     */
    constructor(props) {
    	super();

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.getUsers = this.getUsers.bind(this);

		this.panels = [];

		store.dispatch(fetchUsers())
 		   .then(() => {
				var submissions = [], things = store.getState().users.entities;
				for (var u in things) {
					if (things.hasOwnProperty(s)) {
						var id = Object.keys(things[u])[0], subs = things[u][id];
						for (var i = 0; i < subs.length; i++) {
							var s = subs[i];
							submissions.push({
								user: u.name,
								title: s.title,
								likes: s.likes.length
							});
						}
					}
				}
				this.panels = submissions;
				//console.log(this.panels);
				this.forceUpdate();
 		   })
 		   .catch(error => {
 			   console.error(error);
 		   });
        
        // const dummyId = store.getState().users.result[0];
        // console.log(dummyId);
        // store.dispatch(fetchUserById(dummyId))
        //     .then(() => {
        //         console.log(store.getState().currentUser);
        //     });
    }

    getUsers() {
        return store.dispatch(fetchUsers())
            .then(() => {
                console.log(store.getState().users);
            })
            .catch(error => {
                console.error(error);
            });
    }
    /*
     *Fires after the component is mounted and the DOM is loaded
     *it would be useful to add event handlers here
     */
    componentDidMount() {
	   // this.getUsers();
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
		if (this.panels.length > 0) {
			var items = [];
			for (var i = 0; i < this.panels.length; i++) {
				var panel = this.panels[i];
				items.push(<Panel user={panel.user} title={panel.title} likes={panel.likes} onTitleChange={this.handleTitleChange} onLike={this.handleLike} />);
			}
	        return (
	            <div className="dashboard">
	                { items }
	            </div>
	        )
		} else {
	        return (
	            <div className="dashboard">
	                <div className="empty">empty</div>
	            </div>
	        )
		}
    }
}
