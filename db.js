const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

db.connect((error) => {
    if (error) {
        console.error('Could not connect to the database.', error);
        process.exit(1);
    }
    console.log('Connected to the database.');
    
    // Select the database to use
    db.query(`USE ${process.env.DB}`, (err) => {
        if (err) {
            console.error('Error selecting database:', err);
            process.exit(1);
        }
        console.log('Database selected.');
    });
});

module.exports = db;