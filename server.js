require('dotenv/config');
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const brandRoutes = require('./src/routes/brandRoutes');

const db = require('./db');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/brand', brandRoutes);


app.listen(5000, () => console.log('Server is running...'));