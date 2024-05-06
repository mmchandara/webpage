// ProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

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

  const handleAddToCart = (product) => {
    addToCart(product);
    window.location.href = '/cart'; // Redirect to the cart page after adding to cart
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <h3>{product.product_name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.product_name} />
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
