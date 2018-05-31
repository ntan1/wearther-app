// get city
function getCityData(city="") {
    var data;
    if (!city) {
        $.ajax({
            url: "https://api.ipdata.co",
            method: "GET"
        }).then(function(response) {
            city = response.city;
            data = getData(city);
        });
    } else {
        data = getData(city);
        return data;
    }
}

// query openweather api - Artur's code goes below
function getData(city) {
    
}