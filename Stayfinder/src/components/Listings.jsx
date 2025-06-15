import React, { useEffect, useState } from 'react'
// import HotelList from './ListingList';
import axios from 'axios';
import Navbar from '../Page/Navabar';
import ListingList from './ListingList';

const Listings = () => {
  const [listings, setListings] = useState([]);

  const fetchListing = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      setListings(response.data);
    }
    catch (error) {
      console.error("Error fetching hotels", error);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <>
    <Navbar />
      <div className="bg-black text-white min-h-screen py-10 px-4">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-black-700 drop-shadow-lg">
           🏨 Trending Hotels
        </h1>
        <div className="max-w-7xl mx-auto">
          <ListingList listings={listings} />
        </div>
      </div>
    </>
  )
}

export default Listings