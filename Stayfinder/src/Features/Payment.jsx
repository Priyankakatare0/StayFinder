import React, { useState } from 'react';
import { bookingAPI } from '../api';

const Payment = ({ onClose, bookingData, listingPrice, listingId }) => {
  const [currency, setCurrency] = useState('INR');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate total amount based on dates
  const calculateTotal = () => {
    if (bookingData.check_in && bookingData.check_out) {
      const checkInDate = new Date(bookingData.check_in);
      const checkOutDate = new Date(bookingData.check_out);
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return dayDifference > 0 ? dayDifference * (listingPrice || 0) : 0;
    }
    return 0;
  };

  const generateTransactionId = () => {
    return 'TXN_' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const paymentData = {
      user_id: localStorage.getItem('userId'),
      currency: currency,
      amount: calculateTotal(),
      status: 'success', // In real app, this would be set after actual payment processing
      transactionId: generateTransactionId(),
    };

    // Prepare complete request body with both payment and booking data
    const requestBody = {
      paymentData: paymentData,
      bookingData: {
        ...bookingData,
        user_id: localStorage.getItem('userId') // Ensure user_id is included
      }
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first to complete payment');
        return;
      }
      
      const res = await bookingAPI.createBookingWithPayment(
        listingId,
        paymentData,
        {
          ...bookingData,
          user_id: localStorage.getItem('userId')
        }
      );
      
      if (res.status === 200) {
        alert('🎉 Payment Successful! Booking Confirmed!');
        onClose();
      }
    } catch (err) {
      console.error("Payment error:", err);
      const errorMessage = err.response?.data?.message || 'Payment failed. Please try again.';
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 border-4 border-gray-100 rounded-2xl z-50 flex justify-center items-center">
      <div className="animate-popup bg-white p-10 rounded-xl shadow-2xl w-full max-w-2xl mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-black"
        >
          &times;
        </button>

        <form onSubmit={handlePaymentSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
          
          {/* Booking Summary - Same Grid Style */}
          <div className="mb-6 p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>Check-in: <span className="font-medium">{new Date(bookingData.check_in).toLocaleDateString()}</span></div>
              <div>Check-out: <span className="font-medium">{new Date(bookingData.check_out).toLocaleDateString()}</span></div>
              <div>Guests: <span className="font-medium">{bookingData.no_of_guest}</span></div>
              <div>Room: <span className="font-medium">{bookingData.room_type}</span></div>
            </div>
            <div className="text-xl font-semibold">
              Total: ₹{calculateTotal()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border rounded-md px-4 py-3"
              >
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cardholder Name</label>
              <input
                type="text"
                placeholder="Name on card"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full border rounded-md px-4 py-3"
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Card Details</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="col-span-2">
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border rounded-md px-4 py-3"
                maxLength="19"
                required
              />
            </div>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full border rounded-md px-4 py-3"
              maxLength="5"
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full border rounded-md px-4 py-3"
              maxLength="4"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition"
            >
              Cancel Payment
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;