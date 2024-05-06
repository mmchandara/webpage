import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import axios from 'axios';
import Login from './Login';

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser(currentUser);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };
  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.product_id === product.product_id);
  
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    window.location.href = '/checkout';
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cart" activeClassName="active">Shopping Cart</NavLink>
            </li>
            <li>
              <NavLink to="/checkout" activeClassName="active">Checkout</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <span>Welcome, {currentUser}</span>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <NavLink to="/login" activeClassName="active">Login</NavLink>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} handleCheckout={handleCheckout} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} currentUser={currentUser} />} />
          <Route path="/login" element= {<Login onLogin={handleLogin}/>} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ products, addToCart }) => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <h3>{product.product_name}</h3>
            <img src={product.image} alt={product.product_name} />
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
