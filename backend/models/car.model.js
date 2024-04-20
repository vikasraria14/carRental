const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    // hourlyRate: {
    //     type: Number,
    //     required: true
    // },
    dailyRate: {
        type: Number,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    },
    // color: {
    //     type: String,
    //     required: true
    // },
    mileage: {
        type: Number,
        required: true
    },
    engineSize: {
        type: Number,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    insuranceProvider: {
        type: String,
        required: true
    },
    // isAvailable: {
    //     type: Boolean,
    //     required: true
    // },
    image: {
        type: String,
        required: true
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
