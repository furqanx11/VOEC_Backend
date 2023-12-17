const db = require('../../db');

module.exports.createBrand = (req, res) => {
    const { BrandName, BrandDescription, BrandLogoURL, EstablishedDate, Country, IsActive} = req.body;

    const query = `INSERT INTO brand (BrandName, BrandDescription, BrandLogoURL, EstablishedDate, Country, IsActive)
    VALUES ('${BrandName}', '${BrandDescription}', '${BrandLogoURL}', '${EstablishedDate}', '${Country}', '${IsActive}')`;

    
    db.query(query, async (error, results) => {
        if (error) {
            console.error('Could not execute query.', error);
            res.status(500).send('An error occurred.');
            return;
        }
        if (results) {
            res.status(200).send('Brand created successfully');
        } else {
            res.status(404).send('An error occurred.');
        }
    });
};

module.exports.getSingleBrand = (req, res) => {
    const query = `SELECT brand.*, (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'ProdName', product.ProdName,
                'ProdDescription', product.ProdDescription
            )
        )
        FROM product
        WHERE product.BrandID = brand.BrandID
    ) AS Products
    FROM brand
    WHERE brand.BrandID = '${req.params.id}';`;

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