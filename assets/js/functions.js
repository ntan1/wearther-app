// get weather data
function getWeatherData(city) {
    // clear existing data
    current = {};
    forecast = [];
    daily = [];
    hourly = [];
    // set city in parmas
    params["q"] = city;
    // build api url
    let currentQ = currentUrl + $.param(params);
    let forecastQ = forecastUrl + $.param(params);
    // date counter
    let dateCounter = [];

    // get current weather
    $.ajax({
        url: currentQ,
        method: "GET"
    }).then(function (res) {
        let weather = {
            sunrise: moment(res.sys.sunrise).format("hh:mm a"),
            sunset: moment(res.sys.sunset).format("hh:mm a"),
            description: res.weather[0].description, // more precise description e.g. light rain
            icon: res.weather[0].icon,
            main: res.weather[0].main, // main weather e.g rain
            wind: {
                deg: res.wind.deg,
                speed: res.wind.speed,
            }
        };
        current = res.main;
        for (let prop in weather) {
            current[prop] = weather[prop];
        }
        console.log(current);
    });

    // get forecast weather
    $.ajax({
        url: forecastQ,
        method: "GET"
    }).then(function (res) {
        for (let i = 0; i < res.list.length; i++) {
            data = res.list[i];
            // move only relevant data to variables (needed?)
            let weather = {
                dt: data.dt_txt,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                main: data.weather[0].main,
                wind: {
                    deg: data.wind.deg,
                    speed: data.wind.speed,
                },
                rain: data.rain, // rain volume for last three hours
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
            };

            // create daily weather data
            let date = moment(data.dt_txt).format("MM/DD");
            if (!dateCounter.includes(date) && dateCounter.length < rangeValue) {
                let dailyWeather = {
                    date: date,
                    temp: [Math.ceil(data.main.temp)],
                    icon: data.weather[0].icon,
                    description: data.weather[0].description
                }
                daily.push(dailyWeather);
                dateCounter.push(date);
            } else if (dateCounter.includes(date)) {
                let index = daily.findIndex(function (day) {
                    return day.date === date;
                });
                daily[index].temp.push(Math.ceil(data.main.temp));
            }

            // // create 24hr data
            // if (i <= 8) {
            //     let hourlyWeather = {
            //         date: moment(data.dt_txt).format("M/D h a"),
            //         temp: Math.ceil(data.main.temp)
            //     }
            //     hourly.push(hourlyWeather);
            // }

            // create hourly data
            rangeValue = rangeValue < 2 ? 2 : rangeValue;
            if (i <= frequency * rangeValue) {
                let hourlyWeather = {
                    date: moment(data.dt_txt).format("M/D h a"),
                    temp: Math.ceil(data.main.temp),
                    icon: data.weather[0].icon,
                    description: data.weather[0].description
                }
                hourly.push(hourlyWeather);
            }

            forecast.push(weather);
        }
        getAverageTemp();
        console.log(daily);
        console.log(hourly);
        console.log(forecast);
        $("#loading").show();
        $("#chart").html("<img src='assets/images/loading.gif'>");
        setTimeout(function () {
            drawChart(hourly, "Hourly");
            $("#hourly").click();
            generateTable(hourly, 1, limit);
        }, 500);
    });
}

function getAverageTemp() {
    for (let i = 0; i < daily.length; i++) {
        let sum = 0;
        for (let a = 0; a < daily[i].temp.length; a++) {
            sum += daily[i].temp[a];
        }
        daily[i].temp = Math.ceil(sum / daily[i].temp.length);
    }
}

// Creates a chart using D3
function drawChart(data, heading = "") {
    d3.select("#chart").html("");
    $("#chart").append(`<h2>Weather ${city} - ${heading}</h2>`);

    let margin = { top: 20, right: 80, bottom: 30, left: 50 },
        frame = { width: 750, height: 500 },
        width = frame.width - margin.left - margin.right,
        height = frame.height - margin.top - margin.bottom;

    // handle different date formats with hourly and daily data
    let parseTime = d3.timeParse('%m/%d');
    if (data[0].date.length > 5) {
        parseTime = d3.timeParse('%m/%d %I %p');
    }

    let x = d3.scaleTime()
        .range([0, width]);

    let y = d3.scaleLinear()
        .range([height, 0]);

    let temperatureLine = d3.line()
        .x(function (d) { return x(parseTime(d.date)); })
        .y(function (d) { return y(d.temp); });

    let svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(d3.extent(data, function (d) { return parseTime(d.date); }));
    y.domain(d3.extent(data, function (d) { return d.temp; }));

    // draw x-axis
    svg.append('g')
        .style('font-size', '12px')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // draw temperature y axis
    svg.append('g')
        .style('font-size', '12px')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y))
        .append('text')
        .attr("fill", "#000")
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Temperature (°C)');

    // plot temperature values
    svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', temperatureLine)
        .attr("stroke", "#003eff")
        .attr("stroke-width", 4)
        .attr("fill", "none");
}

function generateTable(arr, page, limit) {
    $("#table-weather").find("tbody").html("");
    console.log(page);
    console.log(limit);
    let maxLength = page * limit > arr.length ? arr.length : page * limit;
    console.log("maxLength: " + maxLength);
    for (let i = (page - 1) * limit; i < maxLength; i++) {
        let tr = $("<tr>");
        $(tr).append(`<td>${arr[i].date}</td>`);
        $(tr).append(`<td><img src='${imgUrl}${arr[i].icon}.png'></td>`);
        $(tr).append(`<td>${arr[i].temp}</td>`);
        $(tr).append(`<td>${arr[i].description}</td>`);
        $("#table-weather").find("tbody").append(tr);
    }
    $(".pagination").html("");
    for (let i = 1; i <= Math.ceil(arr.length / limit); i++) {
        let btn = $("<li class='page-item'>");
        if (i === page) {
            btn = $("<li class='page-item active'>");
        }
        $(btn).append(`<a class='page-link' href='#'>${i}</a>`);
        $(".pagination").append(btn);
    }
}

function changePage(page) {
    if (toggle === "hourly") {
        generateTable(hourly, page, limit);
    } else if (toggle === "daily") {
        generateTable(daily, page, limit);
    }
}