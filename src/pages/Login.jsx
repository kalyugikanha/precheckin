// src/pages/Login.jsx - FINAL & CORRECT STRUCTURE

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import backgroundImage from '../assets/login-bg.svg';

function Login() {
    const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

 // src/pages/Login.jsx

// ...

const handleSubmit = (e) => {
  e.preventDefault(); // Prevent page reload

  // --- VALIDATION CHECK ---
  // The .trim() function removes any accidental spaces
  if (phoneNumber.trim() === '') {
    alert("Please enter a phone number."); // Show an error message
    return; // Stop the function here
  }
  
  // --- ADDING A CHECK FOR 10 DIGITS ---
  if (phoneNumber.trim().length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    return; // Stop the function here
  }

  // If the phone number is valid, then proceed
  console.log("Navigating with phone number:", phoneNumber);
  navigate('/verify-otp', { state: { phoneNumber: phoneNumber } });
};

  return (
    <div className="login-page-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="screen-overlay">
        <div className="content-wrapper">
          
          <div className="panel quote-panel">
            <div className="quote-icon">“</div>
            <p className="quote-text">
              Tell us your travel dreams, we will make them come true!
            </p>
          </div>
          
          <div className="separator"></div>
          
          <div className="panel form-panel">
            <h2>Welcome to staymaster</h2>
            <p className="subtitle">Login or Sign up</p>
            
            <form className="phone-form" onSubmit={handleSubmit}>
              
              {/* --- THIS IS THE NEW, CORRECT STRUCTURE --- */}
              
              {/* Box 1: Country Code (It's not a real input, just looks like one) */}
              <div className="input-field">
                <span>India (+91)</span>
              </div>
              
              {/* Box 2: Phone Number Input */}
              <div className="input-field">
                <input
                  type="tel"
                  className="phone-input"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
              </div>

              <button type="submit" className="continue-btn">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;