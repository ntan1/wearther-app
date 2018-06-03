// get weather data
function getWeatherData(city) {
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
}