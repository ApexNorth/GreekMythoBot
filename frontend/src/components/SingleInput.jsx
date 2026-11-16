import {useState} from 'react';

function SingleInput({placeholder, value, onChange}){

  return (
  <div>
    <input
      id="user-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    </div>
  )
}

export default SingleInput;
