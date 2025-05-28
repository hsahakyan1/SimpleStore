const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

dotenv.config();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


