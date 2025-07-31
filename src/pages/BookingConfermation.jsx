// src/pages/BookingConfermation.jsx - THE FINAL, PIXEL-PERFECT VERSION

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripsData } from '../data/mockTrips';
import './BookingConfermation.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertySummary from '../components/PropertySummary';
import Concierge from '../components/Concierge';
import PlacesToVisit from '../components/PlacesToVisit';
import ChatIcon from '../assets/chat.png';


function BookingConfermation() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const currentTrip = tripsData.find(t => t.id === parseInt(tripId));
    setTrip(currentTrip);
  }, [tripId]);

  if (!trip) return <div>Loading Experience...</div>;

  return (
    <div className="stay-experience-wrapper">
      <Header />
      <main className="stay-experience-main">
        
        {/* --- THIS IS THE NEW, CORRECTED TOP SECTION --- */}
        <div className="welcome-header">
            <div className="welcome-header-left">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <div>
                    <h1>Welcome To Your Stay</h1>
                    <p>Your check-in was successful! Enjoy your stay at {trip.title}.</p>
                </div>
            </div>
            
        </div>

        <div className="feedback-bar">
          <div className="feedback-bar-content">
            <span className="take-action-tag">★ Take Action</span>
            <h3>Complete Your Stay Experience</h3>
            <p>Feedback will be active 12 hours before checkout.</p>
          </div>
      <button className="feedback-btn" onClick={() => navigate(`/feedback/${trip.id}`)}>
  <span className="feedback-text">
    
    <img src={ChatIcon} alt="Chat Icon" width="20" height="20" />
    Give Feedback
  </span>
  <small className="feedback-offer">Get 10% off</small>
</button>


        </div>
        {/* ------------------------------------------- */}

        <div className="dashboard-layout">
          <div className="left-column">
            <Concierge />
            <PlacesToVisit places={trip.nearbyPlaces} />
          </div>
          <div className="right-column">
            <PropertySummary trip={trip} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BookingConfermation;