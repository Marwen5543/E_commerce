const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const produitRoutes = require('./routes/produitRoutes');
const commandeRoutes = require('./routes/commandeRoutes')
const cors = require('cors'); // Import the cors middleware
const path = require('path');
const imagesDirectory = path.join(__dirname, 'public', 'images');
const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(session({
  secret: '7a8b2c15e9f4d0a361b5f8e2c4d9a0e7',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days in milliseconds
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product', produitRoutes);
app.use('/commande',commandeRoutes);
app.get('/file/:fileName', function (req, res) {
  const fileName = req.params.fileName;
  const filePath = path.join(imagesDirectory, fileName);

  // Use res.sendFile to send the image file
  res.sendFile(filePath, function (err) {
    if (err) {
      // Handle any errors, e.g., file not found
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
