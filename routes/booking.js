
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const House = require("../models/booking"); //
router.post("/bookings", async (req, res) => {
  try {
  

    const newHouse = new House(req.body);

    await newHouse.save();

    res.status(201).json(newHouse);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const deletedHouse = await House.findByIdAndDelete(id);

    if (!deletedHouse) {
      return res.status(404).json({ error: "House booking not found" });
    }

    res.json(deletedHouse);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const { email } = req.query;

    
    const filter = email ? { email } : {};

    
    const filteredBookings = await House.find(filter);

    res.json(filteredBookings);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
