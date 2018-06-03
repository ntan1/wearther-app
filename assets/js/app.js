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
        city = $('#city').val();

        params["q"] = city;

        let currentQ = currentUrl + $.param(params);
        let forecastQ = forecastUrl + $.param(params);

        // get current weather
        $.ajax({
            url: currentQ,
            method: "GET"
        }).then(function (res) {
            let weather = {
                sunrise: moment(res.sys.sunrise).format("hh:mm a"),
                sunset: moment(res.sys.sunset).format("hh:mm a"),
                description: res.weather[0].description, // more precise description e.g. light rain
                icon: res.weather[0].icon,
                main: res.weather[0].main, // main weather e.g rain
                wind: {
                    deg: res.wind.deg,
                    speed: res.wind.speed,
                }
            };
            current = res.main;
            for (let prop in weather) {
                current[prop] = weather[prop];
            }
            console.log(current);
        });

        // get forecast weather
        $.ajax({
            url: forecastQ,
            method: "GET"
        }).then(function (res) {
            for (let i = 0; i < res.list.length; i++) {
                data = res.list[i];
                let weather = {
                    dt: data.dt_txt,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    main: data.weather[0].main,
                    wind: {
                        deg: data.wind.deg,
                        speed: data.wind.speed,
                    },
                    rain: data.rain, // rain volume for last three hours
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    temp: data.main.temp,
                    temp_max: data.main.temp_max,
                    temp_min: data.main.temp_min,
                };
                forecast.push(weather);
            }
            console.log(forecast);
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
