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

    $('#submitWeather').click(function (event) {
        event.preventDefault();
        console.log(rangeValue);
        city = $('#city').val();

        let queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=d8f37535a253b2bac1b2c2093df8cbf8";
        let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&APPID=d8f37535a253b2bac1b2c2093df8cbf8";

        console.log(city);
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            $('#data').append(res);
            console.log(res.main.temp);
        });

        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            $('#data').append(res);
            console.log(res.main.temp);
        });

        $('#formId')[0].reset();
    });

    $(function () {
        $("#slider-range-min").slider({
            range: "min",
            value: rangeValue,
            min: 1,
            max: 5,
            slide: function (event, ui) {
                rangeValue = ui.value;
                $("#amount").val("" + ui.value);
            }
        });

        $("#amount").val("" + $("#slider-range-min").slider("value"));
    });

});
