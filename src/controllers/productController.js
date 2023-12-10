const db = require('../../db');

module.exports.create = (req, res) => {
    const { title, image, description, price, brandID, quantity} = req.body;

    const query = `INSERT INTO product (ProdName, ProdDescription, ProdPrice, ProdQty)
    VALUES ('${title}', '${description}', '${price}', '${quantity}')`;

    
    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }

        if (results) {
            res.status(200).send('Product created successfully');
        } else {
            res.status(404).send('An error occurred.');
        }
    });
};

module.exports.listing = (req, res) => {

    const query = `SELECT * FROM product`;

    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }

        if (results.length > 0) {
            res.status(200).send(results);

        } else {
            res.status(404).send('An error occured');
        }
    });
};

module.exports.getSingle = (req, res) => {
    const query = `SELECT * FROM product WHERE ProdID = '${req.params.id}'`;

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