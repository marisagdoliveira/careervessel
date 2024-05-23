"use client"

import Shape from "../../public/assets/mancha.svg";
import React from "react";
import RotatingIcons from "./RotatingIcons";
import '../../app/globals.css';


export default function Slider({sliderposition}){

    return (
      <div className={`absolute transition-all ${sliderposition} w-[40vw] h-[100vh] bg-[#D2CDD1]`}>
        <img src="/assets/hand-background.png" className="z-0 absolute w-full h-screen object-cover"/>
        <Shape className="absolute w-full h-full object-cover"/>
        <img src="/assets/hand.png" className="absolute w-full  h-screen object-cover"/>
        <h1 className="absolute text-[2vw] text-white left-[5vw] top-[2vw] font-bold">Welcome Aboard</h1>
        <h1 className="absolute text-[3.5vw] text-white left-[10vw] top-[4vw] font-bold">Your Future</h1>
        <RotatingIcons />
        <h2 className="absolute text-[1.5vw] text-right text-white right-[3vw] top-[14vw] font-bold w-[10vw]">Generate your Resume with AI</h2>
        <h2 className="absolute text-[1vw] text-right text-white right-[9vw] top-[48vw] font-bold">Excited to sail with you...</h2>
      </div>
    );
  }