import React from 'react';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-us">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us using the form below.</p>
      </section>
      <section className="contact-form-section">
        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="6" required></textarea>
          
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default ContactUs;
