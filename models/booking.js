
const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  email: {
    type: String,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  roomSize: {
    type: Number,
  },
  // imageUrls: [
  //   {
  //     type: String,
  //
  //   },
  // ],
  availability: {
    type: Date,
  },
  rent: {
    type: Number,
  },
  userNumber: {
    type: Number,
  },
  phoneNumber: {
    type: String,

    validate: {
      validator: function (v) {
        return /\d{11}/.test(v); 
      },
      message: (props) =>
        `${props.value} is not a valid 11-digit phone number!`,
    },
  },
  starRating: {
    type: Number,
  },
  description: {
    type: String,
  },
});

// Create the House model using the schema
const Booking = mongoose.model("Booking", bookingSchema);

// Export the House model for use in other parts of the application
module.exports = Booking;
