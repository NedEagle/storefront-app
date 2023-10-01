import React, { useState, useEffect } from 'react';
import OrderDetail from './OrderDetail'; // Assuming you have this component created as per previous instructions
import './App.css'; // Assuming you have a CSS file for styling

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState('products');
  const [orderedProduct, setOrderedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [size, setSize] = useState('');  

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  const clearErrorMessageAfterDelay = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const placeOrder = () => {
    let errorMessages = [];

    if (!selectedProduct) {
      errorMessages.push('Please select a product.');
      clearErrorMessageAfterDelay();
    }

    if (!size) {
      errorMessages.push('Please select a size.');
      clearErrorMessageAfterDelay();
    }

    if (quantity <= 0) {
      errorMessages.push('Please select a valid quantity greater than 0.');
      clearErrorMessageAfterDelay();
    }

    if (quantity >= 50) {
      errorMessages.push('Please contact Nadim at 111-111-1111 to inquire about a bulk order.');
      clearErrorMessageAfterDelay();
      return;
    }

    if (errorMessages.length > 0) {
      // Joining error messages with a space for readability
      setErrorMessage(errorMessages.join(' '));
      clearErrorMessageAfterDelay();
      return;
    }

    fetch('http://localhost:3001/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productID: selectedProduct,
        size: size,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      // Clear any previous error messages
      setErrorMessage('');
      const productToOrder = products.find(p => p.id === parseInt(data.productID));
      setOrderedProduct({ product: productToOrder, quantity: data.quantity });
      setView('orderDetail');
    })
    .catch(error => {
      // Handle fetch errors
      setErrorMessage('An error occurred while placing the order.');
    });
  };

  return (
    <div className="App">
      {view === 'products' ? (
        <>
          <h1>Nadim's Shirt and Pant WebStore</h1>

          <div className="products-grid">
            {products.map(product => (
              <div 
                key={product.id} 
                className="product-card" 
                onClick={() => setSelectedProduct(product.id)}
              >
                <img src={product.imageURL} alt={product.name} />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </div>
            ))}
          </div>

          <div className="order-section">

          <div className="order-button-container">
            <div className="spacer"></div>
            <h2 className="order-text-button" onClick={placeOrder}>Place an Order</h2>
          <div className="spacer"></div>
          </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
              <option value="">Select a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <select value={size} onChange={e => setSize(e.target.value)}>
              <option value="">Select a size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <input 
              type="number" 
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              min="1" 
            />
          </div>
        </>
      ) : (
        <OrderDetail product={orderedProduct.product} quantity={orderedProduct.quantity} />
      )}
    </div>
  );
}

export default App;
