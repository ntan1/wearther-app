$(document).ready(function () {
    // get current city data
    getCityData("", function() {
        console.log(current);
        console.log(forecast);
    });
});
