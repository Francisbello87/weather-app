const dateElement = document.getElementById("date");
const options = {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "numeric",
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", options);

let weather = {
  apiKey: "a77e750f82d09749d0e73579874c673d",
  proxy: "https://cors-anywhere.herokuapp.com/",
  fetchWeather: function (query) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&appid=" +
        this.apiKey +
        "&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".query").textContent = `Weather in ${name}:`;
    document.querySelector(
      ".wind-speed"
    ).textContent = `Wind Speed: ${speed} km/hr`;
    document.querySelector(".temp").textContent = Math.round(temp) + "°C";
    document.querySelector(".icon").src =
      "http://openweather.org/img/wn/" + icon + ".png";
    document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
    document.querySelector(".description").textContent =
      description.charAt(0).toUpperCase() + description.slice(1);
    document.querySelector(".weather-contents").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
    if (document.querySelector(".searchbar").value !== name) {
      document.getElementById("notification").textContent =
        "Enter valid location";
    } else {
      weather.search();
    }
  },
};
function clearFields() {
  document.querySelector(".searchbar").value = "";
}
// function activatePlacesSearch() {
//   var input = document.getElementById("search_term");
//   var autocomplete = new google.maps.places.Autocomplete(input);
// }
document.querySelector(".searchbox button").addEventListener("click", () => {
  if (document.querySelector(".searchbar").value.length === 0) {
    alert("Please enter a valid location");
  } else {
    weather.search();
  }
  clearFields();
});
document.querySelector(".searchbar").addEventListener("keyup", () => {
  document.querySelector(".weather-contents").classList.add("loading");
});

document.querySelector(".searchbar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (document.querySelector(".searchbar").value.length === 0) {
      alert("Please enter a valid location");
    } else {
      weather.search();
    }

    clearFields();
  }
});

// if (navigator.geolaocation) {
//   navigator.geolocation.getCurrentPosition((setPosition, showError) => {
//     console.log(position);
//   });
// } else {
//   document.getElementById("notification").textContent =
//     "Browser does not support Geolocation";
// }

// function setPosition(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;

//   weather.fetchWeather(latitude, longitude);
// }

// function showError(error) {
//   document.getElementById("notification").textContent = `${error.message}`;
// }

weather.fetchWeather("lagos");
