import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { id: listingId } = useParams();
  const userId = localStorage.getItem("user_id");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/review', {
        rating,
        comment,
        listing_id: listingId,
        user_id: userId,
      });

      if (res.data.message === 'Rating added successfully!') {
        navigate(`/listing/${listingId}`);
      }
    } catch (error) {
      console.error("Review submission failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Leave a Review</h1>

        <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">

          {/* Rating Stars */}
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <label key={starValue}>
                  <input
                    type="radio"
                    name="rating"
                    value={starValue}
                    onClick={() => setRating(starValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={30}
                    color={starValue <= (hover || rating) ? "#f59e0b" : "#e5e7eb"}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-pointer transition"
                  />
                </label>
              );
            })}
          </div>

          {/* Comment Box */}
          <div>
            <label className="block mb-2 font-semibold">Your Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
