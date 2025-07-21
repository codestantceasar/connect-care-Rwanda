const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = process.env.JWT_TOKEN;

const auth = {
  // Hash password
  hashPassword: async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  // Compare password
  comparePassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  // Generate JWT token
  generateToken: (userId, userType = 'patient') => {
    return jwt.sign(
      { userId, userType },
      JWT_TOKEN,
      { expiresIn: '24h' }
    );
  },

  // Verify JWT token
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_TOKEN);
    } catch (error) {
      return null;
    }
  },

  // Middleware to protect routes
  requireAuth: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = auth.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  },

  // Check if user is admin
  requireAdmin: (req, res, next) => {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  },

  // Check if user is doctor
  requireDoctor: (req, res, next) => {
    if (req.user.userType !== 'doctor' && req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Doctor access required' });
    }
    next();
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone format (basic)
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  },

  // Validate password strength
  isValidPassword: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
};

module.exports = auth;