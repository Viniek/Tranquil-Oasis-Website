import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Learn more about our company and values.</p>
      </section>
      <section className="about-content">
        <h2>Our Mission</h2>
        <p>We aim to provide the best apartments in the best locations at the best prices. Our customer service is unmatched, and we strive to help you find your dream home.</p>

        <h2>Our Vision</h2>
        <p>We envision a world where everyone has access to quality housing, and we are committed to making that vision a reality through our dedicated services.</p>

        <h2>Our Team</h2>
        <p>Our team is comprised of experienced professionals who are passionate about real estate and customer service. We work tirelessly to ensure you have the best experience possible.</p>
      </section>
    </div>
  );
}

export default AboutUs;
