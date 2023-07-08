const mongoose = require("mongoose");

const Product = mongoose.model("Phones", {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  warranty_years: {
    type: Number,
    require: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

module.exports = Product;
