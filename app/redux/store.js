import { createStore, applyMiddleware } from 'redux';
import { createSession } from 'redux-session';
import { apiMiddleware } from 'redux-api-middleware';
import reducer from './reducers'

const session = createSession({ ns: 'visdash' });
const store   = createStore(reducer, applyMiddleware(apiMiddleware, session));

export default store;
