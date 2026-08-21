const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// Create Order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

   req.app.get("io").emit("NEW_ORDER", order);
    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $ne: "Delivered" },
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update Order Status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Send live status update
    req.app.get("io").emit("ORDER_STATUS_UPDATED", order);

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Get Live Orders For Customer
router.get("/customer/:phone", async (req, res) => {
  try {
    const orders = await Order.find({
      phone: req.params.phone,
      status: { $ne: "Delivered" },
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;