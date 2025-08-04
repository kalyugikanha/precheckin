// src/pages/CheckinPage.jsx - FINAL VERSION WITH YOUR CHANGES

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast for notifications
import { tripsData } from '../data/mockTrips';
import Services from '../components/Services';
import './CheckinPage.css';
import sarah from '../assets/sarah.jpg';
import whatsappgreen from '../assets/whatsappgreen.png'
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- IMPORT YOUR NEW IMAGES HERE ---
import conciergeAvatar from '../assets/sarah.jpg';



function CheckinPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [guests, setGuests] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    const currentTrip = tripsData.find(t => t.id === parseInt(tripId));
    if (currentTrip) {
      setTrip(currentTrip);
      setGuests(currentTrip.guestList);
    }
  }, [tripId]);

  useEffect(() => {
    const checkedInCount = guests.filter(g => g.checkedIn).length;
    const totalGuests = guests.length;
    const newProgress = totalGuests > 0 ? (checkedInCount / totalGuests) * 100 : 0;
    setProgress(newProgress);
  }, [guests]);

  const handleCheckin = (guestId) => {
    setGuests(currentGuests =>
      currentGuests.map(guest =>
        guest.id === guestId ? { ...guest, checkedIn: true } : guest
      )
    );
    toast.success('Guest checked in successfully!');
  };

  const handleShareLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(err => {
      toast.error('Could not copy link.');
      console.error('Copy failed', err);
    });
  };

const handleCopyMapUrl = () => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.address)}`;
  navigator.clipboard.writeText(mapUrl).then(() => {
    toast.success('Map location link copied!');
  }).catch(err => {
    toast.error('Could not copy location link.');
    console.error('Map copy failed', err);
  });
};



  // --- NEW WHATSAPP HANDLER ---
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "918767519675"; // The number from your image
    window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener,noreferrer');
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="checkin-page-wrapper">
      <Header />
      <div className="checkin-page-layout">
        {/* --- Left Panel (Checkin Status Panel) --- */}
        <div className="checkin-status-panel">
          <h2>Pre Check-In</h2>
          <p className="description">Welcome to your upcoming stay! Please complete the check-in process for all guests before arrival.</p>
          
          <h3>Guest Check-in Status</h3>
          <div className="status-container">
            <div className="progress-circle-container">
              <svg className="progress-ring" viewBox="0 0 120 120">
                <circle className="progress-ring-bg" r="54" cx="60" cy="60"/>
                <circle className="progress-ring-fg" r="54" cx="60" cy="60"
                  style={{ strokeDasharray: 339.29, strokeDashoffset: 339.29 - (progress / 100) * 339.29 }} />
              </svg>
              <div className="progress-text-outside">
                <p>Remaining: {100 - Math.round(progress)}%</p>
                <p>Checked In: {Math.round(progress)}%</p>
              </div>
            </div>
            <div className="legend">
              <p><span className="dot checked-in"></span> Checked In</p>
              <p><span className="dot not-checked-in"></span> Not Checked In</p>
            </div>
          </div>

          <h3>Guest List</h3>
          <ul className="guest-list">
            {guests.map((guest, index) => (
              <li key={guest.id}>
                <div className="guest-info">
                  <input type="checkbox" checked={guest.checkedIn} readOnly/>
                  <label>Guest {index + 1}: {guest.name}</label>
                </div>
                <div className="guest-actions">
                  {guest.checkedIn ? (
                    <>
                      <div className="status-tag checked">✔ checked-in</div>
                      <button className="edit-view-btn" onClick={() => navigate(`/checkin/${trip.id}/guest/${guest.id}`)}>Edit/View</button>
                    </>
                  ) : (
                    <button
                      className="checkin-btn"
                      onClick={() => {
                        navigate(`/checkin/${trip.id}/guest/${guest.id}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Check In
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="actions">
            <button className="share-btn" onClick={handleShareLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                Share Form Link
            </button>
            <button className="save-btn-dark" onClick={() => navigate('/my-trips')}>Save & Continue</button>
          </div>
        </div>
       
        {/* --- Right Panel (Property Details Panel) --- */}
        <div className="property-details-panel">
          <img src={trip.image} alt={trip.title} className="property-image" />
          <div className="property-info-box">
            <h2>{trip.title}</h2>
            <div className="info-grid">
              <div className="info-list">
                <div className="info-item"><svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><span>Check-in: {trip.checkIn}</span></div>
                <div className="info-item"><svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><span>Check-out: {trip.checkOut}</span></div>
                <div className="info-item"><svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span>{trip.guests} Guests</span></div>
                <div className="info-item"><svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg><span>{trip.nights} Nights</span></div>
              </div>
            </div>
            <h3>Property Information</h3>
            <div className="address-container">
              <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <p className="address-text">{trip.address}</p>
              <svg className="share-icon" onClick={handleCopyMapUrl} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            </div>
            <div className="map-container">
          <div className="map-container">
  <iframe
    title="property-location"
    width="100%"
    height="100%"
    loading="lazy"
    allowFullScreen
    src={`https://www.google.com/maps/embed/v1/place?key=AlzaSyB61FrvCfD6wFPYN7Q0959cbKXIlkgeGFs&q=${encodeURIComponent(trip.address)}`}
    style={{ border: 0 }}
  ></iframe>
</div>
 </div> 
            <Services />

            {/* --- NEW WHATSAPP CONTACT BUTTON --- */}
            <div className="contact-host-section">
              <h3> Contact Concierge </h3>
              <div className="whatsapp-contact-card" onClick={handleWhatsAppRedirect} role="button" tabIndex="0">
                <div className="whatsapp-info">
                  <img src={conciergeAvatar} alt="Host Avatar" className="whatsapp-avatar" />
                  <span className="whatsapp-number">+91 887675 19675</span>
                </div>
                <img src={whatsappgreen} alt="WhatsApp" className="whatsapp-icon" />
              </div>
            </div>
            {/* ----------------------------------- */}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckinPage;
