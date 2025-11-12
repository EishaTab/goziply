// layouts/MainCategoryLayout.jsx
import React from "react";
import Link from "next/link";

const MainCategoryLayout = ({ service }) => {
  if (!service) return null;

  return (
    <section className="flex flex-col md:flex-row px-4 md:px-8 py-12 gap-8">
      
      {/* LEFT SIDE - Sub Services Column */}
      <div className="flex-1 flex flex-col gap-6">
        {service.subServices?.length > 0 &&
          service.subServices.map((sub, index) => (
            <Link key={index} href={sub.href}>
              <div className="flex flex-col md:flex-row w-full h-44 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white">
                
                {/* LEFT - Image */}
                <div className="w-full md:w-1/3 h-44 md:h-auto">
                  <img
                    src={sub.banner || "/default-banner.webp"}
                    alt={sub.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* RIGHT - Text + Button */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h2 className="text-xl font-bold mb-1 text-gray-800">{sub.name}</h2>
                  <p className="text-sm md:text-sm text-gray-600 mb-3">
                    Explore {sub.name.toLowerCase()} services
                  </p>
               <Link href={`/services/book?service=${service.slug}`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Book Now
        </button>
      </Link>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* RIGHT SIDE - Vertical Customer Reviews Bar */}
      <div className="w-64 bg-gray-50 rounded-xl p-6 flex flex-col gap-6 sticky top-20 h-fit shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Customer Reviews</h3>
        {/* Example Reviews */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-800 text-sm">
            "Excellent service! Highly recommended."
          </p>
          <span className="text-gray-500 text-xs mt-2 block font-semibold">- Jane D.</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-800 text-sm">
            "Very professional and timely."
          </p>
          <span className="text-gray-500 text-xs mt-2 block font-semibold">- Mark S.</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-800 text-sm">
            "Loved how easy it was to book!"
          </p>
          <span className="text-gray-500 text-xs mt-2 block font-semibold">- Sara P.</span>
        </div>
      </div>
    </section>
  );
};

export default MainCategoryLayout;
