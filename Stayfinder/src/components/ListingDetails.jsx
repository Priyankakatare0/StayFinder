import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ListingDetails = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    const fetchListingData = async () => {
        if (!id) return;

        try {
            const response = await axios.get(`http://localhost:3000/listing/${id}`);
            setDetail(response.data);
            setError(null);
        } catch {
            setError("Invalid Listing ID or Data Not Found");
            setDetail(null);
        }
    };

    useEffect(() => {
        fetchListingData();
    }, [id]);

    return (
        <div className='min-h-screen bg-gray-900 text-white py-20 px-4'>
            {error && <p className='text-center text-red-500'>{error}</p>}
            {!detail && !error && <p className='text-center text-xl'>Loading...</p>}

            {detail && (
                <div className='max-w-6xl mx-auto'>
                    <div className='bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden'>
                        {/* Image */}
                        <div className='md:w-1/3 p-6 flex justify-center items-center'>
                            <img
                                src={detail.img}
                                alt={detail.title}
                                className='rounded-lg h-[420px] object-cover'
                            />
                        </div>

                        {/* Info */}
                        <div className='md:w-2/3 p-6 flex flex-col justify-center'>
                            <h2 className='text-4xl font-bold mb-4'>{detail.title}</h2>
                            <p className='text-gray-300 mb-4'>{detail.description}</p>

                            <p className='text-lg mb-2'>
                                <span className='text-yellow-500 font-semibold'>📍 Location:</span> {detail.location}
                            </p>
                            <p className='text-lg mb-4'>
                                <span className='text-yellow-500 font-semibold'>💰 Price:</span> ₹{detail.price} / night
                            </p>

                            {/* Calendar Info (Predefined Availability) */}
                            <div>
                                <h3 className='text-2xl font-semibold text-white mb-2'>📅 Available Dates:</h3>
                                {detail.availability?.length > 0 ? (
                                    <ul className='list-disc pl-6 text-gray-300'>
                                        {detail.availability.map((slot, idx) => (
                                            <li key={idx}>
                                                {new Date(slot.startDate).toLocaleDateString()} &nbsp;to&nbsp;
                                                {new Date(slot.endDate).toLocaleDateString()}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className='text-red-400'>Not available currently</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingDetails;
