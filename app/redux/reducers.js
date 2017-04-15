import { combineReducers } from 'redux';
import { TOGGLE_PLAY, SET_TOKEN, SET_DROP_DOWN, SET_USER, SET_USER_AND_TOKEN, SET_TIME, SET_VOLUME, LOAD_STORED_STATE,
    USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE,
    USER_BY_ID_REQUEST, USER_BY_ID_SUCCESS, USER_BY_ID_FAILURE,
    CURR_ID_REQUEST, CURR_ID_SUCCESS, CURR_ID_FAILURE, SET_EDITING, UPDATE_LOGIN_OPEN, CLEAR_DATA, SET_EDITOR_CODE, SET_NOW_PLAYING } from "./actions";

const initialState = {
    playing: false,
    token: null,
    isFetching: false,
    isError: false,
    users: [],
    fetchedUser: {},
    currentId: '',
    editing: false,
    loginOpen: false,
    user: null,
    code: "",
    nowPlaying: null,
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case CLEAR_DATA:
            return Object.assign({}, state, initialState)
        case SET_EDITING:
            return Object.assign({}, state, {
                editing: action.editing,
            })
        case SET_NOW_PLAYING:
            return Object.assign({}, state, {
                nowPlaying: action.obj,
            })
        case SET_EDITOR_CODE:
            return Object.assign({}, state, {
                code: action.code,
                submission_id: action.submission_id,
            })
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
        case SET_VOLUME:
            return Object.assign({}, state, {
                volume: action.volume,
            })
        case SET_DROP_DOWN:
            return Object.assign({}, state, {
                dropDownOpen: action.dropDownOpen,
            })
        case LOAD_STORED_STATE:
            return action.storedState;
        case USERS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                users: state.users
            })
        case USERS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isError: false,
                users: action.payload // Contains the API response body
            })
        case USERS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isError: true,
                users: null
            })
        case USER_BY_ID_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                fetchedUser: state.fetchedUser
            })
        case USER_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isError: false,
                fetchedUser: action.payload // Contains the API response body
            })
        case USER_BY_ID_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isError: true,
                fetchedUser: null
            })
        case UPDATE_LOGIN_OPEN:
            return Object.assign({}, state, {
                loginOpen: action.login_open,
            })
        case CURR_ID_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                currentId: state.currentId
            })
        case CURR_ID_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                currentId: action.payload
            })
        case CURR_ID_FAILURE:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                currentId: null
            })
        default:
            return state;
    }
}

export default reducer
