import React from "react";

const CommonCard = ({ title, children, className = "", loading = false }) => {
  return (
    <div
      className={`lg:col-span-2 w-50 bg-white p-4 rounded-lg shadow-lg ${className} 
        transform transition-transform duration-300 ease-in-out  hover:shadow-xl`}
    >
      <h2 className="text-xl font-semibold border-b text-gray-700 mb-4">
        {title}
      </h2>

      {loading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        children
      )}
    </div>
  );
};

export default CommonCard;
