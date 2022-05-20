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
  let temperatute = document.querySelector("#temperature");
  temperatute.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = `910507594fe3cf58151f5b16db41c101`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperatute);
