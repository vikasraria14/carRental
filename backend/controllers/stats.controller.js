const Order = require('../models/order.model');

// Fetch total revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$rentalCost" } } }
    ]);

    res.status(200).json({ totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch most rented cars
exports.getMostRentedCars = async (req, res) => {
  try {
    const mostRentedCars = await Order.aggregate([
      { $group: { _id: "$carId", totalRentals: { $sum: 1 } } },
      { $sort: { totalRentals: -1 } },
      { $limit: 5 },
      { $lookup: { from: "cars", localField: "_id", foreignField: "_id", as: "carDetails" } },
      { $unwind: "$carDetails" },
      { $project: { make: "$carDetails.make", model: "$carDetails.model", totalRentals: 1 } }
    ]);

    // Convert data to the required format
    const formattedData = mostRentedCars.map((item) => ({
      label: `${item.make} ${item.model}`,
      value: item.totalRentals
    }));

    res.status(200).json( formattedData );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getPopularRentalDurations = async (req, res) => {
  try {
    const popularRentalDurations = await Order.aggregate([
      {
        $project: {
          durationInHours: { $ceil: { $divide: [{ $subtract: ["$endDate", "$startDate"] }, 3600000] } }
        }
      },
      {
        $group: {
          _id: "$durationInHours",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert data to the required format
    const formattedData = popularRentalDurations.map((item) => ({
      label: `${item._id} hours`,
      value: item.count
    }));

    res.status(200).json( formattedData );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getMonthlyRevenueTrend = async (req, res) => {
  try {
    const monthlyRevenueTrend = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$rentalCost" }
        }
      }
    ]);

    // Convert data to the required format
    const formattedData = monthlyRevenueTrend.map((item) => ({
      label: `Month ${item._id}`,
      value: item.totalRevenue
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getUserActivity = async (req, res) => {
  try {
    const userActivity = await Order.aggregate([
      { $group: { _id: "$userId", totalOrders: { $sum: 1 } } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDetails" } },
      { $unwind: "$userDetails" },
      { $project: { label: "$userDetails.username", value: "$totalOrders" } }
    ]);

    res.status(200).json(userActivity );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getUserRevenue = async (req, res) => {
  try {
    // Aggregate orders based on user ID and calculate total revenue for each user
    const userRevenue = await Order.aggregate([
      { $group: { _id: "$userId", totalRevenue: { $sum: "$rentalCost" } } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDetails" } }, // Populate user details
      { $unwind: "$userDetails" }, // Unwind the array created by $lookup
      { $project: { _id: 1, totalRevenue: 1, userDetails: { name: 1, email: 1 } } } // Project only the necessary user details
    ]);

    // Convert userRevenue data to the required format
    const formattedData = userRevenue.map((item) => ({
      label: item.userDetails.name, // Use user's name as label
      value: item.totalRevenue // Use total revenue as value
    }));

    res.status(200).json( formattedData );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

