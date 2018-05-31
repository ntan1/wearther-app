$(document).ready(function () {
    console.log(userip);

    // get user city
    $.get("https://api.ipdata.co", function (response) {
        console.log(response.city);
    }, "jsonp");
});
