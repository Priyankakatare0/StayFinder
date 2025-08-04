import React, { useEffect, useState } from 'react';
import { listingAPI } from '../api';
import ListingList from './ListingList';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingAPI.getAllListings();
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching hotels", error);
      }
    };

    fetchListing();
  }, []);

  // Filter listings based on query
  const filteredListings = listings.filter((listing) =>
    listing.title?.toLowerCase().includes(query.toLowerCase()) ||
    listing.location?.toLowerCase().includes(query.toLowerCase()) ||
    String(listing.price).includes(query)
  );

  return (
    <div className="bg-white text-black min-h-screen py-10 px-4 mt-15">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-6">
        {/* Left Heading */}
        <div className="text-left">
          <h1 className="text-5xl ml-0 font-extrabold text-black leading-tight mb-10">
            Explore Our Best List<br />5–Stars Hotel!
          </h1>
        </div>

        {/* Right Paragraph + Search */}
        <div className="text-center md:text-left max-w-md">
          <p className="text-gray-600 mr-20 mb-4">
            We understand that every traveler has different preferences. That’s why our platform’s good.
          </p>

          <div className="flex items-center border border-gray-400 rounded-full mr-15 mb-8 px-4 py-2 shadow-sm w-full max-w-md">
            <input
              type="text"
              placeholder="Find hotel"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow outline-none bg-transparent text-lg text-black placeholder-gray-500"
            />
            <button className="ml-2 text-xl">🔍</button>
          </div>
        </div>
      </div>

      {/* Listing Grid */}
      <div className="max-w-7.5xl ml-4 mr-3  mx-auto">
        <ListingList listings={filteredListings} />
      </div>
    </div>
  );
};

export default Listings;
