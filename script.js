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
        let dayOne = response.list[4];
        let dayTwo = response.list[12];
        let dayThree = response.list[20];
        let dayFour = response.list[28];
        let dayFive = response.list[36];
        $("#day1").text(dayOne.dt_txt);
        $("#day1Temp").text("Temperature: " + (1.8 * (dayOne.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day1Humidity").text("Humidity: " + dayOne.main.humidity + "%");
        $("#day2").text(dayTwo.dt_txt);
        $("#day2Temp").text("Temperature: " + (1.8 * (dayTwo.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day2Humidity").text("Humidity: " + dayTwo.main.humidity + "%");
        $("#day3").text(dayThree.dt_txt);
        $("#day3Temp").text("Temperature: " + (1.8 * (dayThree.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day3Humidity").text("Humidity: " + dayThree.main.humidity + "%");
        $("#day4").text(dayFour.dt_txt);
        $("#day4Temp").text("Temperature: " + (1.8 * (dayFour.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day4Humidity").text("Humidity: " + dayFour.main.humidity + "%");
        $("#day5").text(dayFive.dt_txt);
        $("#day5Temp").text("Temperature: " + (1.8 * (dayFive.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day5Humidity").text("Humidity: " + dayFive.main.humidity + "%");
    });

});