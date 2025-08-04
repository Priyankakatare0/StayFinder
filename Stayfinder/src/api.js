import axios from 'axios';

// Base URL configuration
const BASE_URL = 'https://stayfinder-1-84yg.onrender.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  signup: (userData) => api.post('/signup', userData),
  getUserHash: () => api.get('/get-user-hash'),
};

// Listing APIs
export const listingAPI = {
  getAllListings: () => api.get('/'),
  getListingById: (id) => api.get(`/listing/${id}`),
  addListing: (listingData) => api.post('/add_listing', listingData),
  updateListing: (id, listingData) => api.put(`/listing/${id}`, listingData),
  deleteListing: (id, userId) => api.delete(`/listing/${id}?userId=${userId}`),
};

// Booking APIs
export const bookingAPI = {
  // Note: Direct booking is disabled, use payment endpoint instead
  createBookingWithPayment: (listingId, paymentData, bookingData) => 
    api.post(`/listing/${listingId}/payment`, { paymentData, bookingData }),
};

// Review APIs
export const reviewAPI = {
  addReview: (reviewData) => api.post('/review', reviewData),
  getReviewsByListing: (listingId) => api.get(`/listing/${listingId}/reviews`),
};

// Export the axios instance for custom requests
export default api;

// Export base URL for any components that might need it
export { BASE_URL };
