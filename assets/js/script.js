var searchBtn = document.querySelector("#searchBtn");

var fetchCityLatLon = function (city) {
  //function that takes in the input city name
  var geoCodingApi = //api URL to find coordinates of inputted city
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=81e5e2aa364dbd692cb7ce5124ace8ee";
  //fetches data from geoCoding API
  fetch(geoCodingApi).then(function (response) {
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
      for (var i = 0; i < 6; i++) {
        console.log(data);

        var cloudEl = document.querySelector("#day-" + [i] + "cityCloud");
        cloudEl.innerHTML = data.list[i].weather[0].icon;

        var tempEl = document.querySelector("#day-" + [i] + "cityTemp");
        tempEl.innerHTML = (data.list[i].main.temp - 273.15) * (9 / 5) + 32;

        var windEl = document.querySelector("#day-" + [i] + "cityWind");
        windEl.innerHTML = data.list[i].wind.speed * 2.237; // set path for wind speed

        var humidEl = document.querySelector("#day-" + [i] + "cityHumid");
        humidEl.innerHTML = data.list[i].main.humidity;
      }
    });
  });
};

var buttonClickHandler = function (event) {
  // takes in the value typed in the search bar

  var searchBarEl = document.querySelector("input");
  var cityNameEl = document.querySelector("#cityName");
  var cityName = searchBarEl.value.trim();
  cityNameEl.innerHTML = cityName;

  // passes city name that was typed into the function
  if (cityName) {
    fetchCityLatLon(cityName);
  }
};

//event listener for Search Button
searchBtn.addEventListener("click", function () {
  buttonClickHandler();
});
