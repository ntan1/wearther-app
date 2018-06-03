$(document).ready(function () {
    // get current city weather
    $.ajax({
        url: "https://api.ipdata.co",
        method: "GET"
    }).then(function (response) {
        city = response.city;
        console.log(city);
        // code to query weather api goes here for testing purposes


    });

    $('#submitWeather').click(function (event) {
        event.preventDefault();
        console.log(rangeValue);
        city = $('#city').val();

        params["q"] = city;

        let queryURL1 = currentUrl + $.param(params);
        let queryURL = forecastUrl + $.param(params);

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
