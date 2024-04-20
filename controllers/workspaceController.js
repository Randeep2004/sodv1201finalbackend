const Workspace = require('../models/workspace');
const User = require('../models/user');
// Controller function to add a new workspace
const addWorkspace = async (req, res) => {
   // Assuming user ID is stored in the session after login
  const { userId,address, type, individuals, smoking, availabilityDate, leaseTerm, price } = req.body;

  try {
    const user = await User.find({ email:User.email });
if (!user) {
  return res.status(404).send('User not found');
}
    // Create a new workspace instance
    const newWorkspace = new Workspace({
      userId:user.email, // Assigning the logged-in user's ID to the workspace
      address,
      type,
      individuals,
      smoking,
      availabilityDate,
      leaseTerm,
      price
    });

    // Save the new workspace to the database
    await newWorkspace.save();

    // Send a success response
    res.status(201).send('Workspace added successfully');
  } catch (err) {
    console.error('Error adding workspace:', err);
    res.status(500).send('Internal Server Error');
  }
};
const getUserWorkspaces = async (req, res) => {
    try {
        const user = await User.find({ email:User.email }); // Assuming user ID is available in req.user after login
      const properties = await Workspace.find({ owner: user.id });
      res.json(properties);
    } catch (error) {
      console.error('Error fetching user workspaces:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Controller function to update a property
  const updateWorkspace = async (req, res) => {
    const { address, neighborhood, } = req.body;
    const propertyId = req.params.id;
  
    try {
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        { address, neighborhood }, // Update fields as needed
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
  const deleteWorkspace = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the property with the given ID exists
      const property = await Workspace.findById(id);
      if (!property) {
        return res.status(404).send('Workspace not found');
      }
  
      // Perform the deletion
      await Workspace.findByIdAndDelete(id);
      res.status(200).send('Workspace deleted successfully');
    } catch (error) {
      console.error('Error deleting Workspace:', error);
      res.status(500).send('Internal Server Error');
    }
  };
module.exports = {
  addWorkspace,deleteWorkspace,getUserWorkspaces,updateWorkspace
};
