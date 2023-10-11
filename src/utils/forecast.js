const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6f77b0befcb4f9ca91d404ced74526e7&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable connect to forecast-service, please check your connection!",
        undefined,
      );
    } else if (body.error) {
      callback("Unable to find the country, try again", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      const { location } = body;
      callback(
        undefined,
        `${weather_descriptions[0]}. It's currently ${temperature} degress out. It feels like ${feelslike} degress out in ${location.name}`,
      );
    }
  });
};

module.exports = forecast;
