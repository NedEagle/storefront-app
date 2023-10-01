window.onload = function() {
    fetchProducts();
};

function fetchProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            const productDiv = document.getElementById('products');
            productDiv.innerHTML = data.map(product => `
                <div>
                    ID: ${product.id} | Name: ${product.name} | Price: $${product.price}
                </div>
            `).join('');
        });
}

function placeOrder() {
    const productID = document.getElementById('productID').value;
    const quantity = document.getElementById('quantity').value;

    fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productID: productID,
            quantity: quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Ordered ${data.quantity} of product ${data.productID}`);
    });
}
