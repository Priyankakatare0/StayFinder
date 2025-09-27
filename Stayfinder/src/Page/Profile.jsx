import React, { useState, useEffect } from "react";
import { User, MapPin, Calendar, Star, Edit, Home, CreditCard, Shield, TrendingUp, X } from "lucide-react";
import { useParams } from 'react-router-dom';
import { profileAPI } from '../api';
import BookingCard from '../components/Profile/BookingCard';
import ListingCard from '../components/Profile/ListingCard';
import StatsCard from '../components/Profile/StatsCard';
import { ProfileEditDialog } from '../components/Profile/ProfileEditDialog';
import Navbar from './Navabar';

export const Profile = () => {
    const { id: profileUserId } = useParams(); // Get user ID from URL
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [tab, setTab] = useState("bookings");
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if current user is viewing their own profile
    const currentUserId = localStorage.getItem('userId');
    const isOwnProfile = currentUserId === profileUserId;

    // Fetch user profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to view profile');
                setLoading(false);
                return;
            }

            if (!profileUserId) {
                setError('User ID not found');
                setLoading(false);
                return;
            }

            console.log('Fetching profile for user ID:', profileUserId);
            console.log('Current user ID from localStorage:', localStorage.getItem('userId'));

            try {
                const response = await profileAPI.getProfile(profileUserId);
                const { user, listing, booking } = response.data;

                setUser({
                    ...user,
                    userType: listing?.length > 0 ? "host" : "guest",
                    location: user.location || "Location not set",
                    verified: true,
                    joinDate: user.createdAt,
                    stats: {
                        totalBookings: booking?.length || 0,
                        totalListings: listing?.length || 0,
                        rating: 4.9, // Calculate from actual reviews in future
                        totalEarnings: listing?.reduce((sum, l) => sum + (l.price * 10), 0) || 0 // Rough estimate
                    }
                });

                setListings(listing || []);
                setBookings(booking || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [profileUserId]);

    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser);
        setEditOpen(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-900 text-xl mb-4">{error}</p>
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Hero */}
                <div className="relative bg-gradient-to-r from-black to-gray-600 pb-1 px-4">
                    <Navbar />

                    <div className="flex flex-col lg:flex-row items-start gap-18 mt-16 mb-8 max-w-7xl mx-auto">
                        {/* Avatar & Info */}
                        <div className="flex items-start gap-8">
                            <div className="relative">
                                <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-white shadow-lg bg-orange-100 flex items-center justify-center">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl font-bold text-orange-600">
                                            {user.username?.charAt(0)?.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold text-white">{user.username}</h1>
                                <p className="text-gray-400">{user.email}</p>
                                {user.verified && (
                                    <span className="inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        <Shield size={14} /> Verified {user.userType === "host" ? "Host" : "Guest"}
                                    </span>
                                )}
                                <div className="flex flex-wrap gap-3 mt-2 text-sm text-black">
                                    <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full shadow">
                                        <User size={14} className="text-orange-600" /> {user.userType === "host" ? "Host" : "Guest"}
                                    </div>

                                    <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full shadow">
                                        <Calendar size={14} className="text-orange-600" /> Joined {new Date(user.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Edit Button - Only show for own profile */}
                        {isOwnProfile && (
                            <div className="lg:ml-auto mt-4 lg:mt-0">
                                <button
                                    onClick={() => setEditOpen(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-orange-500 font-bold border-2 border-gray-200 rounded shadow hover:bg-gray-600 hover:transition-all "
                                >
                                    <Edit size={20} /> Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="max-w-7xl mx-auto px-4 -mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        icon={<CreditCard className="w-5 h-5" />}
                        title="Total Bookings"
                        value={user.stats.totalBookings}
                        subtitle="Completed trips"
                    />
                    {user.userType === "host" && (
                        <>
                            <StatsCard
                                icon={<Home className="w-5 h-5" />}
                                title="Active Listings"
                                value={user.stats.totalListings}
                                subtitle="Properties hosted"
                            />
                            <StatsCard
                                icon={<Star className="w-5 h-5" />}
                                title="Host Rating"
                                value={user.stats.rating}
                                subtitle="Average rating"
                            />
                            <StatsCard
                                icon={<TrendingUp className="w-5 h-5" />}
                                title="Total Earnings"
                                value={`₹${user.stats.totalEarnings.toLocaleString()}`}
                                subtitle="This year"
                            />
                        </>
                    )}
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-4 mt-8">
                    <div className="flex border-b border-gray-300 mb-4">
                        <button
                            onClick={() => setTab("bookings")}
                            className={`px-4 py-2 text-lg font-semibold ${tab === "bookings" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"}`}
                        >
                            {isOwnProfile ? "My Bookings" : "Bookings"}
                        </button>
                        {user.userType === "host" && (
                            <button
                                onClick={() => setTab("listings")}
                                className={`px-4 py-2 text-lg font-semibold ${tab === "listings" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"}`}
                            >
                                {isOwnProfile ? "My Listings" : "Listings"}
                            </button>
                        )}
                    </div>

                    {/* Tab Content */}
                    {tab === "bookings" && (
                        <div className="space-y-6">
                            {bookings.length > 0 ? (
                                bookings.map((booking) => {
                                    // Calculate total amount based on check-in/check-out duration
                                    const checkInDate = new Date(booking.check_in);
                                    const checkOutDate = new Date(booking.check_out);
                                    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
                                    const estimatedAmount = nights * 150; // Estimated $150/night

                                    return (
                                        <BookingCard
                                            key={booking._id}
                                            booking={{
                                                id: booking._id,
                                                propertyName: `${booking.room_type} Room Booking`,
                                                location: "StayFinder Property",
                                                checkIn: booking.check_in,
                                                checkOut: booking.check_out,
                                                guests: booking.no_of_guest,
                                                status: new Date(booking.check_out) < new Date() ? "completed" : "upcoming",
                                                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
                                                totalAmount: estimatedAmount
                                            }}
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-xl">No bookings yet</p>
                                    <p className="text-sm mt-2">Start exploring properties to make your first booking!</p>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                                    >
                                        Explore Properties
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {tab === "listings" && user.userType === "host" && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.length > 0 ? (
                                listings.map((listing) => (
                                    <ListingCard
                                        key={listing._id}
                                        listing={{
                                            id: listing._id,
                                            title: listing.title,
                                            location: listing.location,
                                            price: listing.price,
                                            rating: 4.8, // Calculate from reviews in future
                                            reviews: 0, // Count from reviews in future
                                            image: listing.img,
                                            status: "active" // Determine based on availability
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-xl">No listings yet</p>
                                    <p className="text-sm mt-2">Start hosting by creating your first listing!</p>
                                    <button
                                        onClick={() => window.location.href = '/add_listing'}
                                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                                    >
                                        Create Listing
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Edit Dialog */}
                <ProfileEditDialog
                    user={user}
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onSave={handleUserUpdate}
                />
            </div>
        </>
    );
};

export default Profile;
