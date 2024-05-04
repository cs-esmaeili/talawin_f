import React from "react";

const Input = ({ icon, placeholder, bgColor, cssClass, ...props }) => {
  return (
    <div
      className={`flex w-full items-center space-x-2 rounded-md p-1 shadow-md  ${
        bgColor ? bgColor : "bg-secondary"
      }`}
    >
      {icon && icon}
      <input
        type="text"
        placeholder={placeholder}
        className={`flex-1 min-w-0 outline-0 border-0 bg-transparent placeholder-gray-400 focus:ring-0
         ${icon ? "pl-2" : ""} ${cssClass}` }
        {...props}
      />
    </div>
  );
};

export default Input;
