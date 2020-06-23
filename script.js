const APIKey = "ce8855f0190f67331d0da235639fae92";
let city = ""
let cities = [];
// build UV index queryURL with coord from currentresponse
//build 5 day query
//dump text into current div
//put text into buttons for 5 day forecast
// add city to cities array
//append to cities list

$("#searchBtn").on("click", function (event) {
    city = $("#city-text").val().trim();
    var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var fiveQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    event.preventDefault();
    console.log(city);
    console.log(currentQueryURL);
    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(currentQueryURL);
        console.log(response);
        let temp = 1.8 * (response.main.temp - 273) + 32;
        $("#current-city").text(response.name);
        $("#current-temperature").text("Temperature: " + temp.toFixed(1) + " F");
        $("#current-humidity").text("Humidity: " + response.main.humidity + "%");
        $("#current-windspeed").text("Wind Speed: " + response.wind.speed + "MPH");
        // UV index URL with lat and lon from city
    });

    $.ajax({
        url: fiveQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(fiveQueryURL);
        console.log(response);
    });

});