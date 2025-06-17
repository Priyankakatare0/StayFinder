import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-600 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_2fr] gap-5">
        {/* Left Sections */}
        <div>
          <h3 className="font-semibold mb-4">Page</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>Home</li>
            <li>Search</li>
            <li>Blog</li>
            <li>About Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Features</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>Find Hotels</li>
            <li>Book Hotels</li>
            <li>Reviews</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Cookies</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>Data Collect</li>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Laws</li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="bg-gray-700 border border-gray-500 text-white rounded-xl p-8 relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-bold text-2xl leading-snug">
                Don't Wanna<br />Miss Our Offers?
              </h2>
              <p className="text-sm text-gray-300 mt-2">Your email@mail.com</p>
            </div>
            <p className="text-sm text-gray-200 max-w-[180px] text-right">
              You guys better subscribe to our daily news letter!
            </p>
          </div>

          <hr className="mb-4 border-gray-600" />

          <button className="bg-black text-white px-5 py-2 rounded-full text-sm">
            Subscribe
          </button>

          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/90 overflow-hidden">
            {/* Icon or image here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
