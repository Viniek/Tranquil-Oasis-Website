import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Apartments.css';

// Import images
import apartment1 from '../../assets/apartment1.png';
import apartment2 from '../../assets/apartment2.png';
import apartment3 from '../../assets/apartment3.png';
import apartment4 from '../../assets/apartment4.png';
import apartment5 from '../../assets/apartment5.png';
import apartment6 from '../../assets/apartment6.png';
import apartment7 from '../../assets/apartment7.png';
import apartment8 from '../../assets/apartment8.png';
import apartment9 from '../../assets/apartment9.png';
import apartment10 from '../../assets/apartment10.png';
import apartment11 from '../../assets/apartment11.png';
import apartment12 from '../../assets/apartment12.png';

// Create an array of the imported images
const images = [
  apartment1,
  apartment2,
  apartment3,
  apartment4,
  apartment5,
  apartment6,
  apartment7,
  apartment8,
  apartment9,
  apartment10,
  apartment11,
  apartment12,
];

function Apartments({ user, updateCartCount, showNotification }) {
  const [apartments, setApartments] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/apartments');
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

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

    fetchApartments();
    fetchCartItems();
  }, [user]);

  const handleAddToCart = async (apartment) => {
    if (!user) {
      alert('Please log in to add items to the cart.');
      return;
    }

    if (cartItems.some(item => item.spaceId === apartment.space_id)) {
      alert('This item is already in your cart.');
      return;
    }

    try {
      const cartItem = {
        userId: user.user_id,
        spaceId: apartment.space_id,
      };
      const response = await axios.post('http://localhost:7000/api/cart', cartItem);
      setCartItems([...cartItems, response.data]);
      updateCartCount(cartItems.length + 1); // Update cart count in the navbar
      showNotification('Item added to cart!'); // Show notification
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className='apartments'>
      <h1>Available Apartments</h1>
      <div className='apartment-list'>
        {apartments.map((apartment, index) => (
          <div key={apartment.space_id} className='apartment-card'>
            <img 
              src={images[index % images.length]} // Use the imported images
              alt={`Apartment ${index + 1}`} 
              className='apartment-image' 
            />
            <h2>{apartment.type}</h2>
            <p>Location: {apartment.location}</p>
            <p>Floor: {apartment.floor}</p>
            <p>Price: ${apartment.price}</p>
            <button onClick={() => handleAddToCart(apartment)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apartments;
