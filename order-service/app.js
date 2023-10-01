const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;

let orders = [];

app.use(express.json());
app.use(cors());

app.get('/orders', (req, res) => {
    res.json(orders);
});

app.post('/order', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).json(order);
});

app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
});