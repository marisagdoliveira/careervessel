"use client"


import { useState } from "react";
import LoginForm from "./LoginForm";
import Slider from "./Slider";
import RegisterForm from "./RegisterForm";


export default function HomePage() {
    const [sliderPosition, setSliderPosition] = useState("right-10");
    const handleSlideLeft = () => {
        setSliderPosition("right-[57vw]");
    };

    const handleSlideRight = () => {
        setSliderPosition("right-10");
    };
    return (
        <main className="bg-zinc-800 overflow-hidden h-screen">
            <div className="flex justify-center items-center px-[10vw] gap-[40vw] h-screen">
                <LoginForm handlesSlide={handleSlideLeft} />
                <Slider sliderposition={sliderPosition} />
                <RegisterForm handlesSlide={handleSlideRight} />
            </div>
        </main>
    );
}


