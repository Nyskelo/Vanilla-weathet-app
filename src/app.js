function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Suterday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperatute(response) {
  console.log(response.data);
  let temperatute = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  temperatute.innerHTML = Math.round(celsiusTemperature);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
  //   icon.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
}

function search(city) {
  let apiKey = `910507594fe3cf58151f5b16db41c101`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperatute);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
  celsiuslink.classList.remove("active");
  faherheitLink.classList.add("active");
}

let faherheitLink = document.querySelector("#fahrenheit-link");
faherheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiuslink.classList.add("active");
  faherheitLink.classList.remove("active");
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);
let celsiusTemperature = null;

search("Uzhgorod");
