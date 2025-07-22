const express = require('express');
const cors = require('cors');
const auth = require('./utils/auth');

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Health Check =====
app.get('/', (req, res) => {
  res.send('API is running');
});

// ===== Auth Routes =====
app.post('/auth/register', async (req, res) => {
  try {
    const { full_name, email, phone, password, user_type = 'patient' } = req.body;

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

    const hashedPassword = await auth.hashPassword(password);

    // Simulate DB save:
    const user = {
      id: Date.now(),
      full_name,
      email,
      phone,
      user_type,
      password: hashedPassword
    };

    const token = auth.generateToken(user.id, user.user_type);

    res.status(201).json({
      message: 'User registered successfully',
      user,
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

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (!auth.isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // NOTE: Replace with actual DB lookup in future
    const user = null;  // No DB connection yet

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await auth.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = auth.generateToken(user.id, user.user_type);

    res.json({
      message: 'Login successful',
      user,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ===== Protected Consultation Routes =====
// All consultation routes now require a valid token
app.use('/consultation', auth.requireAuth);

app.get('/consultation/all', (req, res) => {
  res.send('All consultations - Protected');
});

app.post('/consultation/create', (req, res) => {
  res.send('Create consultation - Protected');
});


// ===== Role-Protected Example Routes =====

// Admin-only route
app.get('/admin/dashboard', auth.requireAuth, auth.requireAdmin, (req, res) => {
  res.send('Admin dashboard - Protected');
});

// Doctor-only route
app.get('/doctor/panel', auth.requireAuth, auth.requireDoctor, (req, res) => {
  res.send('Doctor panel - Protected');
});


// ===== Other Endpoints =====
app.post('/ussd', (req, res) => {
  res.send('USSD endpoint');
});

app.post('/triage', (req, res) => {
  res.send('AI triage endpoint');
});

app.post('/payment/webhook', (req, res) => {
  res.send('Payment webhook endpoint');
});


// ===== Optional: Centralized Error Handler =====
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
