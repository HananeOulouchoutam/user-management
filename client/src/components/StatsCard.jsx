import React from "react";

const StatsCard = ({
  title,
  value,
  icon,
  description = "",
  color = "green", // new simple control
}) => {
  const colors = {
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      text: "text-green-600",
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      text: "text-indigo-600",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      text: "text-red-600",
    },
    gray: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-600",
    },
  };

  const c = colors[color] || colors.gray;

  return (
    <div className="rounded-xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-md transform hover:scale-105 transition-all">
      
      <div className="flex justify-between items-center">
        
        {/* Text */}
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>

          <p className="text-3xl font-bold mt-2 text-gray-900">
            {value.number}
          </p>

          {description && (
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          )}
        </div>

        {/* Icon */}
        <div className={`p-3 rounded-lg flex items-center justify-center ${c.bg} border ${c.border}`}>
          {React.cloneElement(icon, {
            size: 22,
            className: c.text,
          })}
        </div>

      </div>
    </div>
  );
};

export default StatsCard;