const Property = require('../models/properties');
const mongoose = require('mongoose');

const User = require('../models/user');
// Controller function to add a new property
const createProperty = async (req, res) => {
  // Get the authenticated user's ID


  const {address, neighborhood, squareFeet, parkingGarage, publicTransportation, availabilityDate, leaseTerm, price } = req.body;
  
  try {
    // Create a new property instance
    // Assuming you have found the user based on the email
const user = await User.find({ email:User.email });
if (!user) {
  return res.status(404).send('User not found');
}

// Create a new property instance with the user's ID as the owner
const newProperty = new Property({
  owner: user.id, // Use user._id to access the user's ID
  address,
  neighborhood,
  squareFeet,
  parkingGarage,
  publicTransportation,
  availabilityDate,
  leaseTerm,
  price
});


    // Save the new property to the database
    await newProperty.save();

    // Send a success response
    res.status(201).send('Property added successfully');
  } catch (err) {
    console.error('Error adding property:', err);
    res.status(500).send('Internal Server Error');
  }
};
const getUserProperties = async (req, res) => {
    try {
        const user = await User.find({ email:User.email }); // Assuming user ID is available in req.user after login
      const properties = await Property.find({ owner: user.id });
      res.json(properties);
    } catch (error) {
      console.error('Error fetching user properties:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller function to update a property
  const updateProperty = async (req, res) => {
    const { address, 
        neighborhood,
        squareFeet,
        parkingGarage,
        publicTransportation,
        availabilityDate,
        leaseTerm,
        price } = req.body;
    const propertyId = req.params.id;
  
    try {
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        { $set: {  address, 
            neighborhood,
            squareFeet,
            parkingGarage,
            publicTransportation,
            availabilityDate,
            leaseTerm,
            price } },
        { new: true }
      );
  
      if (!updatedProperty) {
        return res.status(404).json({ error: 'Property not found' });
      }
  
      res.json(updatedProperty);
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const deleteProperty = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the property with the given ID exists
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).send('Property not found');
      }
  
      // Perform the deletion
      await Property.findByIdAndDelete(id);
      res.status(200).send('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
module.exports = {
  createProperty,updateProperty,getUserProperties,deleteProperty
};
