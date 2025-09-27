import React from "react";
import { CreditCard, Home, Star, TrendingUp } from "lucide-react";

const StatsCard = ({ icon, title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-4 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800 hover:text-orange-600 transition-colors">
            {value}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-700 text-md uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatsCard;
