import { combineReducers } from 'redux';
import { TOGGLE_PLAY, SET_TOKEN } from "./actions";

const initialState = {
    playing: false,
    token: null
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_TOKEN:
            return Object.assign({}, state, {
                token: action.token,
            })
        case 'LOAD_STORED_STATE':
            return action.storedState;
        case TOGGLE_PLAY:
            return Object.assign({}, state, {
                playing: !state.playing,
            })
        default:
            return state;
    }
}

export default reducer
