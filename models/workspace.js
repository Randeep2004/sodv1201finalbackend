const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who added the workspace
  address: { type: String, required: true },
  type: { type: String, required: true },
  individuals: { type: Number, required: true },
  smoking: { type: String, enum: ['yes', 'no'], required: true },
  availabilityDate: { type: Date, required: true },
  leaseTerm: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Workspace', workspaceSchema);
