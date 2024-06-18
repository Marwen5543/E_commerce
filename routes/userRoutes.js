const express = require('express');
const userController = require('../controllers/userController');
const passport = require('../config/passport');

const router = express.Router();

router.get('/profile', passport.authenticate('local'), userController.getProfile);

module.exports = router;
