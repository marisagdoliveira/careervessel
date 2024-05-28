import React from "react";
import Vshape from "../../public/assets/bg-v-shape.svg";
import NavBar from "../components/NavBar";
const page = () => {
  return (
    <div className="relative">
      <div
        className="absolute bg-transparent pointer-events-none"
        style={{ width: "100vw", zIndex: 0 }}
      >
        <Vshape style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="w-screen h-[100vw] pb-[100px] bg-zinc-800 ">
        <NavBar />
      </div>
    </div>
  );
};

export default page;
