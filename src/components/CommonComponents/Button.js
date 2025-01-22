import React from "react";

const CommonRadioButton = ({ label, name, value, checked, onClick, className = "" }) => {
  return (
    <div className={`flex items-center ${className} cursor-pointer`}>
      <input
        type="radio"
        id={label}
        name={name}
        value={value}
        checked={checked}
        onClick={() => onClick(value)}  
        className="hidden"  
      />
      <label htmlFor={label} className="flex items-center cursor-pointer">
        <div
          className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
            checked ? "bg-blue-500" : "bg-white"
          }`}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-white"></div>}
        </div>
        {label}
      </label>
    </div>
  );
};

export default CommonRadioButton;
