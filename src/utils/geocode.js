const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoianVwZGV2IiwiYSI6ImNsbjc0NDR1YjBxZGQyamxkbmIzbXA1NWIifQ.jHf1mR2lMqErJOOaJ8Zicw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to services, check your connection",
        undefined,
      );
    } else if (body.features.length === 0) {
      callback(`Country doesnt exist`, undefined);
    } else {
      const [position] = body.features.map((place) => place.center);
      const [location] = body.features.map((place) => place.place_name);
      callback(undefined, {
        latitude: position[1],
        longitude: position[0],
        location,
      });
    }
  });
};

module.exports = geocode;
