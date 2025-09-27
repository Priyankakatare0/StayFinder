import React, { useEffect, useState } from 'react';
import { listingAPI } from '../api';
import ListingList from './ListingList';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 items initially (2 rows of 3)

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

  // Reset visible count when search query changes
  useEffect(() => {
    setVisibleCount(6);
  }, [query]);

  // Filter listings based on query
  const filteredListings = listings.filter((listing) =>
    listing.title?.toLowerCase().includes(query.toLowerCase()) ||
    listing.location?.toLowerCase().includes(query.toLowerCase()) ||
    String(listing.price).includes(query)
  );

  // Get currently visible listings
  const visibleListings = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListings.length;

  // Handle view more button click
  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredListings.length));
  };

  // Handle view less button click
  const handleViewLess = () => {
    setVisibleCount(6); // Reset to initial count
  };

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
      <div className="max-w-7.5xl ml-4 mr-3 mx-auto">
        <ListingList listings={visibleListings} />
        
        {/* View More/Less Buttons */}
        <div className="flex justify-center gap-4 mt-12 mb-8">
          {hasMore && (
            <button
              onClick={handleViewMore}
              className="hover:bg-gray-100 text-black border font-semibold py-3 px-20 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-106"
            >
              View More Hotels
            </button>
          )}
          
          {visibleCount > 6 && (
            <button
              onClick={handleViewLess}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-20 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Less Hotels
            </button>
          )}
        </div>

        {/* Results Info */}
        <div className="text-center mt-8 text-gray-600">
       
        </div>
      </div>
    </div>
  );
};

export default Listings;
