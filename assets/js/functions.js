function toggleSearchBar() {
    if( $("#search-bar").css('height') == '100px') {
        // HIDE
        $("#search-bar").css({"height": "0px", "overflow": "hidden"});
    } else {
        // SHOW
        $("#search-bar").css({"height": "100px"});
    }
}

function updateAutocomplete(cityList) {
    if( $('#autocomplete-list').length ) {        // use this if you are using id to check
        $('#autocomplete-list').empty();
    }
    let list = $("<div>")
        .addClass("rounded")
        .attr("id", "autocomplete-list");
    for (let i = 0; i < cityList.length; i++) {
        let listItem = $("<div>")
            .addClass("autocomplete-list-item rounded")
            .attr("id", cityList[i].id)
            .data("name", cityList[i].name)
            .attr("onclick", "search(this.id)")
            .text(cityList[i].title)
        ;
        list.append(listItem);
    }
    $("#autocomplete").after(list);
}

function autocomplete(search) {
    // Builds an Array of 5 Objects
    // Each Object contains 2 properties - city name, city Id
    $.get(accuWeatherApi.query.autocomplete(search)).then(function(e) {
        let cityList = [];
        for(let i=1; i < 6; i++) {
            let city = {
                "title": e[i].LocalizedName + ", " + e[i].Country.LocalizedName,
                "name": e[i].LocalizedName,
                "id": e[i].Key
            }
            cityList.push(city);
        }
        // console.log(cityList);

        updateAutocomplete(cityList);
    })
}

function searchCity() {
    let search = $("#search-city").val();
    $.get(accuWeatherApi.query.cityName(search)).then(function(snapshot) {
        console.log(snapshot);
    })
}

function search(cityId) {
    let cityName = $(`#${cityId}`).data("name");
    accuWeatherApi.getData(cityId, cityName);
}

function updateCityData(d) {
    // Name
    cityData.name = d.name;
    // Hi
    cityData.hi = d.forecastDays5.DailyForecasts["0"].Temperature.Maximum.Value;
    // Low
    cityData.low = d.forecastDays5.DailyForecasts["0"].Temperature.Minimum.Value;
    // Description
    cityData.currentConditions.description = d.currentConditions.WeatherText;
    // Icon
    cityData.currentConditions.icon = d.currentConditions.WeatherIcon;
    // Temperature
    cityData.currentConditions.temperature = d.currentConditions.Temperature.Metric.Value;
    // Humidity
    cityData.currentConditions.humidity = d.currentConditions.RelativeHumidity;
    // Windspeed
    cityData.currentConditions.windspeed = d.currentConditions.Wind.Speed.Metric.Value;
    // UV Index
    // cityData.currentConditions.UVIndex = d.forecastDays5.DailyForecasts["0"].AirAndPollen[5].Value;
    // Real Feel
    cityData.currentConditions.realFeel = d.currentConditions.RealFeelTemperature.Metric.Value;
    // Sunrise
    cityData.currentConditions.sunrise = d.forecastDays5.DailyForecasts["0"].Sun.Rise;
    // Sunset
    cityData.currentConditions.sunset = d.forecastDays5.DailyForecasts["0"].Sun.Set;
    // Pollution
    // cityData.currentConditions.pollution.d.forecastDays5.DailyForecasts["0"].AirAndPollen["0"].Category;
    // Cloud Cover
    cityData.currentConditions.cloudCover = d.forecastDays5.DailyForecasts["0"].Day.CloudCover;
    // Precipitation
    cityData.currentConditions.precipitation = d.forecastDays5.DailyForecasts["0"].Day.PrecipitationProbability;

}

function updateCityHtml() {

}