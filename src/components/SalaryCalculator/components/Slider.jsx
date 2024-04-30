import React from 'react';

const Slider = ({ value, onChange }) => {
  return (
    <div className='py-4 w-3/4'>
      <input className="range range-secondary" type="range" min="0" max="1000000" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
    </div>
  );
};

export default Slider;