import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Apartments from './pages/apartments/Apartments';
import Cart from './Components/Cart';
import AboutUs from './pages/about/Aboutus';
import ContactUs from './pages/contact/ContactUs';
import Footer from "./Components/Footer"
import Notification from './Components/Notification';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    toggleLoginPopup();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCartCount(0);
    localStorage.removeItem('user');
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  return (
    <BrowserRouter>
      <Navbar
        toggleLoginPopup={toggleLoginPopup}
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
        cartCount={cartCount}
        toggleCartPopup={toggleCartPopup}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Apartments user={user} updateCartCount={updateCartCount} showNotification={showNotification} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* Add other routes here */}
      </Routes>
      <Footer/>
      {isLoginOpen && <Login handleLogin={handleLogin} toggleLoginPopup={toggleLoginPopup} />}
      {isCartOpen && <Cart user={user} toggleCartPopup={toggleCartPopup} updateCartCount={updateCartCount} />}
      {notification && <Notification message={notification} />}
    </BrowserRouter>
  );
}

export default App;