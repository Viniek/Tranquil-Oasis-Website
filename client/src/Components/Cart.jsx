import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

function Cart({ user, toggleCartPopup, updateCartCount }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:7000/api/cart/${user.user_id}`);
          setCartItems(response.data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [user]);

  const handleDeleteFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:7000/api/cart/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
      updateCartCount(cartItems.length - 1); // Update cart count in the navbar
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.space.price), 0).toFixed(2);
  };

  return (
    <div className='cart-popup'>
      <div className='cart-popup-inner'>
        <button className='close-btn' onClick={toggleCartPopup}>X</button>
        <h2>Shopping Cart</h2>
        <div className='cart-items'>
          {cartItems.map(item => (
            <div key={item.id} className='cart-item'>
              <p>{item.space.type}</p>
              <p>${item.space.price}</p>
              <button onClick={() => handleDeleteFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className='cart-total'>
          <p>Total: ${calculateTotal()}</p>
        </div>
        <button className='checkout-btn'>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
