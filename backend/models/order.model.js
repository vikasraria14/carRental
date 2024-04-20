// models/order.model.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['request placed', 'car ready for pickup', 'car delivered', 'car returned'], default: 'request placed' },
  rentalCost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
  // Add any additional fields you need for the order
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
