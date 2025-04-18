
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dbase = require('../database');


router.post('/register', async (req, res) => {
    try {
      const { name, username, email, phone, password } = req.body;
  
      // Check if required fields exist
      if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into database
      const query = `
        INSERT INTO users (name, username, email, phone, password)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [name, username, email, phone, hashedPassword];
  
      dbase.query(query, values, (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ message: 'Database error' });
        }
  
        res.status(201).json({ message: 'User registered successfully' });
        console.log("user registration successfull")
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

module.exports = router;


