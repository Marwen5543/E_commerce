const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = (req, res) => {
    
    const user = req.user;
    const token = jwt.sign({ userId: user.id }, '7a8b2c15e9f4d0a361b5f8e2c4d9a0e7', { expiresIn: '24h' }); // Token expires in 1 hour
    res.status(201).json({ message: 'Logged in successfully', user, token });
  };

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(username, hashedPassword);
    res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
