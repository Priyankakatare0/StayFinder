import React from 'react';
import { Link } from 'react-router-dom';

const ListingList = ({ listings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
      {listings.map((listing) => (
        <Link to={`/listing/${listing._id}`} key={listing._id}>
          <div className="border border-gray-700 rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
            <img
              src={listing.img || 'https://via.placeholder.com/400'}
              alt={listing.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2 ">
              <h3 className="text-2xl font-semibold text-white mb-1">{listing.title}</h3>
              <span className="text-xl text-white mb-1">📍 {listing.location}</span>
              <span className="text-xl text-white font-semibold ml-2">₹{listing.price} / night</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListingList;
