const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'SE_project'
});

db.connect((error) => {
    if (error) {
        console.error('Could not connect to the database.', error);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/signup', async (req, res) => {
    const { UserEmail, Pwd } = req.body;

    const query = `INSERT INTO usertable (UserEmail, Pwd) VALUES ('${UserEmail}', '${Pwd}')`;

    db.query(query, (error, result) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }

        res.status(201).send('User created.');
    });
});


app.post('/login', (req, res) => {
    const { UserEmail, Pwd } = req.body;

    const query = `SELECT * FROM UserTable WHERE UserEmail = '${UserEmail}'`;

    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }

        if (results.length > 0) {
            const comparison = Pwd == results[0].Pwd;
            if (comparison) {
                res.send('Login Successful');
            } else {
                res.send('Wrong password.');
            }
        } else {
            res.send('User does not exist.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});