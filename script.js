function getWeather() {
  const apiKey = "3552b3238aa12fbe58f692e169e3a95d";
  const resultDiv = document.getElementById("result");
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Enter a city to continue");

    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found, Try again.");
      }
      return response.json();
    })
    .then((data) => {
      const { name, sys, main, weather, wind } = data; //Data destructuring
      const icon = weather[0].icon;
      const temperatureHTML = Math.round(main.temp - 273.15); //conversion to celsius from kelvin
      resultDiv.innerHTML = `<h2>${name}, ${sys.country}.</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather[0].description}"  />
        <p style = "font-weight: bolder; font-size: 1.5rem;"><strong>${weather[0].main}</strong></p>
        <p style="color:white; font-weight: bolder; font-size: 1.5rem;">Temperature: ${temperatureHTML}°C</p>
        <p style="color:white; font-weight: bolder; font-size: 1.5rem;">Humidity: ${main.humidity}%</p>
        <p style="color:white; font-weight: bolder; font-size: 1.5rem;">Wind: ${wind.speed} m/s</p>`;
    })

    .catch((error) => {
      resultDiv.innerHTML = `<div class="error">
      <p> OOPS!!!</p>  <br>
      ${error.message}</div>`;
    });
}
