import React from 'react';

const DateInput = ({ label, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="date" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default DateInput;