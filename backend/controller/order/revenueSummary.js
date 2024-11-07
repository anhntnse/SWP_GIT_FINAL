const orderModel = require("../../models/orderModel");

async function revenueSummary (req, res) {
  const { period } = req.params; // 'weekly' or 'monthly'
  let groupBy = {};

  if (period === 'weekly') {
    // Group by week
    groupBy = {
      $dateToString: { format: "%Y-%U", date: "$createdAt" } // Year and Week number
    };
  } else if (period === 'monthly') {
    // Group by month
    groupBy = {
      $dateToString: { format: "%Y-%m", date: "$createdAt" } // Year and Month
    };
  }

  try {
    const summary = await orderModel.aggregate([
      {
        $match: { order_status: "Delivered" } // Filter only "Shipped" orders
      },
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: "$totalPrice" }, // Replace `totalAmount` with your field for order amount
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by the grouped date
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error generating revenue summary:", error);
    res.status(500).json({ message: "Failed to generate revenue summary." });
  }
};

module.exports = revenueSummary;

