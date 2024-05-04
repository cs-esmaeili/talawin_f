import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="shadow w-full bg-primary rounded-xl">
      <div
        className="bg-green-400 text-xs leading-none py-1 text-center text-black rounded-xl"
        style={{ width: `${progress}%` }}
      >
        {`${progress}%`}
      </div>
    </div>
  );
};

export default ProgressBar;