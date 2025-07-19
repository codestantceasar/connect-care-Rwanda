const express = require('express');
const cors = require('cors');
const auth = require('./utils/auth');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Auth routes
app.post('/auth/register', async (req, res) => {
  try {
    const { full_name, email, phone, password, user_type = 'patient' } = req.body;
    
    // Validate input
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!auth.isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (!auth.isValidPassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters with uppercase, lowercase, and number' });
    }
    
    if (phone && !auth.isValidPhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone format' });
    }
    
    // Hash password
    const hashedPassword = await auth.hashPassword(password);
    
    // TODO: Save to database
    
    // Generate token
    const token = auth.generateToken(user.id, user.user_type);
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        user_type: user.user_type
      },
      token
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    if (!auth.isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // TODO: Get user from database
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Verify password
    const isValidPassword = await auth.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate token
    const token = auth.generateToken(user.id, user.user_type);
    
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        user_type: user.user_type
      },
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Consultation routes
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
