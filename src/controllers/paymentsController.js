const db = require ('../../db');

module.exports.make_payment = async (req, res) => {
    const { user, seller, amount } = req.body;

    if (!user || !seller || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid request.' });
    }

    try {

        await db.beginTransaction();

        let userExists, sellerExists;
        try {
            userExists = await db.query(`SELECT balance FROM usertable WHERE UserName = '${user}'`);
            sellerExists = await db.query(`SELECT balance FROM seller WHERE sellerName = '${seller}'`);
        } 
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database error' });
        }

            if (!userExists[0] || !sellerExists[0]) {
                return res.status(400).json({ error: 'User or seller does not exist' });
            }   

        if (userExists.balance < amount) {
            throw new Error('Insufficient funds.');
        }

        await db.query('UPDATE usertable SET balance = balance - ? WHERE UserName = ?', [amount, user]);
        await db.query('UPDATE usertable SET balance = balance + ? WHERE UserName = ?', [amount, seller]);

        await db.commit();

        res.json({ message: 'Payment successful.' });
    } catch (error) {

        await db.rollback();

        res.status(400).json({ error: error.message });
    }
};
