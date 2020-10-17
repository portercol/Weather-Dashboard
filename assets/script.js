// Store API Key in a variable
const apiKey = "&appid=90236b1e6e8a32cef8f5058dea9b550c";

// Store the current date data in a variable
var date = new Date();

// jQuery syntax for calling on the id of searchTerm
// && calling on the button w/ id of searchButton for the onclick
$("#searchTerm").keypress(function (event) {
    // keyCode === 13 allows user to use the 'return' key to return weather data
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    };
});

// jQuery onclick function for button click
$("#searchBtn").on("click", function () {
// added 'show' class to 5 day forecast after onclick
    $('#forecastH5').addClass('show');
    // Get the city input value and store it in a variable 
    city = $("#searchTerm").val();
    // This clears the input box
    $("#searchTerm").val("");
    // Store weather URL, city value and API in variable
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    // AJAX get request using URL, City and API key
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    // Promise statment to get response and store fahrenheit temp values
        .then(function (response) {
            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            getCurrentConditions(response);
            getCurrentForecast(response);
            makeList();
        });
});