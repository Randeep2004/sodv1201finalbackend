const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the owner (user)
  address: { type: String, required: true },
  neighborhood: { type: String, required: true },
  squareFeet: { type: Number, required: true },
  parkingGarage: { type: String, enum: ['yes', 'no'], required: true },
  publicTransportation: { type: String, enum: ['yes', 'no'], required: true },
  availabilityDate: { type: Date, required: true },
  leaseTerm: { type: Number, required: true },
  price: { type: Number, required: true }
  // Add more fields as needed
});

module.exports = mongoose.model('Property', propertySchema);
