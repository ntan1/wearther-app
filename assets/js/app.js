$(document).ready(function () {
    // get current city weather
    $.ajax({
        url: "https://api.ipdata.co",
        method: "GET"
    }).then(function (response) {
        city = response.city;
        params["q"] = city;
        console.log(city);
        getWeatherData(city);
    });

    $('#submitWeather').click(function (event) {
        event.preventDefault();
        if ($('#city').val() !== "") {
            city = $('#city').val();
        }
        getWeatherData(city);
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
