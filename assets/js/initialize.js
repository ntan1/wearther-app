// api key
const apiKey = "d8f37535a253b2bac1b2c2093df8cbf8";
// api urls
const currentUrl = "http://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?";
//gives the value of the slider 
let rangeValue = 2;

// placeholder city
let city = "toronto";
// api params
let params = {
    q: city,
    units: "metric",
    appid: apiKey
}
// weather data
current = {};
forecast = [];