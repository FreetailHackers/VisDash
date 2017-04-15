import React from 'react';
import Panel from './panel';
import store from '../../../../redux/store'
import { fetchUsers, fetchUserById, setUser } from '../../../../redux/actions'
import { get } from '../../../../comm/comm'
import AlertContainer from 'react-alert';

export default class Home extends React.Component {
    /*
     Initialize your component here. This usually involves creating
     your initial state, and binding functions to the class variable 'this'
     */
    constructor(props) {
    	super();

      this.alertOptions = {
        offset: 14,
        position: 'bottom left',
        theme: 'light',
        time: 5000,
        transition: 'scale'
      };

      this.state = {
          likes: [],
      }

      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleLike = this.handleLike.bind(this);
      this.getUsers = this.getUsers.bind(this);
      this.fetchSubmissions = this.fetchSubmissions.bind(this);

		this.panels = [];

    this.fetchSubmissions();
    }

    getUsers() {
        return store.dispatch(fetchUsers())
            .then(() => {
                console.log(store.getState().users);
            })
            .catch(error => {
                this.showAlert();
            });
    }

    fetchSubmissions() {
        store.dispatch(fetchUsers())
           .then(() => {
                var submissions = [], ids = store.getState().users.result;
                var users = store.getState().users.entities.user;
                console.log(users);
                for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];
                    if (users[id].hasOwnProperty("submissions") && users[id].submissions.length > 0) {
                        var tempSubmissions = users[id].submissions;

                        tempSubmissions.map((s) => {
                          submissions.push({
                              id: s._id,
                              user: users[id].name,
                              code: s.code,
                              title: s.title,
                              likes: s.likes
                          });
                        })
                    }
                }
                this.panels = submissions;
                this.forceUpdate();
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
       store.subscribe(() => {
           var current_user = store.getState().user;
           if (current_user && this.state.likes != current_user.likes) {
                this.setState({likes: store.getState().user.likes});
           }
       })
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
      return true;
    }

    handleTitleChange(id, title) {
        for (i = 0; i < this.panels.length; i++) {
            if (this.panels[i].id === id) {
                this.panels[i].title = title;
                break;
            }
        }
    }

    handleLike() {
        // const likes = this.panels[i].likes;
        // for (i = 0; i < this.panels.length; i++) {
        //     if (this.panels[i].id === id) {
        //         this.panels[i].likes = liked ? likes + 1 : likes - 1;
        //         break;
        //     }
        // }
        this.forceUpdate();
    }

    showAlert(){
      msg.show('An Error Occured', {
        time: 2000,
        type: 'error'
      });
    }

    render() {
		if (this.panels.length > 0) {
			var items = [];
			for (var i = 0; i < this.panels.length; i++) {
				var panel = this.panels[i];
				items.push(<Panel user={panel.user} title={panel.title} likes={panel.likes} code={panel.code} onTitleChange={this.handleTitleChange} onLike={this.handleLike} id={panel.id} key={panel.id}/>);
			}
			for (let i = items.length; i; i--) {
				let j = Math.floor(Math.random() * i);
				[items[i - 1], items[j]] = [items[j], items[i - 1]];
			}
	        return (
	            <div className="dashboard">
	                { items }
                  <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
	            </div>
	        )
		} else {
	        return (
	            <div className="dashboard">
	                <div className="empty">empty</div>
                  <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
	            </div>
	        )
		}
    }
}
