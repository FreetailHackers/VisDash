export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const SET_TOKEN   = "SET_TOKEN";
export const SET_USER   = "SET_USER";
export const SET_USER_AND_TOKEN = "SET_USER_AND_TOKEN";
export const LOAD_STORED_STATE = "LOAD_STORED_STATE";
export const SET_TIME   = "SET_TIME";
export const SET_VOLUME   = "SET_VOLUME";

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
