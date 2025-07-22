const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let latestDHT = { temperature: '--', humidity: '--' };
let latestMoisture = { moisture: '--' };
let pumpStatus = { status: 'OFF' };
let pumpControl = { control: 'auto' };

app.get('/', (req, res) => {
  res.send('Smart Irrigation API is running!');
});

app.post('/api/sensors/dht', (req, res) => {
  latestDHT = req.body;
  res.status(200).send({ message: 'DHT data received' });
});

app.post('/api/sensors/moisture', (req, res) => {
  latestMoisture = req.body;
  res.status(200).send({ message: 'Moisture data received' });
});

app.post('/api/pump/status', (req, res) => {
  pumpStatus = req.body;
  res.status(200).send({ message: 'Pump status received' });
});

app.get('/api/sensors/dht', (req, res) => {
  res.send(latestDHT);
});

app.get('/api/sensors/moisture', (req, res) => {
  res.send(latestMoisture);
});

app.get('/api/pump/status', (req, res) => {
  res.send(pumpStatus);
});

app.get('/api/pump/control', (req, res) => {
  res.send(pumpControl);
});

app.post('/api/pump/control', (req, res) => {
  if (req.body.control === 'toggle') {
    pumpControl.control = pumpControl.control === 'on' ? 'off' : 'on';
  } else {
    pumpControl = req.body;
  }
  res.status(200).send({ message: 'Pump control updated', control: pumpControl.control });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});