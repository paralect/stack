function callApi(apiName, apiMethod, httpMethod, data, authenticate, success, fail) {
    var apiCallUrl = "http://localhost:34290/api/" + apiName + "/" + apiMethod;
    $.ajax({
        type: httpMethod,
        url: apiCallUrl,
        data: JSON.stringify(data),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    })
        .success(function (data) {
            if (success != null) {
                success(data);
            }
        })
        .fail(function (data) {
            if (fail != null) {
                fail(data);
            }
        });
}