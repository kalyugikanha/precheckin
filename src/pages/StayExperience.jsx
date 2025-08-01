import React from 'react';
import toast from 'react-hot-toast';
// THIS IS THE FIX: Only import from 'react-router-dom' ONCE.
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './StayExperience.css';

// --- Your asset imports ---
import headerBgImage from '../assets/header-bg-image.jpeg';
import thumbsUpIcon from '../assets/thumbs-up-icon.png';
import giftIcon from '../assets/gift-icon.png';
import sparkleIcon from '../assets/sparkle-icon.jpg';
import copyIcon from '../assets/copy-icon.jpg';
import downloadIcon from '../assets/download-icon.png';
import refundIcon from '../assets/refund-icon.png';

const StayExperience = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const discountCode = 'FEEDBACK10';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode).then(() => {
        toast.success('Code copied to clipboard!');
      }).catch(err => {
        toast.error('Failed to copy code.');
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className="stay-experience-container">
      <Header />
       <header className="se-header">
        <img src={headerBgImage} alt="Ocean sunset" className="se-header-bg" />
        <div className="se-header-overlay">
          <span className="se-thank-you-pill">Thank You!</span>
          <h1 className="se-header-title">Your Feedback Has Been Submitted</h1>
        </div>
      </header>

      <main className="se-main-content">
        <div className="se-icon-wrapper">
          <img src={thumbsUpIcon} alt="Thumbs Up" />
        </div>

        <h2 className="se-main-title">We appreciate your feedback!</h2>
        <p className="se-subtitle">
          Your comments help us improve our services and provide better experiences for future guests.
        </p>

        <div className="se-gift-card">
          <img src={sparkleIcon} alt="Sparkles" className="se-sparkle-icon" />
          <div className="se-gift-card-content">
            <div className="se-gift-header">
              <div className="se-gift-icon-wrapper">
                <img src={giftIcon} alt="Gift Box" />
              </div>
              <div>
                <h3>Special Gift for You!</h3>
                <p>Thanks for your feedback! Enjoy 10% off your next stay.</p>
              </div>
            </div>
            <div className="se-code-box">
              <div className="se-code-display">
                <span>{discountCode}</span>
              </div>
              <button onClick={handleCopyCode} className="se-copy-btn">
                <img src={copyIcon} alt="Copy" />
                <span>Copy Code</span>
              </button>
            </div>
            <p className="se-usage-note">Use this code when making your next reservation</p>
          </div>
        </div>

        <div className="se-action-buttons">
          <button 
  className="se-btn se-btn-download"
  onClick={() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/invoice/${tripId}`);
  }}
>
  <img src={downloadIcon} alt="Download" />
  Download Invoice
</button>


          <button className="se-btn se-btn-refund">
            <img src={refundIcon} alt="Refund" />
            Refund Security Deposit
          </button>
        </div>

        <button onClick={() => navigate(-1)} className="se-return-link">
          Return to Stay Information
        </button>
      </main>
       <Footer />
    </div>
  );
};

export default StayExperience;