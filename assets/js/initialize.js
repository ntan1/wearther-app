// api key
const apiKey = "d8f37535a253b2bac1b2c2093df8cbf8";
// api urls
const currentUrl = "http://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?";
// img url for weather icons
const imgUrl = "https://openweathermap.org/img/w/";
//gives the value of the slider 
let rangeValue = 2;
// frequency of data returned per day (api returns data per 3 hrs)
let per = 3;
let frequency = 24 / per;

// placeholder city
let city = "toronto";
// api params
let params = {
    q: city,
    units: "metric",
    appid: apiKey
}
// weather data
let current = {};
let forecast = [];
let daily = [];
let hourly = [];
// button state
let toggle = "hourly";
let limit = +$(".pagination").data("limit");