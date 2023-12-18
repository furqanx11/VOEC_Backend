const db = require('../../db');

module.exports.create = (req, res) => {
    const { title, image, description, price, brandID, quantity} = req.body;

    // check brand
    if(brandID){
        const checkBrand = `SELECT BrandName FROM brand WHERE BrandID = '${brandID}'`;
            
        db.query(checkBrand, async (error, results) => {
            if (error) {
                console.error('Could not execute query.', error);
                res.status(500).send('An error occurred.');
                return;
            }
            if (!results[0]) {
                res.status(404).send('BrandID does not exist');
            }
        })
    }


    const query = `INSERT INTO product (ProdName, ProdDescription, ProdPrice, ProdQty, BrandID)
    VALUES ('${title}', '${description}', '${price}', '${quantity}', '${brandID}')`;

    
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

module.exports.comparison = (req, res) => {
    const { productid1, productid2 } = req.query;

    if (!productid1 || !productid2) {
      return res.status(400).json({ error: 'Both product IDs are required' });
    }

    const query = `
    SELECT * FROM product 
    WHERE ProdID IN (${productid1}, ${productid2})
  `;

    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }
        if (results[0]) {
            res.json({ products: results });

        } else {
            res.status(404).send('No record found');
        }
    });
};

module.exports.createFeedback = (req, res) => {
    const { userID, prodID, comment } = req.body;

    const query = `INSERT INTO feedback (UserID, ProdID, Comment) VALUES (?, ?, ?)`;

    db.query(query, [userID, prodID, comment], (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred while adding feedback.');
            return;
        }

        if (results) {
            res.status(200).send('Feedback added successfully');
        } else {
            res.status(404).send('An error occurred while adding feedback.');
        }
    });
};
