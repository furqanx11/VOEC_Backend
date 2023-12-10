const db = require('../../db');

module.exports.login = (req, res) => {
    const { UserEmail, Pwd } = req.body;

    const query = `SELECT * FROM usertable WHERE UserEmail = '${UserEmail}'`;

    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }

        if (results.length > 0) {
            const comparison = Pwd == results[0].Pwd;
            if (comparison) {
                res.status(200).send('User authenticated.');
            } else {
                res.status(401).send('Wrong password.');
            }
        } else {
            res.status(404).send('User does not exist.');
        }
    });
};