import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart, updateQuantity, handleCheckout }) => {
  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleQuantityChange = (index, value) => {
    updateQuantity(index, value);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <h3>{item.product_name}</h3>
                <p>Description: {item.description}</p>
                <p>Price: ${item.price}</p>
                <img src={item.image} alt={item.product_name} />
                <div>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  />
                </div>
              </li>
            ))}
          </ul>
          <Link to={{ pathname: '/checkout', state: { cart } }}>Continue to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
