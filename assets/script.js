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
    }
  });