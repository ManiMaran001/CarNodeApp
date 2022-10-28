const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      maxLength: [40, "car must have a 40 characters"],
      minLength: [0, "car must have a at least 10 caracteres"],
    },
    isActive: {
      type: Boolean,
    },
    image_url: {
      type: String,
    },
    published: {
      type: Date,
    },
    fuel_type: [String],
    transmission: [String],
    mileage: String,
    tank_capacity: String,
    seating: String,
    carImage: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtual: true },
  }
);

const carModel = mongoose.model("CarModel", carSchema);

module.exports = carModel;
