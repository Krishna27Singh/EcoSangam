const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Add this import
const { signup, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware'); // Add your auth middleware import
const User = require('../models/User'); // Adjust path if your model is somewhere else

// Local Auth
router.post('/signup', signup);
router.post('/login', login);

// NEW: A unified route that returns the user using the JWT token
// NEW: Fetch the full user from the database using the ID in the token
router.get('/me', auth, async (req, res) => {
  try {
    // req.user.id comes from the decoded JWT token in your auth middleware
    const user = await User.findById(req.user.id).select('-password'); 
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Send the FULL database document back to the frontend
    res.json(user); 
  } catch (err) {
    console.error("Error fetching user in /me route:", err.message);
    res.status(500).send('Server Error');
  }
});

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5175',
    session: false // CRITICAL: Turn off sessions
  }),
  (req, res) => {
    // Generate a JWT token for the Google user
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    // Redirect to frontend with the token safely in the URL
    res.redirect(`http://localhost:5175/home?token=${token}`); 
  }
);

// Add this to your backend authroute.js
router.put('/update_profile', auth, async (req, res) => {
  try {
    const { name, email, location } = req.body;
    
    // Find user by the ID attached to the JWT token and update their fields
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email, location }, 
      { new: true } // Returns the updated document
    ).select('-password'); // Don't return the password

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error updating profile' });
  }
});

// ... keep your logout route or update it to just send a 200 OK
module.exports = router;