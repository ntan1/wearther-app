$(document).ready(function () {
    console.log(test);

    function getIP(json) {
        document.write("My public IP address is: ", json.ip);
    }

    $.ajax({
        url: ip,
        method: "GET" 
    }).then(function(response) {
        console.log("wow");
        console.log(response);
    }).fail(function (err) {
        console.log(err);
    });
});
