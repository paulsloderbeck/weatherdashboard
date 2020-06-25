const APIKey = "ce8855f0190f67331d0da235639fae92";
let city = ""
let cities = [];
let m = moment();
let lat = ""
let lon = ""
// build UV index queryURL with coord from currentresponse
//build 5 day query
//dump text into current div
//put text into buttons for 5 day forecast
// add city to cities array
//append to cities list
//clear button- reset text fields, subtract 5 days from moment

function getHistory() {
    let storedHistory = JSON.parse(localStorage.getItem("cities"))
    if (storedHistory !== null) {
        cities = storedHistory
    }
};

function storeHistory() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

function renderHistory() {
    for (i = 0; i < cities.length; i++) {
        var newCity = $("<li>");
        newCity.attr("data-city", cities[i]);
        newCity.text(cities[i]);
        newCity.addClass("list-group-item");
        newCity.click(function () {
            city = newCity.text;
            search(city);
        });
        $("#city-history-here").append(newCity);
    }
};

getHistory();
renderHistory();
console.log(localStorage);
console.log(m);


$("#searchBtn").on("click", function () {
    city = $("#city-text").val().trim();
    search(city);
});

function search(city) {
    //city = $("#city-text").val().trim();
    var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var fiveQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    var uvQueryURL = "";
    console.log(city);
    cities.push(city);
    console.log(cities);
    var lastCity = $("<li>");
    lastCity.attr("data-city", city);
    lastCity.text(city);
    lastCity.addClass("list-group-item");
    $("#city-history-here").append(lastCity);
    storeHistory();

    console.log(currentQueryURL);
    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(currentQueryURL);
        console.log(response);
        let temp = 1.8 * (response.main.temp - 273) + 32;
        $("#current-city").text(response.name);
        $("#current-date").text("Today is " + m.format("dddd, MMMM Do YYYY"))
        $("#current-temperature").text("Current Temperature: " + temp.toFixed(1) + " F");
        $("#current-humidity").text("Current Humidity: " + response.main.humidity + "%");
        $("#current-windspeed").text("Current Wind Speed: " + response.wind.speed + "MPH");
        lat = response.coord.lat;
        lon = response.coord.lon;
        uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        console.log(uvQueryURL);
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#current-uv-index").text("Current UV Index: " + response.value);
        });
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
        $("#day1").text(m.add(1, 'd').format("ddd"));
        $("#day1Temp").text("Temp: " + (1.8 * (dayOne.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day1Humidity").text("Humidity: " + dayOne.main.humidity + "%");
        $("#day2").text(m.add(1, 'd').format("ddd"));
        $("#day2Temp").text("Temp: " + (1.8 * (dayTwo.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day2Humidity").text("Humidity: " + dayTwo.main.humidity + "%");
        $("#day3").text(m.add(1, 'd').format("ddd"));
        $("#day3Temp").text("Temp: " + (1.8 * (dayThree.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day3Humidity").text("Humidity: " + dayThree.main.humidity + "%");
        $("#day4").text(m.add(1, 'd').format("ddd"));
        $("#day4Temp").text("Temp: " + (1.8 * (dayFour.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day4Humidity").text("Humidity: " + dayFour.main.humidity + "%");
        $("#day5").text(m.add(1, 'd').format("ddd"));
        $("#day5Temp").text("Temp: " + (1.8 * (dayFive.main.temp - 273) + 32).toFixed(1) + "F");
        $("#day5Humidity").text("Humidity: " + dayFive.main.humidity + "%");
        console.log(m)
        m.subtract(5, 'd');
        console.log(m)
    });
}
