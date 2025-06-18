import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Show_review = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchReviews = async () => {
    if (!id) return;

    try {
      const res = await axios.get(`http://localhost:3000/listing/${id}/reviews`);
      setReviews(res.data);
      setError(null);
    } catch (err) {
      console.error("Fetch error", err);
      setError("Invalid listing ID or reviews not found");
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  return (
    <div className="bg-white text-black py-2 px-6 md:px-6 max-w-7xl mx-auto">
      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {reviews.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-300 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300"
            >
              <p className="text-yellow-500 font-semibold text-xl mb-2">{"⭐".repeat(Math.round(review.rating))} </p>
              <p className="text-gray-800 text-base leading-relaxed">
                {review.comment || 'No comment provided.'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <p className="text-black italic text-center text-2xl mt-10">
            Be the first to leave a review for this listing.
          </p>
        )
      )}
    </div>
  );
};

export default Show_review;
