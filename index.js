const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let dht = { temperature: null, humidity: null };
let moisture = { moisture: null };
let pump = { status: 'off', control: 'auto' };

// Get endpoints
app.get('/api/sensors/dht', (req, res) => res.json(dht));
app.get('/api/sensors/moisture', (req, res) => res.json(moisture));
app.get('/api/pump/status', (req, res) => res.json(pump));
app.get('/api/pump/control', (req, res) => res.json({ control: pump.control }));

// Post endpoints
app.post('/api/sensors/dht', (req, res) => {
  dht = req.body;
  res.sendStatus(200);
});
app.post('/api/sensors/moisture', (req, res) => {
  moisture = req.body;
  res.sendStatus(200);
});
app.post('/api/pump/status', (req, res) => {
  pump.status = req.body.status;
  res.sendStatus(200);
});
app.post('/api/pump/control', (req, res) => {
  if (req.body.control === 'toggle') {
    pump.control = pump.control === 'on' ? 'off' : 'on';
  } else {
    pump.control = req.body.control;
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
