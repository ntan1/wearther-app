
// AUTOCOMPLETE
$("#search-city").on("keyup", function() {
    let search = $("#search-city").val();

    autocomplete(search);
});


// Forecast button click flip

/* 
$(".info-forecast").on("click", function(){
    var c = this.id;
    $(`#${c}`).css("transform", "rotateY(90deg)");
    $(`#${c} > .info-forecast-content`).html("<h2>24°</h2>")
    setTimeout(function() {
        // $(`#${c}`).css("transform", "scaleX(-1)");
        // $(`#${c}`).css("transform", "rotateY(0deg)");
    }, 1000 * 0.3);
});