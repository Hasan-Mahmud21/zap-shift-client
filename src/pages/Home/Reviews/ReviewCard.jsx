// import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;
  return (
    
      <div className="max-w-md  bg-base-100 shadow-xl rounded-xl p-6 border border-base-300">
        {/* Quote Icon */}
        <div className="text-primary text-3xl mb-3">
          <FaQuoteLeft />
        </div>

        {/* Quote Text */}
        <p className="text-base leading-relaxed mb-6">
          {testimonial}
        </p>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 mb-4" />

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-16 rounded-full bg-primary"
            src={user_photoURL}
            alt=""
          />
          <div>
            <h3 className="font-semibold text-lg">{userName}</h3>
            <p className="text-sm text-gray-500">Senior Product Designer</p>
          </div>
        </div>
      </div>
   
  );
};

export default ReviewCard;
