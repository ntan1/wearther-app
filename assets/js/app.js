$(document).ready(function () {
    // get user city
    $.ajax({
        url: "https://api.ipdata.co",
        method: "GET"
    }).then(function (response) {
        city = response.city;
        // code to query weather api goes here for testing purposes
        // proper way to query is in functions.js, waiting for artur
        console.log(city)


        

    });

    const imgUrl = "https://openweathermap.org/img/w/";
    const apikey = "d8f37535a253b2bac1b2c2093df8cbf8";
    let params = {
        appid: apikey,
        q: city,
        units: "metric"
    };

    let url = "https://api.openweathermap.org/data/2.5/forecast?";
    testData("5day/3hr");
    url = "https://api.openweathermap.org/data/2.5/forecast/daily?";
    testData("16day");
    
    function testData(text="") {
        let queryURL = url + $.param(params);
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("main").append(`<h2>${text}</h2>`);
            console.log(response);
            for (let i=0; i< response.list.length; i++) {
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
        });
    }

});
