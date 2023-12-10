require('dotenv/config');
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const db = require('./db');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/product', productRoutes);

app.listen(3000, () => console.log('Server is running...'));