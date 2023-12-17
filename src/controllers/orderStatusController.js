const db = require('../../db');

  
function calculatePercentageRemaining(lat1, lon1, lat2, lon2) {
    distance = Math.sqrt((lat1 - lat2) ** 2 + (lon2 - lon2) ** 2);
    return distance*100;
  }
  
  
module.exports.order_status = (req, res) => {
   
    db.query('SELECT * FROM order_test WHERE o_id = ?', [req.params.id], (err, orders) => {
        if (err) throw err;

        if (orders.length === 0) {
            return res.status(404).send('Order not found');
        }

        const order = orders[0];

       
        db.query('SELECT latitude, longitude FROM customer WHERE CustId = ?', [order.CustomerId], (err, results) => {
            if (err) throw err;

            const customerLocation = results[0];

            if (!customerLocation) {
                return res.status(404).send('Location not found');
            }

            console.log(customerLocation);

            const storeLocation = { latitude: 24.8067, longitude: 67.0284 }; 

            const percentageRemaining = calculatePercentageRemaining(customerLocation.latitude, customerLocation.longitude, storeLocation.latitude, storeLocation.longitude);
            currentDistance = (`${percentageRemaining.toFixed(2)}% distance remaining.`);
            console.log(currentDistance);

            
            let status;
            if (currentDistance >= 100) {
                status = 'Delivered';
            } else if (currentDistance >= 80) {
                status = 'Almost there';
            } else if (currentDistance >= 50) {
                status = 'In transit';
            } else if (currentDistance >= 10) {
                status = 'Dispatched';
            } else {
                status = 'Processing';
            }

            res.send({ status });
        });
    });
};