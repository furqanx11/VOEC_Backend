const db = require('../../db');

module.exports.signup = (req, res) => {
    const { UserEmail, Pwd } = req.body;

    const query = `INSERT INTO usertable (UserEmail, Pwd) VALUES ('${UserEmail}', '${Pwd}')`;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }

        res.status(201).send('User created.');
    });
};

