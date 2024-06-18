const express = require('express');
const passport = require('../config/passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', passport.authenticate('local'), authController.login);
router.post('/signup', authController.signup);
module.exports = router;
