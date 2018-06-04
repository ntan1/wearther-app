// Todo: disable chart toggle buttons on search
// Todo: display icons on x-axis of chart
// Todo: chart change on slider change
// Todo: different loading gif, transparent bg if possible
// Todo: animated line drawing
// Todo: make chart look nicer

$(document).ready(function () {
    // get current city weather
    $.ajax({
        url: "https://api.ipdata.co",
        method: "GET"
    }).then(function (response) {
        city = response.city;
        params["q"] = city;
        console.log(city);
        getWeatherData(city);
        setTimeout(function () { drawChart(hourly, "Hourly") }, 500);
    });

    // when submit button clicked
    $('#submitWeather').on("click", function (event) {
        event.preventDefault();
        if ($('#city').val() !== "") {
            city = $('#city').val();
        }
        $("#loading").show();
        $("#chart").html("<img src='assets/images/loading.gif'>")
        getWeatherData(city);

        setTimeout(function () {
            drawChart(hourly, "Hourly");
            $("#hourly").click();
        }, 500);
        $('#formId')[0].reset();
    });

    // when daily/hourly toggle clicked
    $("#chart-container").on("click", ".btn", function () {
        let name = $(this).find("input").attr("id");
        if (name === "daily") {
            drawChart(daily, "Daily");
        } else if (name === "hourly") {
            drawChart(hourly, "Hourly");
        }
    });

    // slider
    $(function () {
        $("#slider-range-min").slider({
            range: "min",
            value: rangeValue,
            min: 1,
            max: 5,
            slide: function (event, ui) {
                rangeValue = ui.value;
                $("#amount").val("" + ui.value);
            }
        });

        $("#amount").val("" + $("#slider-range-min").slider("value"));
    });
});
