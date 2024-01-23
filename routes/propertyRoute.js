const express = require("express");

const router = express.Router();
const propertyController = require("../controllers/propertyController");

// Create a new property
router.post("/properties", propertyController.createProperty);

// Get all properties
router.get("/properties", propertyController.getAllProperties);

// Get a specific property by ID
router.get("/properties/:id", propertyController.getPropertyById);

// Update a property by ID
router.put("/properties/:id", propertyController.updateProperty);

// Delete a property by ID
router.delete("/properties/:id", propertyController.deleteProperty);

module.exports = router;
