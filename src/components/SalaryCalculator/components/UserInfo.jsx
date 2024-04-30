import React from 'react';

const UserInfo = ({ name, age }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};

export default UserInfo;