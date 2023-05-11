//element queries
var searchBarEl = document.querySelector(".searchBarCity");
var searchBtnEl = document.querySelector(".searchBtn");

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
      for (var i = 0; i < 6; i++) {
        var cloud = data.list[i].clouds.all; //set path to clouds
        var temp = (data.list[i].main.temp - 273.15) * (9 / 5) + 32; //set path for temp in Fahrenheit
        var wind = data.list[i].wind.speed * 2.237; // set path for wind speed
        var humidity = data.list[i].main.humidity; //set path for humidity

        displayZeroDayForecast(city, cloud, temp, wind, humidity);
      }
      storeCity(city);
    });
  });
};

var displayZeroDayForecast = function (
  cityName,
  cloudCover,
  tempDeg,
  windSpeed,
  humidityPer
) {
  console.log("display");
};

var storeCity = function (cityName) {
  var cityObj = {
    city: cityName,
  };
  var cities = JSON.parse(localStorage.getItem("cities") || "[]");
  cities.forEach(function (cityObj, index) {
    console.log("[" + index + "]: " + cityObj.city);
  });

  // Modifying

  cities.push(cityObj);
  console.log("Added city #" + cityObj.city);

  // Saving
  localStorage.setItem("cities", JSON.stringify(cities));

  historyButton(cityObj.city);
};

searchBtnEl.addEventListener("click", buttonClickHandler); //event handler for search button

var historyButton = function (cityName) {
  var ulEl = document.querySelector("ul");
  var liEl = document.createElement("button");
  liEl.textContent = cityName;

  ulEl.appendChild(liEl);
};
