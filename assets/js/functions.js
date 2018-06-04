// get weather data
function getWeatherData(city) {
    // clear existing data
    current = {};
    forecast = [];
    daily = [];
    hourly = [];
    // set city in parmas
    params["q"] = city;
    // build api url
    let currentQ = currentUrl + $.param(params);
    let forecastQ = forecastUrl + $.param(params);
    // date counter
    let dateCounter = [];

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
            // move only relevant data to variables (needed?)
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

            // create daily weather data
            let date = moment(data.dt_txt).format("MM/DD");
            if (!dateCounter.includes(date) && dateCounter.length < rangeValue) {
                let dailyWeather = {
                    date: date,
                    temp: [Math.ceil(data.main.temp)]
                }
                daily.push(dailyWeather);
                dateCounter.push(date);
            } else if (dateCounter.includes(date)) {
                let index = daily.findIndex(function (day) {
                    return day.date === date;
                });
                daily[index].temp.push(Math.ceil(data.main.temp));
            }

            // create 24hr data
            if (i <= 8) {
                let hourlyWeather = {
                    date: moment(data.dt_txt).format("M/D h a"),
                    temp: Math.ceil(data.main.temp)
                }
                hourly.push(hourlyWeather);
            }

            forecast.push(weather);
        }
        getAverageTemp();
        console.log(daily);
        console.log(hourly);
        console.log(forecast);

    });
}

function getAverageTemp() {
    for (let i = 0; i < daily.length; i++) {
        let sum = 0;
        for (let a = 0; a < daily[i].temp.length; a++) {
            sum += daily[i].temp[a];
        }
        daily[i].temp = Math.ceil(sum / daily[i].temp.length);
    }
}