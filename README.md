# weatherdashboard

This weather dashboard uses the Open Weather API to display a dashboard of weather information, including current information and a 5 day forecast for a given city. The layout is created using bootstrap. The script features a search function that populates a current weather query URL based on the city entered. It also populates a five day query URL. The search function appends the city to a city history div and adds a click listener so that a user can access past cities searched.

The search function then runs an ajax call for the current weather API. This takes city, temperature, humidity, and wind speed info and sets the text in the dashboard with this information. The search uses a moment.js date to alert the user to the current date. With the lattitude and longitude returned in the current weather object, the search function then sets the UV URL, and runs another ajax query to get a UV response. It sets the UV Index text to the dashboard, and uses if conditionals to change the background color based on the UV Index scale.

The search function also runs an ajax call on the five day forecast API. Because this data is returned in an array of 3 hours increments, the function uses indices 8 spaces apart to get data for approximately every 24 hours. The moment object is manipulated to return the day, and the forecast displays the temperature, humidity, and an icon for the weather.

The dashboard stores the cities searched in Local Storage and renders a history of cities when the user refreshes the page. The getHistory function also searches the last city entered in the cities array.

Check it out at https://paulsloderbeck.github.io/weatherdashboard/

![Screenshot] (https://github.com/paulsloderbeck/weatherdashboard/blob/master/screenshot.png)