import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Booking from '../Page/Booking';
import Show_review from './Show_review';
import Review from './Review';
import EditListing from './EditListing';

const ListingDetails = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Get current user ID from localStorage
  const currentUserId = localStorage.getItem('userId');
  
  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/listing/${id}`);
        setDetail(response.data);
      } catch {
        setError("Invalid Listing ID or Data Not Found");
      }
    };
    fetchListingData();
  }, [id]);

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-16">
      {error && <p className='text-center text-red-500'>{error}</p>}
      {!detail && !error && <p className='text-center text-xl'>Loading...</p>}

      {detail && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{detail.title}</h2>

          {/* Images */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px] mb-8">
            <div className="col-span-2 row-span-2 rounded-xl overflow-hidden">
              <img src={detail.img} alt="Main Hotel" className="object-cover w-full h-full" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={detail.img2 || detail.img} alt="Room 1" className="object-cover w-full h-full" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={detail.img3 || detail.img} alt="Room 2" className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b text-gray-600 mb-6">
            {['Overview', 'Reviews', ...(detail.host === currentUserId ? ['Edit'] : []), 'Availability', 'Booking'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowBookingForm(false); // reset booking form on tab change
                }}
                className={`pb-2 text-xl border-b-2 ${activeTab === tab ? 'border-orange-500 text-black font-medium' : 'border-transparent hover:border-orange-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            <div>
              {activeTab === 'Overview' && (
                <>
                  <p className="text-gray-700 mb-6">{detail.description}</p>
                  <p className="text-lg mb-2">
                    <span className='font-medium text-gray-800'>📍 Location:</span> {detail.location}
                  </p>
                  <p className="text-lg mb-2">
                    <span className='font-medium text-gray-800'>💵 Price:</span> ₹{detail.price}
                  </p>
                </>
              )}

              {activeTab === 'Availability' && (
                <>
                  <h3 className="text-xl font-semibold mb-2">📅 Available Dates:</h3>
                  {detail.availability?.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700">
                      {detail.availability.map((slot, idx) => (
                        <li key={idx}>
                          {new Date(slot.startDate).toLocaleDateString()} to {new Date(slot.endDate).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-red-500">Not available currently</p>
                  )}
                </>
              )}

              {activeTab === 'Reviews' && (
                <>
                  <Show_review />
                  <div className="mt-10">
                    <Review />
                  </div>
                </>
              )}

              {activeTab === 'Edit' && (
                <EditListing
                  listing={detail}
                  onUpdate={(updated) => setDetail(updated)}
                  onDelete={() => window.location.href = '/'} // clean, works!
                />
              )}



              {activeTab === 'Booking' && (
                <>
                  {!showBookingForm ? (
                    <div className="bg-white border shadow-md rounded-xl p-4 max-w-md mb-6">
                      <div className="text-lg font-bold text-gray-900 mb-2">
                        ₹{detail.price} <span className="text-sm text-gray-500">/ night</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        Ready to book your stay?
                      </p>
                      <button
                        onClick={() => setShowBookingForm(true)}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md transition"
                      >
                        Book Now
                      </button>
                    </div>
                  ) : (
                    <Booking 
                      onClose={() => setShowBookingForm(false)} 
                      listingPrice={detail.price}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
