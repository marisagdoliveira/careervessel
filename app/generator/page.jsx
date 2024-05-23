'use client'

import React, { useState } from 'react'
import Cv1 from '../components/CVs/Cv1';

const page = () => {
    const [inputValue, setInputValue] = useState("");
    const [colors, setColors] = useState({color1: "#dddddd", color2: "#444444"});

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", inputValue);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className='flex justify-center items-center h-screen gap-20'>
    <div className=''>
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your input"
      />
      <button type="submit">Submit</button>
    </form>
    </div>
    <div>
        <Cv1 colors={colors}/>
    </div>
    </div>
  )
}

export default page