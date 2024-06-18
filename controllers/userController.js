exports.getProfile = (req, res) => {
    res.json({ message: 'User profile retrieved successfully', user: req.user });
  };
   