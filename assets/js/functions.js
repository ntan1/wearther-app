function toggleSearchBar() {
    if( $("#search-bar").css('height') == '100px') {
        // HIDE
        $("#search-bar").css("height", "0px");
    } else {
        // SHOW
        $("#search-bar").css("height", "100px");
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
                "id": e[i].Key
            }
            cityList.push(city);
        }
        console.log(cityList);

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
    $.get(accuWeatherApi.query.currentConditions(cityId)).then(function(data) {
        console.log(data[0]);
        return $.get(accuWeatherApi.query.forecastHours12(cityId))
    })
    .then(function(data){
        console.log(data);
    })
 
}