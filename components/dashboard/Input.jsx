import React from "react";

const Input = ({ icon, placeholder, divCssClass, inputCssClass, titleCssClass, title, ...props }) => {
  return (
    <div
      className={`flex w-full items-center space-x-2 rounded-md p-1 shadow-md border-2 border-accent border-opacity-50 rtl  ${divCssClass ? divCssClass : "bg-secondary"
        }`}
    >
      {icon && icon}
      {title &&
        <span className={`rtl ${titleCssClass}`}>{title}</span>
      }
      <input
        type="text"
        placeholder={placeholder}
        className={`flex-1 min-w-0 outline-0 border-0 bg-transparent placeholder-gray-400 focus:ring-0
         ${icon ? "pr-2" : ""} ${inputCssClass}`}
        {...props}
      />
    </div>
  );
};

export default Input;
