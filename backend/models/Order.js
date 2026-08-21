const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
       tableNumber: {
  type: String,
  required: true, 
},
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    instructions: {
  type: String,
  default: "",
},
    items: [
      {
        name: String,
        qty: Number,
        price: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);