//Api Key 
var apiKey = "d8f37535a253b2bac1b2c2093df8cbf8";

//Gives the value of the slider 
var rangeValue= 2;



$('#submitWeather').click(function() { 
        console.log(rangeValue);
        var city = $('#city').val();

        var queryURL1 = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=d8f37535a253b2bac1b2c2093df8cbf8"
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&APPID=d8f37535a253b2bac1b2c2093df8cbf8"
        

        console.log(city);
        console.log(queryURL);
        


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(res) {
                console.log(res);
                $('#data').append(res);
                console.log(res.main.temp);

            })

            $.ajax({
                url: queryURL1,
                method: "GET"
            }).then(function(res) {
                console.log(res);
                $('#data').append(res);
                console.log(res.main.temp);

            })

            $('#formId')[0].reset();




    });
        
    $( function() {
        $( "#slider-range-min" ).slider({
          range: "min",
          value: rangeValue,
          min: 1,
          max: 5,
          slide: function( event, ui ) {            
              
            rangeValue = ui.value;
            $( "#amount" ).val( "" + ui.value );

          }
        });


        $( "#amount" ).val( "" + $( "#slider-range-min" ).slider( "value" ) );
      } );

    /*    for (var key in res.main) {
                    console.log(key + res.main[key]);
                } 

                */