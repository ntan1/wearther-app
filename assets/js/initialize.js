// img url for weather icons
const imgUrl = "https://openweathermap.org/img/w/";
// api url for 5days/3hours forecast
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
// api url for 5days/3hours forecast
const currentUrl = "http://api.openweathermap.org/data/2.5/weather?";
// api key
const apikey = "d8f37535a253b2bac1b2c2093df8cbf8";

let city = "beirut";
let params = {
    appid: apikey,
    q: city,
    units: "metric"
};
// weather data
let current = {};
let forecast = {};


