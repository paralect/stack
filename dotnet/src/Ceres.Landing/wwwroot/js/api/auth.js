var authApiBaseUrl = "http://localhost:34290/api/auth/";

var token_key = "ceres_access_token";
var username_key = "ceres_username";

function signIn(email, password, success, fail) {
    var loginModel = {
        Email: email,
        Password: password
    };

    $.ajax({
        type: 'POST',
        url: authApiBaseUrl + "signin",
        data: JSON.stringify(loginModel),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    })
        .success(function (data) {
            sessionStorage.setItem(token_key, data.token);
            sessionStorage.setItem(username_key, data.payload.sub);
            success(data);
        })
        .fail(function (data) {
            fail(data);
        });
}

function signUp(email, username, password, success, fail) {
    var registerModel = {
        Email: email,
        Username: username,
        Password: password
    };

    $.ajax({
        type: 'POST',
        url: authApiBaseUrl + "register",
        data: JSON.stringify(registerModel),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    })
        .success(function (data) {
            sessionStorage.setItem(token_key, data.token);
            sessionStorage.setItem(username_key, data.payload.sub);
            success(data);
        })
        .fail(function (data) {
           fail(data);
        });
}

function Logout(success) {
    sessionStorage.removeItem(token_key);
    sessionStorage.removeItem(username_key);
    success();
}

function getUser() {
    return sessionStorage.getItem(username_key);
}
