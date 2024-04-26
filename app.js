const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const connectDB = require('./connectdb');
const userRoutes = require('./routes/userRoute')
const propertyRoutes = require('./routes/propertyRoute');
const workspaceRoutes = require('./routes/workspaceRoute');
 // Import JWT library

// Load JWT secret key from environment variable

const { dirname } = require('path/posix');
const path = require('path');


const session = require('express-session');
const app = express();
const cors = require('cors');
app.use('/owner.css', express.static(path.join(__dirname, 'public', 'owner.css'), { 
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));
app.use(cors()); 
// Serve other static files
app.use(express.static(path.join(__dirname, 'public')));
  // Serve other static files
  
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', userRoutes);
app.use('/', propertyRoutes);
app.use('/', workspaceRoutes);
// Middleware to decode JWT and set req.user


// Example route that requires authentication
// app.get('/user/profile', (req, res) => {
//   // Access req.user to get the authenticated user's information
//   const userId = req.user.id; // Assuming req.user contains user ID

//   // Use userId to fetch user-specific data (e.g., user profile)
//   // Send response back to the client
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
