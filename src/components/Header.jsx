import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logog.png';

function Header() {
  const navigate = useNavigate();
  // Check if the auth token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('authToken');
  // State to manage the dropdown menu's visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Close the dropdown menu first
    setIsMenuOpen(false);
    // Remove the authentication token
    localStorage.removeItem('authToken');
    // Redirect to the login page
    navigate('/');
  };

  // Function to toggle the menu's state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header">
      <img src={logo} alt="Staymaster Logo" className="header-logo" />

      {/* Only render the menu container if the user is logged in */}
      {isLoggedIn && (
        <div className="header-menu-container">
          {/* The hamburger icon button */}
          <button onClick={toggleMenu} className="hamburger-icon" aria-label="Toggle menu">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>

          {/* The dropdown menu, which is rendered conditionally */}
          {isMenuOpen && (
            <div className="logout-dropdown">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;