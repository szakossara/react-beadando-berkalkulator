import React from 'react';

const NumberInput = ({ label, value, onC, calc }) => {
  return (
    <div className='flex space-x-4'>
      <label className='text-nowrap py-2'>{label}</label>
      <div className="flex input input-bordered input-secondary w-full max-w-xs">
        <input type="text" placeholder={value} onChange={(e) => {onC(parseInt(e.target.value));calc();console.log("alma"+parseInt(e.target.value) )}} />
      </div>
    </div>
  );
};

export default NumberInput;