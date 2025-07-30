import React, { useState } from 'react';
import axios from 'axios';
import Payment from '../Features/Payment';

const Booking = ({ onClose, listingPrice }) => {
  const [check_in, setCheck_in] = useState('');
  const [check_out, setCheck_out] = useState('');
  const [no_of_guest, setNo_of_guest] = useState(1);
  const [room_type, setRoom_type] = useState('Deluxe');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [email, setEmail] = useState('');
  
  // Payment states
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  
  const id = window.location.pathname.split('/').pop(); // fallback to get ID

  // Calculate total amount based on dates
  const calculateTotal = () => {
    if (check_in && check_out) {
      const checkInDate = new Date(check_in);
      const checkOutDate = new Date(check_out);
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return dayDifference > 0 ? dayDifference * (listingPrice || 0) : 0;
    }
    return 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const currentBookingData = {
      check_in,
      check_out,
      no_of_guest,
      room_type,
      first_name,
      last_name,
      phone_no,
      email,
      user_id: localStorage.getItem('userId'),
    };

    // No API call here - just proceed to payment
    // Payment component will handle both payment and booking creation
    setBookingData(currentBookingData);
    setShowPayment(true);
  };

  // If payment should be shown, render the Payment component
  if (showPayment && bookingData) {
    return (
      <Payment 
        onClose={onClose}
        bookingData={bookingData}
        listingPrice={listingPrice}
        listingId={id}
      />
    );
  }

  return (
    <div className="fixed inset-0 border-4 border-gray-100 rounded-2xl z-50 flex justify-center items-center">
      <div className="animate-popup bg-white p-10 rounded-xl shadow-2xl w-full max-w-2xl mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-black"
        >
          &times;
        </button>

        <form onSubmit={handleBookingSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Check-in</label>
              <input
                type="date"
                value={check_in}
                onChange={(e) => setCheck_in(e.target.value)}
                className="w-full border rounded-md px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check-out</label>
              <input
                type="date"
                value={check_out}
                onChange={(e) => setCheck_out(e.target.value)}
                className="w-full border rounded-md px-4 py-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">No. of Guests</label>
              <select
                value={no_of_guest}
                onChange={(e) => setNo_of_guest(e.target.value)}
                className="w-full border rounded-md px-4 py-3"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Room Type</label>
              <select
                value={room_type}
                onChange={(e) => setRoom_type(e.target.value)}
                className="w-full border rounded-md px-4 py-3"
              >
                <option value="Deluxe">Deluxe</option>
                <option value="Standard">Standard</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Your first name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              className="w-full border rounded-md px-4 py-3"
              required
            />
            <input
              type="text"
              placeholder="Your last name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              className="w-full border rounded-md px-4 py-3"
              required
            />
            <input
              type="text"
              placeholder="Your Phone number"
              value={phone_no}
              onChange={(e) => setPhone_no(e.target.value)}
              className="w-full border rounded-md px-4 py-3"
              required
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-4 py-3"
              required
            />
          </div>

          {/* Price Summary - Using Same Styling */}
          {check_in && check_out && (
            <div className="mb-6 p-4 border rounded-md">
              <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
              <div className="flex justify-between text-sm mb-1">
                <span>Price per night:</span>
                <span>₹{listingPrice || 0}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Number of nights:</span>
                <span>{Math.ceil((new Date(check_out) - new Date(check_in)) / (1000 * 3600 * 24))}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
