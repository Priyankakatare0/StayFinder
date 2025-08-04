import React, { useState } from 'react';
import Navbar from '../Page/Navabar';

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
<div className="bg-gradient-to-b from-gray-200 to-transparent min-h-[80vh] flex justify-center items-center p-5 rounded-xl">
      <div
        className="relative w-full max-w-8xl rounded-xl overflow-hidden border border-gray-300"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkAREZs4aKlVQvSrX2XxhRcsehtvlT_P4bQ&s')`,
        }}
      >
        {/* Background Image */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkAREZs4aKlVQvSrX2XxhRcsehtvlT_P4bQ&s"
          alt="Stayfinder"
          className="w-full h-[92vh] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 px-6 md:px-16 py-6 text-white">
          {/* Navbar */}
          <Navbar />

          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mt-14">
            {/* Left Stats */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Stay Quietly,<br /> With No Worries
              </h1>
              <p className="text-gray-300 mt-6 max-w-xl text-lg">
                Welcome to our hotel booking platform, where your travel experience becomes easier and more enjoyable. With our platform, you can discover the perfect accommodation for your stay worldwide.
              </p>
            </div>

            {/* Right Stats */}
            <div className="flex flex-col gap-6 mt-6 lg:mt-0">
              <div>
                <h2 className="text-4xl font-bold">12k+</h2>
                <p className="text-gray-300">Satisfied Visitors</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">4.5k+</h2>
                <p className="text-gray-300">Amazing TourGuide</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">2k+</h2>
                <p className="text-gray-300">Special Travel Trip</p>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="bg-white mt-10 p-8 rounded-xl shadow-md flex flex-wrap gap-8 items-end w-full max-w-5xl text-black">
            {/* Location */}
            <div className="flex flex-col flex-1 min-w-[150px]">
              <label htmlFor="location" className="font-bold text-gray-800 mb-1">Location</label>
              <input
                id="location"
                type="text"
                placeholder="Location"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col flex-1 min-w-[100px]">
              <label htmlFor="person" className="font-bold text-gray-800 mb-1">Price</label>
              <input
                id="price"
                type="number"
                placeholder="Price"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Check-in */}
            <div className="flex flex-col flex-1 min-w-[120px]">
              <label htmlFor="checkin" className="font-bold text-gray-800 mb-1">Check-in</label>
              <input
                id="checkin"
                type="date"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col flex-1 min-w-[120px]">
              <label htmlFor="checkout" className="font-bold text-gray-800 mb-1">Check-out</label>
              <input
                id="checkout"
                type="date"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 mt-6 w-full sm:w-auto"
            >
              Search
            </button>
          </div>

          {showPopup && (
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 text-2xl text-white px-4 py-2 rounded-md shadow-lg z-50">
              🏨 Listings coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
