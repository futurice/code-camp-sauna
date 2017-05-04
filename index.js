// Futurice Sauna-meter

console.log('Running on sauna');

const tessel = require('tessel');
const climatelib = require('climate-si7020');
const axios = require('axios');

const climate = climatelib.use(tessel.port['B']);

const apiEndpoint = 'https://dweet.io/dweet/for/futurice-sauna';

function post(temp, humid) {
  axios.post(apiEndpoint, {
    temperature: temp.toFixed(4),
    humidity: humid.toFixed(4),
  })
  .then(function(response) {
    console.log(`Sent climate data. HTTP status: ${response.status}`);
  })
  .catch(function(error) {
    console.log(`Sending climate data failed. Error: ${error.code}`);
  });
}

climate.on('ready', function() {
  console.log('Connected to climate module');

  // Loop forever
  setImmediate(function loop() {
    climate.readTemperature('c', function(err, temp) {
      climate.readHumidity(function(err, humid) {
        console.log(`D: ${temp.toFixed(4)}°C H: ${humid.toFixed(4)}%RH`);
        post(temp, humid);
      });
      setTimeout(loop, 30000);
      });
    });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});
