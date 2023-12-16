require('dotenv/config');
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const db = require('./db');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server is running...'));