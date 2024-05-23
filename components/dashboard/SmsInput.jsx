import React, { useState } from 'react';

const SmsInput = ({ icon, value, setValue, placeholder, color, cssClass, onChangeListener, ...props }) => {

  // const [value, setValue] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); 
    let formattedValue = inputValue.replace(/(\d{1})(?=\d)/g, '$1 ');

    if (formattedValue.length > 0 && formattedValue[formattedValue.length - 1] === ' ') {
      formattedValue = formattedValue.slice(0, -1); 
    }

    setValue(formattedValue);
    // onChangeListener(formattedValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && value[value.length - 1] === ' ') {
      setValue(value.slice(0, -2)); 
    }
  };

  return (
    <div
      className={`flex w-full items-center space-x-2 rounded-md p-1 shadow-md  ${color ? color : "bg-secondary"
        }`}
    >
      {icon && icon}
      <input type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete='one-time-code'
        inputMode='numeric'
        className={`flex-1 min-w-0 outline-0 border-0 bg-transparent placeholder-gray-400 focus:ring-0
       ${icon ? "pl-2" : ""} ${cssClass}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default SmsInput;