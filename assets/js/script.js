//element queries

var containerEl = document.querySelector(".continer");
var searchBarEl = document.querySelector(".searchBarCity");
var searchBtnEl = document.querySelector(".searchBtn");
var cityDisplayEl = document.querySelector(".cityDisplay");
var froecastEl = document.querySelector(".forecast");

var buttonClickHandler = function (event) {
  //on click handler function will say clickered when the button is clicked to verify it is being clicked
  event.preventDefault();
  console.log("Clickered");

  var cityName = searchBarEl.value.trim(); // takes in the value typed in the search bar

  if (cityName) {
    // passes city name that was typed into the function
    fetchCityLatLon(cityName);
  }
};

var fetchCityLatLon = function (city) {
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

      fetchForecast(geoLat, geoLon); //passes longitude and latitude through function to get forecast
    });
  });
};

var fetchForecast = function (lat, lon) {
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
      var city = data.city.name;
      var cloud = data.list[0].clouds.all; //set path to clouds
      var temp = (data.list[0].main.temp - 273.15) * (9 / 5) + 32; //set path for temp in Fahrenheit
      var wind = data.list[0].wind.speed * 2.237; // set path for wind speed
      var humidity = data.list[0].main.humidity;
      // console log data to check and make sure all variables are collecting desired stats
      console.log(data);
      console.log(city);
      console.log("cloud %: " + cloud);
      console.log("temperature in F: " + temp);
      console.log("Wind m/s " + wind);
      console.log("Humidity %: " + humidity);

      storeCity(city, cloud, temp, wind, humidity);
    });
  });
};

var storeCity = function (city, cloud, temp, wind, humidty) {
  var cities = JSON.parse(localStorage.getItem("cities") || "[]");
  console.log("# of cities: " + cities.length);
  cities.forEach(function (city, index) {
    console.log("[" + index + "]: " + city.name);
  });

  var city = {
    name: city,
    cloudCover: cloud,
    tempF: temp,
    windSpeed: wind,
    humidPer: humidty,
  };

  cities.push(city);
  console.log(cities);
};

searchBtnEl.addEventListener("click", buttonClickHandler); //event handler for search button
