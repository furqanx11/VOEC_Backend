const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'se_project'
});

db.connect((error) => {
    if (error) {
        console.error('Could not connect to the database.', error);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

module.exports = db;