"use client"

import Shape from "../../public/assets/mancha.svg";
import React from "react";
import RotatingIcons from "./RotatingIcons";
import '../../app/globals.css';


export default function Slider({sliderposition}){

    return (
      <div className={`absolute transition-all ${sliderposition} w-[800px] h-screen bg-[#D2CDD1]`}>
        <img src="/assets/hand-background.png" className="z-0 absolute w-full h-screen object-cover"/>
        <Shape className="absolute w-full h-full object-cover"/>
        <img src="/assets/hand.png" className="absolute w-full  h-screen object-cover"/>
        <h1 className="absolute text-4xl text-white left-28 top-10 font-bold">Welcome Aboard</h1>
        <h1 className="absolute text-6xl text-white left-60 top-24 font-bold">Your Future</h1>
        <RotatingIcons />
        <h2 className="absolute text-3xl text-right text-white right-20 top-80 font-bold w-[210px]">Generate your new Resume with AI</h2>
        <h2 className="absolute text-2xl text-right text-white right-32 top-[820px] font-bold">Excited to sail with you...</h2>
      </div>
    );
  }