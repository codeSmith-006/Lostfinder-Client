import React from "react";

const TestimonialCard = ({ testimonial }) => {
return (
  <div className="border mx-2 md:mx-5 bg-transparent backdrop-blur-md border-gray-600 shadow-lg rounded-2xl p-5 space-y-4 transition-transform hover:scale-[1.02] relative min-h-[280px] sm:min-h-[300px] flex flex-col justify-between">
    {/* User Info */}
    <div className="flex items-center gap-4">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full border-2 border-teal-400"
      />
      <div>
        <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
        <p className="text-sm text-gray-300">
          Recovered: {testimonial.item}
        </p>
      </div>
    </div>

    {/* Quote */}
    <p className="text-gray-200 italic pl-1 border-l-4 border-teal-500">
      “{testimonial.quote}”
    </p>

    {/* Date */}
    <div className="text-sm text-gray-300 flex items-center gap-2">
      <i className="fas fa-calendar-check text-teal-300"></i>
      <span>Recovered on: {testimonial.date}</span>
    </div>
  </div>
);

};

export default TestimonialCard;
