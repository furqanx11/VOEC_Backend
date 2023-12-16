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

