const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');

// Route to handle user registration
router.post('/signup', userController.registerUser);
router.post('/login',userController.loginUser);

// Route for owner page

router.get('/ownerPage', (req, res) => {
  const ownerFilePath = path.join(__dirname, '..', 'public', 'owner.html');
  res.sendFile(ownerFilePath);
});

// Route for coworker page
router.get('/coworkerPage', (req, res) => {
  const coworkerFilePath = path.join(__dirname, '..', 'public', 'coworker.html');
  res.sendFile(coworkerFilePath);
});


module.exports = router;


