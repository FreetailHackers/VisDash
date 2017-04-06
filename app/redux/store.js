import { createStore, applyMiddleware } from 'redux';
import { createSession } from 'redux-session';
import reducer from './reducers'

const session = createSession({ ns: 'visdash' });
const store   = createStore(reducer, applyMiddleware(session));

export default store;
