import store from '../redux/store.js';

function httpdo(type, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("x-access-token", store.getState().token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (callback) {
                callback(json);
            }
        }
    }
    var data = JSON.stringify(data);
    xhr.send(data);
}

export function get(url, callback) {
  httpdo('GET', url, null, callback);
}

export function post(url, data, callback) {
    httpdo('POST', url, data, callback)
}

export function httpdelete(url, data, callback) {
    httpdo('DELETE', url, data, callback)
}
