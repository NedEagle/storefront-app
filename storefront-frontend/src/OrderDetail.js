import React from 'react';

function OrderDetail({ product, quantity }) {
    return (
        <div>
            <h2>Order Details</h2>
            <p>Product: {product.name}</p>
            <p>Quantity: {quantity}</p>
            <p>Total Cost: ${product.price * quantity}</p>
        </div>
    );
}

export default OrderDetail;