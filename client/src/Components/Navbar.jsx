import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Header_icon from '../assets/logo1.png';

function Navbar({ toggleLoginPopup, isLoggedIn, user, handleLogout, cartCount, toggleCartPopup }) {
  return (
    <header className='nav'>
      <div className='logo'>
        <img src={Header_icon} alt='Logo' />
      </div>
      <ul className='nav-links'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/properties'>Apartments</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
        <li className='cart-icon' onClick={toggleCartPopup}>
          🛒<span className='cart-count'>{cartCount}</span>
        </li>
      </ul>
      <div className='auth'>
        {isLoggedIn ? (
          <>
            <span>Welcome, {user.firstname}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={toggleLoginPopup}>Login / Signup</button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
