import React from 'react';
import './Home.css';
import TypingEffect from 'react-typing-effect';
import ApartmentImage from '../../assets/home.png'; // Update the path to your image

function Home() {
  return (
    <div className='home'>
      <section className='hero'>
        <div className='hero-content'>
          <div className='hero-text'>
            <h1>Your Dream Home Awaits</h1>
            <div className='typing-effect'>
              <span>Discover</span>
              <TypingEffect
                text={[' the best listings.', ' your perfect apartment.', ' luxurious living.']}
                speed={100}
                eraseSpeed={50}
                eraseDelay={2000}
                typingDelay={500}
                cursorClassName='cursor'
              />
            </div>
            <p>Find your perfect apartment with us.</p>
          </div>
          <div className='hero-image'>
            <img src={ApartmentImage} alt='Apartment' />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
