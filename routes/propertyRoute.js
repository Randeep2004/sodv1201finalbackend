const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');

// Route to handle property creation
router.post('/createp', propertyController.createProperty);
router.get('/user/properties', propertyController.getUserProperties);

// Route to update a property
router.put('/property/:id', propertyController.updateProperty);
router.delete('/dproperty/:id', propertyController.deleteProperty);

module.exports = router;
