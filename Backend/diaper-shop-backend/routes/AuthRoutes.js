
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dbase = require('../database');


router.post('/register', async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const userQuery = `
      INSERT INTO users (name, username, email, phone, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    const userValues = [name, username, email, phone, hashedPassword];

    dbase.query(userQuery, userValues, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      const userId = result.insertId; // Get the newly created user’s ID

      // Now insert a cart row for this user
      const cartQuery = `INSERT INTO carts (user_id) VALUES (?)`;
      dbase.query(cartQuery, [userId], (cartErr, cartResult) => {
        if (cartErr) {
          console.error('Error creating cart:', cartErr);
          return res.status(500).json({ message: 'User created, but failed to create cart' });
        }

        res.status(201).json({ message: 'User and cart created successfully' });
        console.log("User registration and cart creation successful");
      });
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

  
  //login route
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
  console.log("login route reached")
    const query = 'SELECT * FROM users WHERE username = ?';
    dbase.query(query, [username], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Set session
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
  
      res.status(200).json({
        message: 'Login successful',
        user: req.session.user
      });
    });
  });

  //admin login route
 // routes/adminLogin.js

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
console.log(username)
console.log(password)
  const sql = `SELECT id, name, username, email, phone, role 
               FROM users 
               WHERE username = ? AND password = ? AND role = 'admin'`;

  dbase.query(sql, [username, password], (err, results) => {
 
    if (err) {
      console.log(err);
      console.log("error blocked reached  ")
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
console.log("error block passed")
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials or not an admin' });
    }

    const adminUser = results[0];
    const sendAdminDetails = {
      id: adminUser.id,
      username: adminUser.username, 
      role: adminUser.role
    }
    console.log(adminUser)
    res.status(200).json({ success: true, message: 'Login successful', user: sendAdminDetails });
  });
});

module.exports = router;


module.exports = router;


