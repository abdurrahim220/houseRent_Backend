// propertySchema.js

const mongoose = require('mongoose');

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
    type: Number,
    required: true,
  },
  // imageUrls: [
  //   {
  //     type: String, // Assuming you store file paths or URLs as strings
  //     required: true,
  //   },
  // ],
  availability: {
    type: Date,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{11}/.test(v); // Assuming phone numbers should be 11 digits long
      },
      message: props => `${props.value} is not a valid 11-digit phone number!`,
    },
  },
  starRating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
