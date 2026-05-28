const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  address: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);