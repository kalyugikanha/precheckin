import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { Toaster } from 'react-hot-toast';

// Import all of our pages
import Login from './pages/Login.jsx';
import OtpPage from './pages/OtpPage.jsx';
import UserDetailsPage from './pages/UserDetailsPage.jsx';
import MyTripsPage from './pages/MyTripsPage.jsx';
import CheckinPage from './pages/CheckinPage.jsx';
import GuestFormPage from './pages/GuestFormPage.jsx';
import DeclarationPage from './pages/DeclarationPage.jsx';
import BookingConfermation from './pages/BookingConfermation.jsx';
import FeedbackPage from './pages/FeedbackPage.jsx';
import StayExperience from './pages/StayExperience.jsx';
import InvoicePage from './pages/InvoicePage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/checkin/:tripId" element={<CheckinPage />} />
          <Route path="/checkin/:tripId/guest/:guestId" element={<GuestFormPage />} />
          <Route path="/checkin/:tripId/declaration" element={<DeclarationPage />} />
          <Route path="/booking-confermation/:tripId" element={<BookingConfermation />} /> 
          <Route path="/feedback/:tripId" element={<FeedbackPage />} />
          <Route path="/stay-experience/:tripId" element={<StayExperience />} />
          <Route path="/invoice/:tripId" element={<InvoicePage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);