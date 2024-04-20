// routes/stats.route.js

const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller.js');

// Fetch total revenue
router.get('/revenue', statsController.getTotalRevenue);

// Fetch most rented cars
router.get('/mostRentedCars', statsController.getMostRentedCars);

// Fetch popular rental durations
router.get('/popularRentalDurations', statsController.getPopularRentalDurations);

// Fetch monthly revenue trend
router.get('/monthlyRevenueTrend', statsController.getMonthlyRevenueTrend);

// Fetch user activity
router.get('/userActivity', statsController.getUserActivity);

router.get('/userRevenue', statsController.getUserRevenue);

module.exports = router; 
