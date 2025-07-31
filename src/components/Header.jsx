import React from 'react';
import './Header.css';
import logo from '../assets/logog.png'

function Header() {
  return (
    <header className="main-header">
      <img src={logo} alt="Staymaster Logo" className="header-logo" />
      {/* We will add navigation links and profile icon later */}
      <div className="header-menu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </div>
    </header>
  );
}
export default Header;