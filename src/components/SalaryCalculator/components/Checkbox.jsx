import React from 'react';

const Checkbox = ({ label, onChange }) => {
  return (
    <div>
      <label>
        <input type="checkbox" className='checkbox checkbox-secondary' onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;