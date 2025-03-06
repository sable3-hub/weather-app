// AI Assistance with coding!
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML page with a form to input latitude and longitude
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post("/", function (req, res) {
  // Get latitude and longitude from the form
  const latitude = req.body.latitudeInput;
  const longitude = req.body.longitudeInput;

  // Make sure to replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey ="70806d08d9e1810758e5f6f44533d506";  // Your OpenWeatherMap API key
;
  const units = "metric"; // Celsius temperature units
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  // Fetch the weather data from the OpenWeatherMap API
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const cloudiness = weatherData.clouds.all;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      // Send the weather information back to the client
      res.write(`<h1>The weather is ${weatherDescription}</h1>`);
      res.write(`<h2>The Temperature is ${temp}°C</h2>`);
      res.write(`<p>Humidity: ${humidity}%</p>`);
      res.write(`<p>Wind Speed: ${windSpeed} m/s</p>`);
      res.write(`<p>Cloudiness: ${cloudiness}%</p>`);
      res.write(`<img src="${imageURL}" alt="weather icon">`);
      res.send();
    });
  });
});

// Start the server on port 3000 (or an available port)
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
