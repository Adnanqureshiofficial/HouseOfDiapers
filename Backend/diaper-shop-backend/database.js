const mysql = require('mysql2');

const dbase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aizah$98890',
    database: 'houseofdiapers'
});

dbase.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database Connection Successful');
});

module.exports = dbase;