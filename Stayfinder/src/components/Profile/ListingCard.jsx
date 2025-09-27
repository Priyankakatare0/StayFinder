import React from "react";
import { MapPin, Star, Eye, Edit, MoreHorizontal } from "lucide-react";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer rounded-xl">
      {/* Image */}
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium border ${
            listing.status === "active"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          {listing.status}
        </span>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow">
            <span className="text-lg font-bold text-gray-800">
              ₹{listing.price}
              <span className="text-sm font-normal text-gray-600">/night</span>
            </span>
          </div>
        </div>

        {/* Actions Menu (3 dots) */}
        <button className="absolute top-3 left-3 bg-white/90 border border-white/50 text-gray-700 hover:bg-white hover:text-orange-600 p-1 rounded-md shadow-sm">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
            {listing.title}
          </h3>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm font-medium line-clamp-1">
              {listing.location}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-800">
                {listing.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({listing.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
