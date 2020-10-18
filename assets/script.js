// Store API Key in a variable
const apiKey = "&appid=90236b1e6e8a32cef8f5058dea9b550c";

// Store value of the input in variable
var city = $("#searchTerm").val();

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
        .then(function (res) {
            var tempF = (res.main.temp - 273.15) * 1.80 + 32;
            currentCondition(res);
            currentForecast(res);
            makeList();
        });
});

// Use makeList function to add classes to list items and append city name
function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
};

// Use currentCondition function to convert temp into fahrenheit
// && Empty out the current city being displayed after use
function currentCondition(res) {
    // Convert the tempurature to fahrenheit *store in var to use above*
    var tempF = (res.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // Create and input the content to the dom using jQuery
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(res.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temp = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + res.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + res.wind.speed + " MPH");

    // Append data stored in variables to the page
    city.append(cityDate);
    cardBody.append(city, temp, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card);
};

// Use currentForecast function to make AJAX request for forecast and create and append content
function currentForecast() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (res) {

        // Empty the forecast input being displayed after use
        $('#forecast').empty();

        // Store the response list in a variable && loop over the list length
        var resList = res.list;
        for (var i = 0; i < resList.length; i++) {

            // Using the indexOf method to return the index of the res.list
            // && if value is not found 'return -1'
            if (resList[i].dt_txt.indexOf("12:00:00") !== -1) {

                // Get the current temp
                // After fahrenheit conversion - store in varialbe
                var temp = (resList[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp);

                // Create and input the content to the dom using jQuery
                const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + resList[i].main.humidity + "%");
                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + resList[i].weather[0].icon + ".png")

                // Append data stored in variables to the page
                cardBody.append(image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            };
        };
    });
};
