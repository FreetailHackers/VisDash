import { combineReducers } from 'redux';
import { TOGGLE_PLAY, SET_TOKEN, SET_USER, SET_USER_AND_TOKEN, SET_TIME, LOAD_STORED_STATE } from "./actions";

const initialState = {
    playing: false,
    token: null,
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_TOKEN:
            return Object.assign({}, state, {
                token: action.token,
            })
        case SET_USER:
            return Object.assign({}, state, {
                user: action.user
            })
        case SET_USER_AND_TOKEN:
            return Object.assign({}, state, {
                user: action.user,
                token: action.token,
            })
        case TOGGLE_PLAY:
            return Object.assign({}, state, {
                playing: !state.playing,
            })
        case SET_TIME:
            return Object.assign({}, state, {
                time: action.time,
            })
        case LOAD_STORED_STATE:
            return action.storedState;
        default:
            return state;
    }
}

export default reducer
