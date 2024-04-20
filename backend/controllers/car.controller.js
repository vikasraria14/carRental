// controllers/car.controller.js

const Car = require('../models/car.model');

// Fetch cars with optional filters
exports.getCars = async (req, res) => {
  try {
    let query = {};

    // Apply filters if provided
    if (req.query.make) {
      query.make = req.query.make;
    }
    if (req.query.model) {
      query.model = req.query.model;
    }
    if (req.query.year) {
      query.year = req.query.year;
    }
    if (req.query.available) {
      query.available = req.query.available === 'true';
    }
    // Add more filters as needed

    const cars = await Car.find(query);

    res.status(200).json( cars );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getCarById = async (req, res) => {
  try {

    let id = req.params.id
    

    const car = await Car.findOne({_id:id});

    res.status(200).json( car );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = req.body;

    const updatedCar = await Car.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.addCar = async (req, res) => {
  try {
    const newCar = req.body;
    let image = `car${Math.floor(Math.random()*15)}.png`
    newCar.image= image;
    const createdCar = await Car.create(newCar);

    res.status(201).json(createdCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteCarById = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


