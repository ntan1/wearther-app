// AUTOCOMPLETE
// Runs everytime an character is input into the search bar
$("#search-city").on("keyup", function() {
    let search = $("#search-city").val();
    autocomplete(search);
});

// SETTINGS BUTTON
// Triggers the size change for the div
$(".settings-btn").on("click", function(e){    
    if($(`#${this.id}`).css("width") === "65px") {
        $(`#${this.id}`).css({"width": "540px", 
        "height": "300px",
        });
    } else {
        $(`#${this.id}`).css({"width": "65px", 
        "height": "65px",
    });
    }
})



/*
// Forecast button click flip 
$(".info-forecast").on("click", function(){
    var c = this.id;
    $(`#${c}`).css("transform", "rotateY(90deg)");
    $(`#${c} > .info-forecast-content`).html("<h2>24°</h2>")
    setTimeout(function() {
        // $(`#${c}`).css("transform", "scaleX(-1)");
        // $(`#${c}`).css("transform", "rotateY(0deg)");
    }, 1000 * 0.3);
});
*/