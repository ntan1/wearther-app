$(document).ready(function () {
    // get user city
    $.ajax({
        url: "https://api.ipdata.co",
        method: "GET"
    }).then(function (response) {
        city = response.city;
        // code to query weather api goes here for testing purposes
        // proper way to query is in functions.js, waiting for artur



        

    });

});
