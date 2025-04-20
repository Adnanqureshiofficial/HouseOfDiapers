var express = require('express');
const dbase = require('../database');
var router = express.Router();


router.get('/getUserDetails/:userId', async (req, res) => {
  const { userId } = req.params; // Extract userId from URL params
console.log(userId)
  try {
    // Query the database to get user details
    const query = 'SELECT id, name, username, email, phone  FROM users WHERE id = ?'
    const result = await dbase.promise().query(query, [userId]);

    if (result[0].length === 0) {
      // If no user found, return a 404 not found response
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming your table columns are like: user_id, name, email, etc.
    const userDetails = result[0][0];
console.log(userDetails)
    // Return user details as a response
    res.json(userDetails);

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to fetch user's address by userId
router.get('/address/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = 'SELECT address FROM user_addresses WHERE user_id = ?';
    const [result] = await dbase.promise().query(query, [userId]);

    if (result.length === 0) {
      // No address found for this user
      return res.status(404).json({ message: 'No address found for this user.' });
    }

    // Return the user's address
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to save or update address for a user
router.post('/update-user-address/:userId', (req, res) => {
  const userId = req.params.userId;
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Address is required.' });
  }

  // Check if address already exists for the user
  const checkQuery = 'SELECT * FROM user_addresses WHERE user_id = ?';
  dbase.query(checkQuery, [userId], (checkErr, result) => {
    if (checkErr) {
      console.error('Check error:', checkErr);
      console.log("fail to add address")
      return res.status(500).json({ message: 'Failed to check address.' });
    }

    if (result.length > 0) {
      // Update existing address
      const updateQuery = 'UPDATE user_addresses SET address = ? WHERE user_id = ?';
      dbase.query(updateQuery, [address, userId], (updateErr) => {
        if (updateErr) {
          console.error('Update error:', updateErr);
          return res.status(500).json({ message: 'Failed to update address.' });
        }
        return res.status(200).json({ message: 'Address updated successfully.' });
      });
    } else {

      // Insert new address
      const insertQuery = 'INSERT INTO user_addresses (user_id, address) VALUES (?, ?)';
      dbase.query(insertQuery, [userId, address], (insertErr) => {
        if (insertErr) {
          console.error('Insert error:', insertErr);
          return res.status(500).json({ message: 'Failed to insert address.' });
        }
        return res.status(201).json({ message: 'Address added successfully.' });
      });
    }
  });
});


module.exports = router;
