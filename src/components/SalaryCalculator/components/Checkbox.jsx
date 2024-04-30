import React from 'react';

const Checkbox = ({ label, onChange }) => {
  return (
    <div className='py-1'>
      <label className='flex gap-2'>
        <input type="checkbox" className='checkbox checkbox-secondary' onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;