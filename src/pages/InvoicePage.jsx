import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InvoicePage.css';
import Header from '../components/Header'; // Already imported, great!
import Footer from '../components/Footer'; // Already imported, great!

// --- Import your assets ---
import emailIcon from '../assets/email-icon-dark.jpg';
import printIcon from '../assets/print-icon.jpg';
import downloadIcon from '../assets/download-icon.png';

// --- MOCK DATA ---
const mockInvoiceData = {
  invoiceNumber: 'INV-2025-001234',
  bookingId: 'STM-789456',
  issueDate: '6/6/2025',
  status: 'Paid',
  company: {
    name: 'Staymaster',
    tagline: 'Premium Vacation Rentals',
    address: '1234 Business Ave, Suite 100\nLos Angeles, CA 90210',
    contact: 'contact@staymaster.com\n+1 (800) 123-STAY'
  },
  billTo: {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567'
  },
  property: {
    name: 'Ocean View Villa',
    address: '123 Oceanfront Drive, Malibu, CA 90210',
    checkIn: 'May 30, 2025',
    checkOut: 'June 6, 2025',
    nights: 7,
    guests: 4
  },
  charges: {
    accommodation: 2100.00,
    cleaningFee: 150.00,
    serviceFee: 210.00,
    feedbackDiscount: -210.00,
    taxesAndFees: 188.70,
    securityDeposit: 500.00
  },
  payment: {
    method: '•••• •••• •••• 1234',
    transactionId: 'TXN-STM-789456',
    date: '6/6/2025',
    status: 'Completed'
  },
  securityDepositRefund: {
    status: 'Processing Refund',
    expected: '3-5 business days'
  }
};

const InvoicePage = ({ invoiceData = mockInvoiceData }) => {
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = invoiceData.charges.accommodation + invoiceData.charges.cleaningFee + invoiceData.charges.serviceFee;
  const totalAmount = subtotal + invoiceData.charges.feedbackDiscount + invoiceData.charges.taxesAndFees;
  const totalPaid = totalAmount + invoiceData.charges.securityDeposit;

  // Helper to format currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };
  
  const formatNegativeCurrency = (amount) => {
    return `-${formatCurrency(Math.abs(amount))}`;
  };

  return (
    // --- THIS IS THE FIX ---
    // Wrap everything in a React Fragment <>...</>
    <>
      <Header />

      <div className="invoice-page"> {/* This div is now the main content */}
        <div className="invoice-actions-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Feedback
          </button>
          <div className="action-buttons">
            <button className="action-btn">
              <img src={emailIcon} alt="Email" /> Email
            </button>
            <button className="action-btn">
              <img src={printIcon} alt="Print" /> Print
            </button>
            <button className="action-btn download-btn">
              <img src={downloadIcon} alt="Download" /> Download PDF
            </button>
          </div>
        </div>

        <div className="invoice-container">
          <header className="invoice-header">
            <div className="company-info">
              <div className="company-logo">S</div>
              <div>
                <h2>{invoiceData.company.name}</h2>
                <p>{invoiceData.company.tagline}</p>
                <div className="company-address">
              <p>{invoiceData.company.address.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
              <p>{invoiceData.company.contact.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
          </div>
              </div>
            </div>
            <div className="invoice-title-section">
              <h1>INVOICE</h1>
              <div className="invoice-meta">
                <span>Invoice #:</span><strong>{invoiceData.invoiceNumber}</strong>
                <span>Booking ID:</span><strong>{invoiceData.bookingId}</strong>
                <span>Issue Date:</span><strong>{invoiceData.issueDate}</strong>
              </div>
              <span className="status-pill paid">{invoiceData.status}</span>
               
            </div>
            
          </header>
         

          <hr className="divider" />

          <section className="invoice-details-section">
            <div className="detail-block">
              <h3>Bill To:</h3>
              <p>{invoiceData.billTo.name}</p>
              <p>{invoiceData.billTo.email}</p>
              <p>{invoiceData.billTo.phone}</p>
            </div>
            <div className="detail-block">
              <h3>Property Details:</h3>
              <p><strong>{invoiceData.property.name}</strong></p>
              <p>{invoiceData.property.address}</p>
              <div className="stay-details">
                <div><span>Check-in:</span>{invoiceData.property.checkIn}</div>
                <div><span>Check-out:</span>{invoiceData.property.checkOut}</div>
                <div><span>Nights:</span>{invoiceData.property.nights}</div>
                <div><span>Guests:</span>{invoiceData.property.guests}</div>
              </div>
            </div>
          </section>

          <section className="charges-breakdown">
            <h3>Charges Breakdown</h3>
            <div className="charge-item">
              <div>
                  <p>Accommodation ({invoiceData.property.nights} nights)</p>
                  <small>$300.00 per night</small>
              </div>
              <span>{formatCurrency(invoiceData.charges.accommodation)}</span>
            </div>
            <div className="charge-item"><p>Cleaning Fee</p><span>{formatCurrency(invoiceData.charges.cleaningFee)}</span></div>
            <div className="charge-item"><p>Service Fee</p><span>{formatCurrency(invoiceData.charges.serviceFee)}</span></div>
            <div className="subtotal-row"><p>Subtotal</p><strong>{formatCurrency(subtotal)}</strong></div>
            <div className="charge-item discount-item"><p>Feedback Discount (10%)</p><span>{formatNegativeCurrency(invoiceData.charges.feedbackDiscount)}</span></div>
            <div className="charge-item"><p>Taxes & Fees</p><span>{formatCurrency(invoiceData.charges.taxesAndFees)}</span></div>
            <div className="total-row"><p>Total Amount</p><strong>{formatCurrency(totalAmount)}</strong></div>
            <div className="charge-item"><p>Security Deposit (Refundable)</p><span>{formatCurrency(invoiceData.charges.securityDeposit)}</span></div>
            <div className="total-paid-row"><p>Total Paid</p><strong>{formatCurrency(totalPaid)}</strong></div>
          </section>
          
          <hr className="divider" />

          <section className="payment-details-section">
            <div className="detail-block">
                  <h3>Payment Information</h3>
                  <div className="info-grid">
                      <span>Payment Method:</span> <strong>{invoiceData.payment.method}</strong>
                      <span>Transaction ID:</span> <strong>{invoiceData.payment.transactionId}</strong>
                      <span>Payment Date:</span> <strong>{invoiceData.payment.date}</strong>
                      <span>Status:</span> <span className="status-pill completed">{invoiceData.payment.status}</span>
                  </div>
            </div>
            <div className="detail-block">
                  <h3>Security Deposit</h3>
                  <div className="info-grid">
                      <span>Amount Held:</span> <strong>{formatCurrency(invoiceData.charges.securityDeposit)}</strong>
                      <span>Status:</span> <span className="status-pill processing">{invoiceData.securityDepositRefund.status}</span>
                      <span>Expected Refund:</span> <strong>{invoiceData.securityDepositRefund.expected}</strong>
                  </div>
            </div>
          </section>

          <hr className="divider" />

          <section className="terms-conditions">
              <h3>Terms & Conditions</h3>
              <ul>
                  <li>Security deposit will be refunded within 3-5 business days after checkout, subject to property inspection.</li>
                  <li>Cancellation policy and terms as agreed upon at time of booking apply.</li>
                  <li>For questions regarding this invoice, please contact our support team.</li>
                  <li>This is an electronically generated invoice and does not require a physical signature.</li>
              </ul>
          </section>

          <footer className="invoice-footer">
              <p>Thank you for choosing Staymaster for your vacation rental needs!</p>
              <p>We hope you had a wonderful stay and look forward to hosting you again.</p>
          </footer>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InvoicePage;