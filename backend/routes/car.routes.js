// routes/car.route.js

const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller.js');

// Fetch cars with optional filters
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById)
router.put('/:id', carController.updateCarById)
router.post('/', carController.addCar)
router.delete('/:id', carController.deleteCarById)
module.exports = router;
