const form = document.querySelector("#cityForm");
const temp = document.querySelector("#temp");
const API_KEY = "b2a7df875f6f730eb374060da525e9bd";
const states = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  stateSelect.innerHTML = '<option value=""> &nbsp SELECT &nbsp </option>';
  const location = String(document.querySelector("#city").value);
  console.log(location);
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${String(document.querySelector("#city").value)}&limit=5&appid=${API_KEY}`,
  )
    .then((resolve) => {
      return resolve.json();
    })
    .then((resolve) => {
      console.log(resolve);
      createOptionMenu(resolve);
      selectOptions(resolve);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("GeoLocation Done...");
    });
  states.length = 0;
});

const stateMenu = document.querySelector("#stateSelect");
stateMenu.addEventListener("change", (event) => {
  const selectedValue = stateMenu.value;
  if (selectedValue) {
    const selectedStateData = states.find((item) => {
      if (item.state == selectedValue) {
        const [lat, lon] = [item.lat, item.lon];
        updateInfo(lat, lon, item);
        console.log(lat, lon);
      }
    });
  }
});

const today = new Date();
let day = "";
switch (today.getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;

  case 2:
    day = "Tuesday";
    break;

  case 3:
    day = "Wednesday";
    break;

  case 4:
    day = "Thursday";
    break;

  case 5:
    day = "Friday";
    break;

  case 6:
    day = "Saturday";
    break;

  default:
    day = "";
    break;
}
const currentDate = document.querySelector("#current-date");
setInterval(() => {
  const time = new Date().toLocaleTimeString();
  currentDate.textContent = `${day}, ${time}`;
}, 1000);

function updateInfo(lat, lon, locationDetails) {
  const locationName = document.querySelector("#location-name");
  locationName.textContent = `${locationDetails.name}, ${locationDetails.state}`;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((resolve) => {
      return resolve.json();
    })
    .then((result) => {
      console.log(result);
      const windSpeed = document.querySelector("#wind-speed");
      windSpeed.textContent = result[`wind`]?.[`speed`] + " km/h";

      const pressure = document.querySelector("#atmospheric-pressure");
      pressure.textContent = result["main"]?.[`pressure`] + " hPa";

      const humidity = document.querySelector("#humidity-percentage");
      humidity.textContent = result[`main`]?.[`humidity`] + " %";

      const temp = document.querySelector("#current-temperature");
      temp.textContent = (result[`main`]?.[`temp`] - 273.15).toFixed(2);

      const feelsLikeTemperature = document.querySelector(
        "#feels-like-temperature",
      );
      feelsLikeTemperature.textContent =
        (result["main"]?.["feels_like"] - 273.15).toFixed(2) + " °C";

      const imgurl =
        "https://rodrigokamada.github.io/openweathermap/images/" +
        `${result["weather"][0]?.["icon"]}_t@2x.png`;

      const img = document.querySelector("#weather-icon");
      img.setAttribute(`src`, `${imgurl}`);

      const weatherDesc = document.querySelector("#weather-description");
      weatherDesc.textContent = `${result["weather"][0]?.["description"]}`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("Weather App Works Fine...");
    });

  console.log(locationDetails);
}

function selectOptions(options) {
  console.log(options);
  options.forEach((item, idx, nodelist) => {
    states.push(item);
  });
}

function createOptionMenu(result) {
  if (result.length > 0) {
    const stateSelect = document.querySelector("#stateSelect");
    for (let location of result) {
      const option = document.createElement("option");
      option.textContent = `${location.state}`;
      option.setAttribute("value", `${location.state}`);
      option.setAttribute("id", `${location.state}`);
      const stateSelect = document.querySelector("#stateSelect");
      stateSelect.append(option);
      console.log(location);
    }
  }
}
