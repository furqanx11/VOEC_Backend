

const db = require('../../db');

exports.addReferralPoints = (req, res) => {
    const { referrerEmail, referredEmail } = req.body;

    const checkUsersQuery = `
        SELECT * FROM usertable
        WHERE UserEmail IN ('${referrerEmail}', '${referredEmail}')
    `;

    db.query(checkUsersQuery, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }

        if (results.length < 2) {
            res.status(404).send('Referrer or referred user not found');
            return;
        }

       
        const [referrer, referred] = results;

        const updateQuery = `
            -- Update points logic here --
        `;

        db.query(updateQuery, async (error, results) => {
            if (error) {
                console.error('Could not execute query.', error);
                res.status(500).send('An error occurred.');
                return;
            }

            if (results) {
                res.status(200).send('Referral points added successfully');
            } else {
                res.status(500).send('Error in updating points');
            }
        });
    });
};
