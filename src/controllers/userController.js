const db = require('../../db');

module.exports.get = (req, res) => {
    const query = `SELECT UserID, FirstName, LastName, Email, Phone, Address, BirthDate, RegistrationDate, ProfileImageURL FROM users WHERE UserID = '${req.params.id}'`;
    
    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }
        if (results[0]) {
            res.status(200).send(results[0]);

        } else {
            res.status(404).send('An error occured');
        }
    });
};

module.exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const updatedKeys = Object.keys(updatedData);

    if (updatedKeys.length === 0) {
        return res.status(400).send('No data provided for update')
    }

    let errorMsg = ''
    for (let i = 0; i < updatedKeys.length; i++) {
        if (!updatedData[updatedKeys[i]]) {
            errorMsg = updatedKeys[i] + ' cannot be empty'
            break
        }
    }

    if (errorMsg) {
        return res.status(400).send(errorMsg)
    }

    const setClause = updatedKeys.map((key) => `${key} = ?`).join(', ');
    const query = `UPDATE users SET ${setClause} WHERE UserID = ?`

    db.query(query, [...Object.values(updatedData), id], async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }
        if (results) {
            res.status(200).send('User Updated Successfully');

        } else {
            res.status(404).send('User not Found');
        }
    });
};


module.exports.updatePassword = (req, res) => {
    const { currentPassword, newPassword, confirmPassword} = req.body;

    let errorMsg = ''

    if(!currentPassword){
        errorMsg = "currentPassword is required";
    }

    if(!newPassword){
        errorMsg = "newPassword is required";
    }

    if(!confirmPassword){
        errorMsg = "confirmPassword is required";
    }

    if(newPassword != confirmPassword){
        errorMsg = "confirmPassword doesn't match";
    }

    if (errorMsg) {
        return res.status(400).send(errorMsg)
    }

    const query = `SELECT Password FROM users WHERE UserID = '${req.params.id}'`;

    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }
        if (results[0]) {

            if(results[0].Password != currentPassword){
                errorMsg = "currentPassword doesn't match";
            }

            if (errorMsg) {
                return res.status(400).send(errorMsg)
            }

            const updateQuery = `UPDATE users SET Password = ${newPassword} WHERE UserID = '${req.params.id}'`;

            db.query(updateQuery, async (error, results) => {
                if (error) {
                    console.error('Could not execute query.', error);
                    res.status(500).send('An error occurred.');
                    return;
                }
                if (results) {
                    res.status(200).send('Password updated successfully');
        
                } else {
                    res.status(404).send('An error occured');
                }
            });
        } else {
            res.status(404).send('User not Found');
        }
    });
};

module.exports.addReferralPoints = (req, res) => {
    const { referrerEmail, referredEmail } = req.body;

    const checkUsersQuery = `
        SELECT * FROM users
        WHERE Email LIKE '%${referrerEmail}%' OR Email LIKE '%${referredEmail}%'
    `;

    db.query(checkUsersQuery, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }
        
        console.log('Query results:', results);

        if (results.length < 2) {
            res.status(404).send('Referrer or referred user not found');
            return;
        }

        // Update logic based on your database structure
        // Modify this part to fit your schema
        const [referrer, referred] = results;

        // Example update query, replace with your actual update logic
        const updateQuery = `
            UPDATE users
            SET ReferrerPoints = ReferrerPoints + 1, ReferredPoints = ReferredPoints + 1
            WHERE UserID IN (${referrer.UserID}, ${referred.UserID})
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
