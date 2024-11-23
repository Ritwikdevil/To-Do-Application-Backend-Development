const User = require('../models/User');

//view profile 
exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
};


//update profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
