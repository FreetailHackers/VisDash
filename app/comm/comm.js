import store from '../redux/store.js';

function post(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("x-access-token", store.getState().token);
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            callback(json);
        }
    }
    var data = JSON.stringify(data);
    xhr.send(data);
}

export default post