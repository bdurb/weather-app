const yargs = require('yargs');
const axios = require('axios');
const weatherKey = require('../keys');


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  const encodedAddress = encodeURIComponent(argv.address);
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  axios
    .get(geocodeUrl)
    .then((res) => {
       if (res.data.status === 'ZERO_RESULTS') {
         throw new Error('unable to find address');
       }
       const lat = res.data.results[0].geometry.location.lat;
       const lng = res.data.results[0].geometry.location.lat;
       const weatherUrl = `https://aip.darksky.net/forecast/${weatherKey}/${lat},${lng}`
       console.log(Response.data.results[0].formatted_address)
       return axios.get(weatherUrl);
      }).then((res) => {
        const temperature = res.data.currently.temperature;
        const apparentTemperature = res.data.currently.apparentTemperature;
        console.log(`its currently ${temperature} it feels like ${apparentTemperature}`)
      }).catch((err) => {
        if (err.code === 'ENOTFOUND') {
          console.log('Undable to connect to API server.');
        } else {
          console.log(err.message)
        }
      })