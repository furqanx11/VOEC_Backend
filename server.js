require('dotenv/config');
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const brandRoutes = require('./src/routes/brandRoutes');
const userRoutes = require('./src/routes/userRoutes');
const referralRoutes = require('./src/routes/referralRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const db = require('./db');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/brand', brandRoutes);
app.use('/users', userRoutes);
app.use('/referral', referralRoutes);
app.use('/payment', paymentRoutes);

app.listen(3000, () => console.log('Server is running...'));