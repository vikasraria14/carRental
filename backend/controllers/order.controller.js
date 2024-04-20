// controllers/order.controller.js

const Order = require("../models/order.model");
const Car = require("../models/car.model");

exports.createOrder = async (req, res) => {
  try {
    const { userId, carId, startDate, endDate, rentalCost } = req.body;
    // Retrieve car details
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Check availability
    if (car.availableQuantity <= 0) {
      return res
        .status(400)
        .json({ message: "No available cars for this model" });
    }

    // Calculate rental duration in hours
    // const durationInHours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));

    // // Calculate rental cost
    // let rentalCost;
    // if (durationInHours <= 8) {
    // rentalCost = durationInHours * car.hourlyRate;
    // } else {
    //   rentalCost = Math.ceil(durationInHours / 24) * car.dailyRate;
    // }

    // Create order
    const order = new Order({
      userId,
      carId,
      startDate,
      endDate,
      rentalCost,
      // You can set default values for other fields such as status
    });

    // Save order to database
    await order.save();

    // Decrease available quantity
    car.availableQuantity -= 1;
    await car.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch order history
exports.getOrderHistory = async (req, res) => {
  try {
    // Check if the requester is an admin
    // const isAdmin = req.user.role === 'admin'; // Assuming role is stored in the user object
    let {userId}=req.query
    let orders;
    // if (isAdmin) {
    //   // If admin, fetch all orders
    //   orders = await Order.find().populate('userId', 'username'); // Populate username of the user who placed the order
    // } else {
    // If regular user, fetch orders for the user
    // orders = await Order.find({ userId: req.user._id }); // Assuming user ID is stored in the user object
    // orders = await Order.find().populate('userId', 'username','carId'); // Populate username of the user who placed the order
    // }
    orders = await Order.find({
      userId
    })
      .populate("userId", "name email")
      .populate("carId", "make model year color"); // Populate car details
    orders = orders.map((order) => {
      order = order.toObject();
      return {
        ...order,
        ...order.carId,
        carName: order.carId.make + " " + order.carId.model,
      };
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAdminOrderHistory = async (req, res) => {
  try {
    let orders;
    orders = await Order.find()
      .populate("userId", "name email")
      .populate("carId", "make model year color"); // Populate car details
    orders = orders.map((order) => {
      order = order.toObject();
      let id=order._id;
      return {
        ...order,
        ...order.carId,
        ...order.userId,
        carName: order.carId.make + " " + order.carId.model,
        _id:id
      };
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, status, rentalCost } = req.body;

  try {
    // Find the order by ID and update it
    let updatedOrder = await Order.findByIdAndUpdate(id, {
      startDate,
      endDate,
      status,
      rentalCost
    }, { new: true }).populate('carId', 'make model year color'); // Populate car details

    // Check if the order exists
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Format the updated order as desired
    updatedOrder = updatedOrder.toObject();
    const formattedOrder = {
      ...updatedOrder,
      carName: updatedOrder.carId.make + ' ' + updatedOrder.carId.model
    };

    // Send the formatted updated order as response
    res.json(formattedOrder);
  } catch (error) {
    // Handle errors
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};