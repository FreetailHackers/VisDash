import { CALL_API } from 'redux-api-middleware';
import { normalize, schema } from 'normalizr';

const user = new schema.Entity('user');
const submission = new schema.Entity('submission');
const submissionList = [ submission ];
const userList = [ user ];

export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const SET_TOKEN   = "SET_TOKEN";
export const SET_USER   = "SET_USER";
export const SET_USER_AND_TOKEN = "SET_USER_AND_TOKEN";
export const LOAD_STORED_STATE = "LOAD_STORED_STATE";
export const SET_TIME   = "SET_TIME";
export const SET_VOLUME   = "SET_VOLUME";
export const SET_DROP_DOWN = "SET_DROP_DOWN";

export function togglePlay() {
    return { type: TOGGLE_PLAY };
}

export function setToken(token) {
    return {type: SET_TOKEN, token: token}
}

export function setUserAndToken(user, token) {
    return {type: SET_USER_AND_TOKEN, user: user, token: token}
}

export function setUser(user) {
    return {type: SET_USER, user: user}
}

export function updateTime(time) {
    return {type: SET_TIME, time: time}
}

export function updateVolume(volume) {
    return {type: SET_VOLUME, volume: volume}
}

export function setDropdownStatus() {
	return {
        type: SET_DROP_DOWN,
        dropDownOpen: true,
        preparingToCloseDropdown: false,
    }
}

export const USERS_REQUEST = 'users/REQUEST';
export const USERS_SUCCESS = 'users/SUCCESS';
export const USERS_FAILURE = 'users/FAILURE';

export function fetchUsers() {
	return {
		[CALL_API]: {
			endpoint: '/api/users',
			method: 'GET',
			types: [
				USERS_REQUEST,
				{
					type: USERS_SUCCESS,
					payload: (action, state, res) => {
						const contentType = res.headers.get('Content-Type');
						if (contentType && ~contentType.indexOf('json')) {
							return res.json().then((json) => normalize(json, userList));
						}
					}
				},
				{
					type: USERS_FAILURE,
					meta: (action, state, res) => {
						if (res) {
							return {
								status: res.status,
								statusText: res.statusText
							};
						} else {
							return {
								status: 'Network request failed'
							}
						}
					}
				}
			]
		}
	}
}

export const USER_BY_ID_REQUEST = 'users/:id/REQUEST';
export const USER_BY_ID_SUCCESS = 'users/:id/SUCCESS';
export const USER_BY_ID_FAILURE = 'users/:id/FAILURE';

export function fetchUserById(id) {
	return {
		[CALL_API]: {
			endpoint: '/api/users/${id}',
			method: 'GET',
			types: {
				USER_BY_ID_REQUEST,
				{
					type: USER_BY_ID_SUCCESS,
					payload: (action, state, res) => {
						const contentType = res.headers.get('Content-Type');
						if (contentType && ~contentType.indexOf('json')) {
							return res.json().then((json) => normalize(json, user));
						}
					}
				}
			},
			{
				type: USER_BY_ID_FAILURE,
				meta: (action, state, res) => {
					if (res) {
						return {
							status: res.status,
							statusText: res.statusText
						};
					} else {
						return {
							status: 'Network request failed'
						}
					}
				}
			}
		}
	}
}


