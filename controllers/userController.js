const User = require('../models/user');

const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { username, email, password, phone, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({message:"Email already exists. Please use a different email."});
    }
    // Generate a salt
    const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
bcrypt.hash(password,saltRounds).then(hashedPassword=>{
  const newUser=new User({
    username, email, password: hashedPassword, phone, role
  });
   newUser.save();
})
.catch(err=>{
  res.status(400).send("failed to signup");
})
   
    if (role === 'admin') {
              res.redirect('/ownerPage'); // Redirect to owner page
            } else if (role === 'user') {
              res.redirect('/coworkerPage'); // Redirect to coworker page
            } 
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Internal Server Error');
  }
};


// Controller function to handle user registration
// const registerUser = async (req, res) => {
//   const { username, email, password, phone, role } = req.body;
//   try {
   
//     const newUser = new User({ username, email, password, phone, role });
//     await newUser.save();
//     if (role === 'admin') {
//         res.redirect('/ownerPage'); // Redirect to owner page
//       } else if (role === 'user') {
//         res.redirect('/coworkerPage'); // Redirect to coworker page
//       } 
      
      
//     // Redirect to success page
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(500).send('Internal Server Error');
//   }
// };


// Controller function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    // If user not found, send error response
    if (!user) {
      console.log('User not found for email:', email);
      res.status(401).send('Invalid credentials');
    }
    else {
      User.find({ email })
          .then(data => {
              if (data.length > 0) {
                  const hashedPassword = data[0].password;
                  bcrypt.compare(password, hashedPassword)
                      .then(result => {
                          if (result) {
                              console.log('Password match for user:', email);
                              res.redirect('/ownerPage');
                          } else {
                              console.log('Password mismatch for user:', email);
                              // Send an error response if the password doesn't match
                              res.status(401).send('Invalid credentials');
                          }
                      })
                      .catch(err => {
                          console.error('Error comparing passwords:', err);
                          res.status(500).json({message:'Internal Server Error'});
                      });
              } else {
                  // No user found with the provided email
                  console.log('User not found for email:', email);
                  res.status(401).json({message:'Invalid credentials'});
              }
          })
          .catch(err => {
              console.error('Error finding user:', err);
              res.status(500).send('Internal Server Error');
          });
  }
  
      
  }

      // if (!isMatch) {
      //   console.log('Password mismatch for user:', email);
      //   return res.status(401).send('Invalid credentials');
      // }
    

// const hashedPassword=data[0].password;
//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, hashedPassword);

//     if (!isMatch) {
//       console.log('Password mismatch for user:', email);
//       return res.status(401).send('Invalid credentials');
//     }

    // If credentials are valid, send success response
   
 catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  loginUser,
  registerUser,
};

