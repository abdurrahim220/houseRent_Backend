// propertySchema.js

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  roomSize: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  availabilityDate: {
    type: Date,
    required: true,
  },
  rentPerMonth: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{11}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid Bangladeshi phone number!`,
    },
  },
  description: {
    type: String,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
