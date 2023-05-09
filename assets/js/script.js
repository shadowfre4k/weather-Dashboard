//element queries

var containerEl = document.querySelector(".continer");
var searchBarEl = document.querySelector(".searchBarCity");
var searchBtnEl = document.querySelector(".searchBtn");
var cityDisplayEl = document.querySelector(".cityDisplay");
var froecastEl = document.querySelector(".forecast");

//api reminder i just put in the code for reference
var apiURL =
  "api.openweathermap.org/data/2.5/forecast? at={lat}&lon={lon}&appid=81e5e2aa364dbd692cb7ce5124ace8ee";

var buttonClickHandler = function (event) {
  //on click handler function will say clickered when the button is clicked to verify it is being clicked
  event.preventDefault();
  console.log("Clickered");

  var cityName = searchBarEl.value.trim(); // takes in the value typed in the search bar

  if (cityName) {
    // passes city name that was typed into the function
    getCityLatLon(cityName);
  }
};

var getCityLatLon = function (city) {
  //function that takes in the input city name
  var geoCodingApi = //api URL to find coordinates of inputted city
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    // "," +
    // stateCode +
    // "," +
    // countryCode +
    // "," +
    "&limit=5&appid=81e5e2aa364dbd692cb7ce5124ace8ee";

  fetch(geoCodingApi).then(function (response) {
    //fetches data from geoCoding API
    response.json().then(function (data) {
      var geoLat = data[0].lat; //sets latitude to variable
      var geoLon = data[0].lon; // sets longitude to variable

      getForecast(geoLat, geoLon); //passes longitude and latitude through function to get forecast
    });
  });
};

var getForecast = function (lat, lon) {
  //function to get forecast data
  console.log(lon); //check to see if coordinates pass
  console.log(lat);
  var forecastApi = //forecast API
    " http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=81e5e2aa364dbd692cb7ce5124ace8ee";

  fetch(forecastApi).then(function (response) {
    //fetches data from forecast API
    response.json().then(function (data) {
      var cloud = data.list[0].clouds.all; //set path to clouds
      var temp = (data.list[0].main.temp - 273.15) * (9 / 5) + 32; //set path for temp in Fahrenheit
      var wind = data.list[0].wind.speed; // set path for wind speed
      var humidity = data.list[0].main.humidity;
      // console log data to check and make sure all variables are collecting desired stats
      console.log(data);
      console.log(cloud);
      console.log(temp);
      console.log(wind);
      console.log(humidity);
    });
  });
};
searchBtnEl.addEventListener("click", buttonClickHandler); //event handler for search button
