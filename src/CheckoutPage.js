import React, { useState } from 'react';

const CheckoutPage = ({ cart, currentUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    address: currentUser.address || '',
    paymentMethod: 'debit'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Ordered Items:', cart);
    setOrderPlaced(true);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <h3>Ordered Items:</h3>
        {cart && cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <h4>{item.product_name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>Payment Method:</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="debit">Debit Card</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
      {orderPlaced && (
        <div>
          <h3>Order Placed Successfully!</h3>
          <h4>Receipt:</h4>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <h4>{item.product_name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
