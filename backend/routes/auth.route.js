// routes/auth.route.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

// Signup route
router.post('/signup', authController.signup);
router.post('/adminSignup', authController.signup);

// Login route
router.post('/login', authController.login);
router.post('/adminLogin', authController.adminLogin)

module.exports = router;
