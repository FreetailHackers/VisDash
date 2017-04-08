export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const SET_TOKEN   = "SET_TOKEN";

export function togglePlay() {
    return { type: TOGGLE_PLAY };
}

export function setToken(token) {
    return { type: SET_TOKEN, token: token };
}