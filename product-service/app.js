const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');


const PORT = 3000;

let products = [
    { id: 1, name: 'Shirt', price: 30, imageURL: 'http://localhost:3002/images/shirt.png' },
    { id: 2, name: 'Pants', price: 50, imageURL: 'http://localhost:3002/images/pant.png' }
];


app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());


app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
});