import { CALL_API } from 'redux-api-middleware';
import { schema, Array, normalize } from 'normalizr';

const submissionSchema = schema.Entity('submissions');
const submissionListSchema = [ submissionSchema ];
const userSchema = schema.Entity('users', { submissions: submissionListSchema }, {
	processStrategy: (user) => omit(user, ['_id', 'email', '__v', 'timestamp'])
});
const responseSchema = { users: [ userSchema ] };

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

<<<<<<< HEAD
export function setDropdownStatus() {
	return {
        type: SET_DROP_DOWN,
        dropDownOpen: true,
        preparingToCloseDropdown: false,
    }
=======
const USERS_REQUEST = 'users/REQUEST';
const USERS_SUCCESS = 'users/SUCCESS';
const USERS_FAILURE = 'users/FAILURE';

export function fetchUsers() {
	return {
		[CALL_API]: {
			endpoint: `/api/users`,
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			types: [
				USERS_REQUEST, 
				{
					type: USERS_SUCCESS,
					payload: (action, state, res) => {
						const contentType = res.headers.get('Content-Type');
						if (contentType && ~contentType.indexOf('json')) {
							return res.json().then((json) => normalize(json, responseSchema))
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
>>>>>>> 600ca1c89f5edc061fb03d2c8c4dd1f2a3572086
}
