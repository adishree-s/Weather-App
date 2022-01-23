const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b05b2eb3da9f4f0ea39e0fd741faf622&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find the loaction", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out. It feels like " +
          response.body.current.feelslike +
          " degrees out. Humidity is " +
          response.body.current.humidity +
          "."
      );
    }
  });
};

module.exports = forecast;
