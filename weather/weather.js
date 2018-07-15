const request = require('request');

const weatherKey = require('../keys');

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://aip.darksky.net/forecast/${weatherKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server');
    } else if (response.statusCode === 400) {
      callback('unable to fetch weather');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;