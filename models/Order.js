const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product: String,
  price: Number,
  features: [String],
  color: String,
  font: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
