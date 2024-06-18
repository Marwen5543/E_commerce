
const express = require('express');
const app = express();
const passport = require("passport");
const { Client } = require('pg');
const cookieParser = require('cookie-parser');
const initializePassport = require("./passportConfig");
const session = require("express-session");
const flash = require("express-flash");
require('dotenv').config();

// Database connection details
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL ........');
    // You can start executing queries here
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });


app.get('/users', async (req, res) => {

  const query = 'SELECT * FROM public."Utilisateur"';
  client.query(query)
    .then((result) => {
      const user = result.rows;
      res.json(user);
    })
    .catch((err) => {
      //console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    });
});
app.get('/produit', (req, res) => {

  const query = 'SELECT * FROM public."Produit"';
  client.query(query)
    .then((result) => {
      const produit = result.rows;
      res.json(produit);
    })
    .catch((err) => {
      //console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    });
});

app.get('/commande', (req, res) => {

  const query = 'SELECT * FROM public."Commande"';
  client.query(query)
    .then((result) => {
      const commande = result.rows;
      res.json(commande);
    })
    .catch((err) => {
      //console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    });
});


app.get('/categorie', (req, res) => {

  const query = 'SELECT * FROM public."Categorie"';
  client.query(query)
    .then((result) => {
      const categorie = result.rows;
      res.json(categorie);
    })
    .catch((err) => {
      //console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    });
});


//   // app.get("/", (req, res) => {
//   //   res.render("index");
//   // });

// //  app.get("/users/register", checkAuthenticated, (req, res) => {
// //    res.render("register.ejs");
// //  });

//   app.get("/users/login", checkAuthenticated, (req, res) => {
//     // flash sets a messages variable. passport sets the error message
//     console.log(req.session.flash.error);
//     // res.render("login.ejs");
//   });

//   // app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
//   //   console.log(req.isAuthenticated());
//   //   res.render("dashboard", { user: req.user.name });
//   // });

//   // app.get("/users/logout", (req, res) => {
//   //   req.logout();
//   //   res.render("index", { message: "You have logged out successfully" });
//   // });

//   app.post("/users/register", async (req, res) => {
//     let { name, email, password, password2 } = req.body;

//     let errors = [];

//     console.log({
//       name,
//       email,
//       password,
//       password2
//     });

//     if (!name || !email || !password || !password2) {
//       errors.push({ message: "Please enter all fields" });
//     }

//     if (password.length < 6) {
//       errors.push({ message: "Password must be a least 6 characters long" });
//     }

//     if (password !== password2) {
//       errors.push({ message: "Passwords do not match" });
//     }

//     if (errors.length > 0) {
//       res.render("register", { errors, name, email, password, password2 });
//     } else {
//       hashedPassword = await bcrypt.hash(password, 10);
//       console.log(hashedPassword);
//       // Validation passed
//       pool.query(
//         `SELECT * FROM users
//           WHERE email = $1`,
//         [email],
//         (err, results) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log(results.rows);

//           if (results.rows.length > 0) {
//             return res.render("register", {
//               message: "Email already registered"
//             });
//           } else {
//             pool.query(
//               `INSERT INTO users (name, email, password)
//                   VALUES ($1, $2, $3)
//                   RETURNING id, password`,
//               [name, email, hashedPassword],
//               (err, results) => {
//                 if (err) {
//                   throw err;
//                 }
//                 console.log(results.rows);
//                 req.flash("success_msg", "You are now registered. Please log in");
//                 res.redirect("/users/login");
//               }
//             );
//           }
//         }
//       );
//     }
//   });

  // app.post(
  //   "/users/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/users/dashboard",
  //     failureRedirect: "/users/login",
  //     failureFlash: true
  //   })
  // );

  // function checkAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return res.redirect("/users/dashboard");
  //   }
  //   next();
  // }
  app.use(express.json());
app.use(cookieParser()); // Add this line
app.use(session({
  secret: '7a8b2c15e9f4d0a361b5f8e2c4d9a0e7',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days in milliseconds
}));
app.use(passport.initialize());
app.use(passport.session());

// ... passport configuration

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.cookie('user_id', req.user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Set user_id cookie
  res.json({ message: 'Logged in successfully', user: req.user });
});
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.createUser(username, hashedPassword); // Implement createUser function in db.js
    res.json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


//   function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect("/users/login");
//   }
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});