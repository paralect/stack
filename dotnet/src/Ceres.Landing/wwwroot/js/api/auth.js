var authApiBaseUrl = "http://localhost:34290/api/auth/";

var token_key = "ceres_access_token";
var username_key = "ceres_username";

function signIn(email, password, success, fail) {
    var loginModel = {
        Email: email,
        Password: password
    };

    callApi("auth", "signin", "POST", loginModel, true, function (data) {
            sessionStorage.setItem(token_key, data.token);
            sessionStorage.setItem(username_key, data.payload.sub);
            success(data);
        }, fail);
}

function signUp(email, username, password, success, fail) {
    var registerModel = {
        Email: email,
        UserName: username,
        Password: password
    };

    callApi("auth", "register", "POST", registerModel, false, function(data) {
            sessionStorage.setItem(token_key, data.token);
            sessionStorage.setItem(username_key, data.payload.sub);
            success(data);
        }, fail);
}

function Logout(success) {
    sessionStorage.removeItem(token_key);
    sessionStorage.removeItem(username_key);
    success();
}

function getUser() {
    return sessionStorage.getItem(username_key);
}
