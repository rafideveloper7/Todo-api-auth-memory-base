const express = require('express');
const router = express.Router();

// Import both handlers
const { registerHandler, loginHandler } = require('../handlers/auth.handler.js');

// Register route - POST /api/v1/auth/register
router.post('/register', registerHandler);

// Login route - POST /api/v1/auth/login
router.post('/login', loginHandler);

module.exports = router;