const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/auth/login', (req, res) => {
  res.send('Login to Connectcare');
});

app.post('/auth/register', (req, res) => {
  res.send('Register for Connectcare');
});

app.get('/consultation/all', (req, res) => {
  res.send('All consultations');
});

app.post('/consultation/create', (req, res) => {
  res.send('Create consultation');
});

// USSD endpoint
app.post('/ussd', (req, res) => {
  res.send('USSD endpoint');
});

// AI Triage
app.post('/triage', (req, res) => {
  res.send('AI triage endpoint');
});

// Payment webhook
app.post('/payment/webhook', (req, res) => {
  res.send('Payment webhook endpoint');
});

// Start server
app.listen(PORT, () => {
  console.log('API running');
});
