"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import Link from "next/link";
import CVLogo from "../../public/assets/Logo.svg";
import React, { useState } from "react";
import Dropdown from "../../public/assets/dropdown.svg";
import { RiCloseCircleFill } from "react-icons/ri";
import UserPic from "./UserPic";



const NavBar = ({user}) => {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false)




  return (
    <div>
      <div className="flex justify-between items-center w-[100%] h-[3vw] p-4 box-gradient-nav ">
        <Link href="/dashboard">
          <CVLogo
            style={{ width: "100%", height: "5vw" }}
            className="ml-[20px] mt-16"
          />
        </Link>

        <div>
    {!dropdown && ( <Dropdown onClick={() => setDropdown(true)} className="mr-5  size-8 cursor-pointer"/>)}
         
    {dropdown && (
          <div className="absolute h-[220px] transition-all top-2 right-5 bg-zinc-950/90 text-white font-base text-sm px-5 py-5 rounded-lg z-10">
            <div className="flex flex-col items-center gap-2 justify-end">
            
            <div className="flex gap-2 w-[100%] items-center text-center py-1 px-5 rounded">

               <div className="w-[20px]">
        <UserPic user = {user} /></div>
        
               
      <span className="text-lg">{session?.user?.name}</span>
      <RiCloseCircleFill onClick={() => setDropdown(false)} className="text-slate-400 cursor-pointer mb-1"/>
            </div>

            <Link href="/dashboard" className="text-gradient w-[8vw] text-white py-[2px] px-5 rounded-lg text-center border-2 border-transparent hover:border-2 hover:border-indigo-500 hover:text-purple-400">Homepage</Link>
            <Link href="/profile" className="text-gradient w-[8vw] text-white py-[2px] px-5 rounded-lg text-center border-2 border-transparent hover:border-2 hover:border-indigo-500 hover:text-purple-400">Profile</Link>
            <Link href="/generator" className="text-gradient w-[8vw] text-white py-[2px] px-5 rounded-lg text-center border-2 border-transparent hover:border-2 hover:border-indigo-500 hover:text-purple-400">Generator</Link>
            <button
              onClick={() => signOut()}
              className=" py-[2px] px-5 w-[8vw] text-center rounded-lg cursor-pointer hover:border-2 hover:border-indigo-500 text-indigo-100 "
            >
              Log Out
            </button>
          </div></div>
        )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
