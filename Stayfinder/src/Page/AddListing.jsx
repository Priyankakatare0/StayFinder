import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddListing = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [availability, setAvailability] = useState('');
    const [endDate, setEndDate] = useState('');
    const [host, setHost] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const listingData = {
            title,
            location,
            price,
            img,
            description,
            availability: [
                {
                    startDate: availability,
                    endDate: endDate,
                },
            ],
            host: localStorage.getItem('userId'),
        };

        try {
            if (id) {
                const res = await axios.put(`http://localhost:3000/listing/${id}`, listingData);
                if (res.status === 200) navigate('/');
            } else {
                const res = await axios.post('http://localhost:3000/add_listing', listingData);
                if (res.status === 200) navigate('/');
            }
        } catch (err) {
            console.error("Error", err.message);
        }
    };

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/listing/${id}`)
                .then((res) => {
                    const data = res.data;
                    setTitle(data.title);
                    setLocation(data.location);
                    setPrice(data.price);
                    setImg(data.img);
                    setDescription(data.description);
                    setHost(data.host);
                    if (data.availability && data.availability.length > 0) {
                        setAvailability(data.availability[0].startDate?.slice(0, 10));
                        setEndDate(data.availability[0].endDate?.slice(0, 10));
                    }
                })
                .catch((err) => {
                    console.error("Fetch failed", err);
                });
        }
    }, [id]);

    return (
        <div className="relative min-h-screen bg-black">
            <img
                src="https://images.unsplash.com/photo-1711743266323-5badf42d4797?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <form
                    onSubmit={handleOnSubmit}
                    className="bg-black text-white bg-opacity-90 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
                >
                    <h2 className="text-2xl font-bold mb-6">
                        {id ? '✏️ Edit Listing' : '🏨 Add Listing'}
                    </h2>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-gray-900 border border-gray-600 px-4 py-2 rounded w-full mb-4 placeholder-gray-400 focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="bg-gray-900 border border-gray-600 px-4 py-2 rounded w-full mb-4 placeholder-gray-400 focus:outline-none"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="bg-gray-900 border border-gray-600 px-4 py-2 rounded w-full mb-4 placeholder-gray-400 focus:outline-none"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="bg-gray-900 border border-gray-600 px-4 py-2 rounded w-full mb-4 placeholder-gray-400 focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Image URL"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        className="bg-gray-900 border border-gray-600 px-4 py-2 rounded w-full mb-4 placeholder-gray-400 focus:outline-none"
                    />

                    {img && (
                        <img
                            src={img}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border mb-4"
                        />
                    )}

                    <input
                        type="date"
                        placeholder="Start Date"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        required
                        className="bg-gray-900 border border-gray-600 px-4 py-2 rounded w-full mb-4 placeholder-gray-400 focus:outline-none"
                    />

                    <input
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="bg-gray-900 border border-gray-600 px-4 py-2 rounded w-full mb-6 placeholder-gray-400 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-white text-black py-2 w-full rounded font-semibold hover:bg-gray-300 transition"
                    >
                        {id ? 'Update Listing' : 'Add Listing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddListing;
