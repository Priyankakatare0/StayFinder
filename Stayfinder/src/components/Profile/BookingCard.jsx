import React from "react";
import { MapPin, Calendar, Users, Star } from "lucide-react";

const BookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row mb-6">
      {/* Image */}
      <div className="relative md:w-48 h-48 md:h-auto">
        <img
          src={booking.image}
          alt={booking.propertyName}
          className="w-full h-full object-cover"
        />
        <span
          className={`absolute top-3 right-3 px-2 py-1 text-sm font-medium rounded ${getStatusStyle(
            booking.status
          )}`}
        >
          {booking.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.propertyName}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{booking.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">₹{booking.totalAmount}</div>
            <div className="text-sm text-gray-500">total</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-orange-500" />
            <div className="text-sm">
              <div className="font-medium text-gray-700">Check-in</div>
              <div className="text-gray-600">{formatDate(booking.checkIn)}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-orange-500" />
            <div className="text-sm">
              <div className="font-medium text-gray-700">Check-out</div>
              <div className="text-gray-600">{formatDate(booking.checkOut)}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <Users className="w-4 h-4 text-orange-500" />
            <div className="text-sm">
              <div className="font-medium text-gray-700">Guests</div>
              <div className="text-gray-600">
                {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {booking.status === "completed" && (
            <button className="flex items-center gap-1 border border-orange-200 text-orange-600 px-3 py-1 rounded hover:bg-orange-50 text-sm">
              <Star className="w-4 h-4" /> Review
            </button>
          )}
          <button className="border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
