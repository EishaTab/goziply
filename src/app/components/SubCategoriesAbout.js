// layouts/SubServiceLayout.jsx
import React from "react";


const SubCategoriesAbout = ({ subService, parent }) => {
  if (!subService) return <p className="text-red-500">No sub-service data found</p>;

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center">
      {/* Left Side - Text */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        {parent && <p className="text-gray-500 mb-2">{parent.title}</p>}
        <h1 className="text-4xl font-bold mb-4">{subService.name}</h1>
        <p className="text-gray-700 mb-6">
          {subService.description || "Detailed information about this service."}
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 h-[80vh]">
        {subService.banner && (
          <img
            src={subService.banner}
            alt={subService.name}
            className="w-full h-full object-cover rounded-l-lg"
          />
        )}
      </div>
    </section>
  );
};

export default SubCategoriesAbout;
