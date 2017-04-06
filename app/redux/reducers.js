import { combineReducers } from 'redux';
import { TOGGLE_PLAY } from "./actions";

const initialState = {
    playing: false,
    token: null,
}

function togglePlaying(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_PLAY:
            return Object.assign({}, state, {
                playing: !state.playing,
            }) 
        default:
            return state
    }
}

function loadSession(state = {}, action) {
    switch (action.type) {
        case 'LOAD_STORED_STATE':
            return action.storedState;
        default:
            return state;
    }
}

function changeToken(state = {}, action) {
    switch(action.type) {
        case 'SET_TOKEN':
            return Object.assign({}, state, {
                token: action.token,
            })
        default: 
            return state;
    }
}

const reducer = combineReducers({
    togglePlaying,
    loadSession,
    changeToken,
})

export default reducer