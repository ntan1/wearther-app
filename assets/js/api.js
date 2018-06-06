const accuWeatherApi = {
    
    apiKey: "apikey=V4aG3RtbcCiHXiOvJQ7iXluxHYEvAhUY",
    apiKey1: "apikey=GlU6KaKPpPk9MyTvfMocJ9stJn7mMf1q",
    
    autocomplete: {
        url: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?`,
    },

    cityName: {
        url: "http://dataservice.accuweather.com/locations/v1/cities/search?",
    },

    currentConditions: {
        url: "http://dataservice.accuweather.com/currentconditions/v1/",
        details: "&details=true",
    },

    forecastHours12: {
        // Gets data for 12 hours starting at the end of the current hour
        url: "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/",
        details: "&details=true",
        metric: "&metric=true",
    },

    forecastDays5: {
        url: "http://dataservice.accuweather.com/forecasts/v1/daily/5day/",
        details: "&details=true",
        metric: "&metric=true",
    },

    query: {
        autocomplete: function(search) {
            return accuWeatherApi.autocomplete.url + accuWeatherApi.apiKey + "&q=" + search;
        },
        cityName: function(city) {
            return accuWeatherApi.cityName.url + accuWeatherApi.apiKey + "&q=" + city;
        },
        currentConditions: function(cityId) {
            return accuWeatherApi.currentConditions.url + cityId + "?" + accuWeatherApi.apiKey + accuWeatherApi.currentConditions.details;
        },
        forecastHours12: function(cityId) {
            return accuWeatherApi.forecastHours12.url + cityId + "?" + accuWeatherApi.apiKey + accuWeatherApi.forecastHours12.details; + accuWeatherApi.forecastHours12.metric;
        },
        forecastDays5: function(cityId) {
            return accuWeatherApi.forecastDays5.url + cityId + "?" + accuWeatherApi.apiKey + accuWeatherApi.forecastDays5.details; + accuWeatherApi.forecastDays5.metric;
        },
    },

    getData: function(cityId, cityName) {
        cityDataSet.name = cityName;
        $.get(accuWeatherApi.query.currentConditions(cityId))
        .then(function(data){ 
            cityDataSet.currentConditions = data[0];
            return $.get(accuWeatherApi.query.forecastHours12(cityId));
        }).then(function(data){ 
            cityDataSet.forecastHours12 = data;
            return $.get(accuWeatherApi.query.forecastDays5(cityId));
        }).then(function(data){ 
            cityDataSet.forecastDays5 = data;
            updateCityData(cityDataSet);
            console.log(cityDataSet);
            console.log(cityData);
        });
    }

}
