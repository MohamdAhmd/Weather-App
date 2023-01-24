const { json } = require("express");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const weatherData = (address, callback) => {
  const url =
    process.env.BASE_URL +
    encodeURIComponent(address) +
    "&appid=" +
    process.env.SECRET_KEY;
  //console.log(url);
  request({ url, json: true }, (error, { body } = {}) => {
    //console.log(body);
    if (error) {
      callback("Can't fetch data from weather app api server", undefined);
    } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
      callback("Unable to find the location, try another location", undefined);
    } else {
      callback(undefined, {
        temperature: body.main.temp,
        description: body.weather[0].description,
        cityName: body.name,
      });
    }
  });
};
module.exports = weatherData;
