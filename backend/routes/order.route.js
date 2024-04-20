// routes/order.route.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Fetch order history
router.get('/', orderController.getOrderHistory);
router.get('/admin', orderController.getAdminOrderHistory);
router.post('/create', orderController.createOrder);
router.put('/admin/:id',orderController.updateOrder);
module.exports = router;
