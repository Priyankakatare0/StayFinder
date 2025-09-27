import React from "react";

const MostVisited = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 leading-relaxed">
          Our Most Amazing <br /> Visited Hotel in 2023!
        </h1>
        <p className="text-gray-600 text-md ">
          Take a look our best choice for the hotels of the year, we pick the hotels <br /> from our amazing visitors
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px]">
        {/* Main Hotel */}
        <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
          <img
            src="https://assets.architecturaldigest.in/photos/65b2aecf269da4a0ee6c9b40/master/w_1600%2Cc_limit/atr.royalmansion-bedroom2-mr.jpg"
            alt="Oasis Sands Resort Homestay"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">Oasis Sands Resort Homestay</h2>
            <p className="text-sm">Palm Jumeirah, Dubai • ★★★★☆ (218 Visitors)</p>
          </div>
        </div>

        {/* Top Right */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://media.architecturaldigest.com/photos/659d9fbfe6cba71cbe6077f6/16:9/w_2560%2Cc_limit/atr.royalmansion-bar-mr.jpg"
            alt="Blue Saroza Drogba Comfort Hotel"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">Blue Saroza Drogba Comfort Hotel</h2>
            <p className="text-sm">Surabaya, Indonesia • ★★★★☆ (104 Visitors)</p>
          </div>
        </div>

        {/* Bottom Right */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://www.agoda.com/wp-content/uploads/2024/05/the-puli-hotel-shanghai.jpg"
            alt="Luxury Comfort Stays Hotel"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">Luxury Comfort Stays Hotel</h2>
            <p className="text-sm">Malang, Indonesia • ★★★★☆ (102 Visitors)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostVisited;
