// get city weather data
function getCityData(city = "", callback) {
    if (!city) {
        $.ajax({
            url: "https://api.ipdata.co",
            method: "GET"
        }).then(function (response) {
            city = response.city;
            getForecastData(city, callback);
            getCurrentData(city, callback);
        });
    } else {
        getForecastData(city, callback);
        getCurrentData(city, callback);
    }
}

// query openweather api for 5days/3hours forecast
function getForecastData(city, callback) {
    params["q"] = city;
    let queryURL = forecastUrl + $.param(params);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("main").append(`<h2>Weather - ${response.city.name}</h2>`);
        for (let i = 0; i < response.list.length; i++) {
            let data = response.list[i];
            let temp = Math.ceil(data.main.temp);
            $("main").append(
                `<p>
                ${moment(data.dt_txt).format("M/D dd h:mm a")}
                <img class="weather-icon" src="${imgUrl}${data.weather[0].icon}.png">
                ${temp}°C
                ${data.weather[0].description}
                </p>`);
        }
        forecast = response.list;
        callback();
    });
}

// query openweather api for current weather
function getCurrentData(city, callback) {
    params["q"] = city;
    let queryURL = currentUrl + $.param(params);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        $("main").append(`<h2>Weather Current - ${response.name}</h2>`);
        let data = response.weather;
        let temp = Math.ceil(response.main.temp);
        $("main").append(
            `<p>
                <img class="weather-icon" src="${imgUrl}${data[0].icon}.png">
                ${temp}°C
                ${data[0].description}
                </p>`);
        current = response;
        callback();
    });
}