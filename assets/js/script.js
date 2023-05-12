var searchBtn = document.querySelector("#searchBtn");

var buttonClickHandler = function (event) {
  // takes in the value typed in the search bar
  var searchBarEl = document.querySelector("input");
  var cityNameEl = document.querySelector("#cityName");
  var cityName = searchBarEl.value.trim();
  cityNameEl.innerHTML = cityName;

  //store locally
  var cities = JSON.parse(localStorage.getItem("cities") || "[]");
  cities.forEach(function (cityName, index) {
    console.log("[" + index + "]: " + cityName);
  });

  cities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(cities));

  // passes city name that was typed into the function
  if (cityName) {
    fetchCityLatLon(cityName);
    console.log(cityName);
    addHistory(cityName);
  }
};

//function that takes in the input city name
var fetchCityLatLon = function (city) {
  var geoCodingApi = //api URL to find coordinates of inputted city
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
    " https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=81e5e2aa364dbd692cb7ce5124ace8ee";
  //fetches data from forecast API
  fetch(forecastApi).then(function (response) {
    response.json().then(function (data) {
      for (var i = 0; i < 6; i++) {
        console.log(data);
        //locates cloud and  put on page
        var cloudEl = document.querySelector("#day-" + [i] + "cityCloud");
        cloudEl.src =
          "https://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          "@2x.png";
        //locates temperature and  put on page
        var tempEl = document.querySelector("#day-" + [i] + "cityTemp");
        tempEl.innerHTML =
          "Temperature:" + (data.list[i].main.temp - 273.15) * (9 / 5) + 32;
        //locates wind and  put on page
        var windEl = document.querySelector("#day-" + [i] + "cityWind");
        windEl.innerHTML = "Wind Speed:" + data.list[i].wind.speed * 2.237;
        //locates humidity and  put on page
        var humidEl = document.querySelector("#day-" + [i] + "cityHumid");
        humidEl.innerHTML = "Humidity:" + data.list[i].main.humidity;
      }
    });
  });
};

//displays history on refresh
var displayHistory = function () {
  var cities = JSON.parse(localStorage.getItem("cities") || "[]");
  for (i = 0; i < cities.length; i++) {
    var historyEl = document.getElementById("history");
    var p = document.createElement("p");
    p.innerHTML = cities[i];
    historyEl.append(p);
  }
};

//function for adding to the history after button push
var addHistory = function (cityName) {
  var historyEl = document.getElementById("history");
  var p = document.createElement("p");
  p.innerHTML = cityName;
  historyEl.append(p);
};

//event listener for Search Button
searchBtn.addEventListener("click", function () {
  buttonClickHandler();
});

//evoke history function
displayHistory();
