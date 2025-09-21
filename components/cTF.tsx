// CustomTextField.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';

type CTFCProps = {
    label?:string;
    onChange?:(text:string)=>void;
    hintColor?:string;
    textColor?:string;
    backgroundColor?:string;
    borderColor?:string;
    val?:string;

}


const CustomTextFieldComponent = ({ val,label, onChange,hintColor,backgroundColor,borderColor,textColor}:CTFCProps) => {
  const [value, setValue] = useState(val??"");

  const handleChange = (event:any) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div style={{ position: 'relative' }}>

     
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
            fontSize:'13px',
            backgroundColor:`${backgroundColor??"white"}`,
          border: `2px solid ${borderColor??'#fff'}`, // set border color
          borderRadius: '20px', // set border radius
          padding:'10px', // set padding
          color: textColor??'#333', // set text color
          width: '100%', // set width
          boxSizing: 'border-box', // include padding and border in width calculation
        }}
      />
      <label
        style={{
            fontSize:'13px',

          position: 'absolute',
          top: '13px', // adjust as needed
          left: '18px', // adjust as needed
          color: value ? 'transparent' : (hintColor??'#999'), // set color for hint text
          transition: '0.4s', // add transition for smooth effect
          pointerEvents: 'none', // make label not clickable
        }}
      >
        {label}
      </label>
    </div>
  );
};



export default CustomTextFieldComponent;
