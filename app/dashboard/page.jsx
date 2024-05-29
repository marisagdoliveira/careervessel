"use client";

import Link from "next/link";
import UserInfo from "../components/UserInfo";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Vshape from "../../public/assets/bg-v-shape.svg";
import Chatbot from "../components/Chatbot";
import { getSession } from "next-auth/react";
import UserPic from "../components/UserPic";
import Generate from "../../public/assets/generatebutton.svg"
import Gpt from "../../public/assets/gpticon.svg"
import Powered from "../../public/assets/poweredby.svg"
import Cv1 from "../components/CVs/Cv1";
import Cv2 from "../components/CVs/Cv2";
import Cv3 from "../components/CVs/Cv3";
import Cv4 from "../components/CVs/Cv4";
import Cv5 from "../components/CVs/Cv5";
import Cv6 from "../components/CVs/Cv6";
import Cv7 from "../components/CVs/Cv7";
import Cv8 from "../components/CVs/Cv8";

export default function Dashboard() {
  const [loading, setLoading] = React.useState(false);
  const [objectUser, setObjectUser] = useState("");
  const [objectGPT, setObjectGPT] = useState(objectModel);
  const [colors, setColors] = useState({
    color1: "#7568CD",
    color2: "#4b2e83",
  });
  const [selectedCv, setSelectedCv] = useState("Cv1");
  const [library, setLibrary] = useState(["", ""])
function mostracenas () {
    console.log("JOOOOOOOOOOOOOOOOORGE")
}

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if (!session) {
          throw new Error("Unauthorized");
        }
        const userId = session.user.id;
        const url = `/api/user?userId=${userId}`;
        console.log(url);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log(userData.user);
        setObjectUser(userData.user);
        setLibrary(userData.user.library || []);

      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="relative w-screen h-[100vw] bg-zinc-900 overflow-hidden ">
      <div
        className="absolute bg-transparent pointer-events-none "
        style={{ width: "100vw", zIndex: 0, top: "-220px" }}
      >
        <Vshape style={{ width: "100%", height: "100%" }} />
        <Chatbot />
      </div>
      <NavBar user={objectUser} />

      <div className="flex justify-between ">
        <div className="relative flex flex-col px-32 py-20">
          <div className="font-base text-5xl text-white">
            <p className="mb-3">
              Welcome back,
            </p>
            <p>
            {objectUser.name}
            </p>
          </div>
          <div className="absolute top-40 left-96">
            <div className=" flex-col justify-center text-center items-center">
              <div className="size-44 mb-10">
                <UserPic user={objectUser} />
              </div>
              <Link
                className="box-gradient rounded-lg px-6 py-2 text-white font-semibold "
                href="/profile"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        
        <div className="relative box-gradient font-bold text-white rounded-3xl text-6xl p-10 w-[38vw] h-[25vw] mt-20">
          
          <p>Generate</p>
          <p className="ml-40">your CV!</p>
          <Link href="/generator">
          <div className="absolute top-[60px] right-[55px]">
          <Generate />
          </div></Link>
          <div>

          </div>
          <Powered className="absolute bottom-[90px] size-14"/>
          <div className="absolute bottom-8 bg-gradient-to-t from-gray-500 via-white to-white w-fit rounded-lg p-1.5 ">
            
            <Gpt className="spinio"/>
            </div>
          <img src="/assets/illustration.png" className="absolute w-[27vw] right-[70px] bottom-0"></img>
        </div>
      </div>

      <div>
        <div className="ml-32 text-white font-base text-2xl ">
            <p onClick={mostracenas} className="mb-5">Your Library</p>
            <div className="bg-white rounded-lg p-5 flex gap-5 w-[600px] h-[180px] overflow-hidden">
                {
                    
                library.map((a, key) => {
                    return (
                    <div key={key} className="size-24  shadow-black">
                        <img img src={`/assets/cvPics/${a.layout}.png`} className="shadow-lg cursor-pointer"/>
                    </div>
                )})}
            </div>
        </div>
      </div>
    </div>
  );
}

const userModel = {
  name: "John Doe",
  email: "j8vZi@example.com",
  phone: "123-456-7890",
  location: "Anytown, USA",
  linkedin: "linkedin.com/in/johndoe",
  imgsrc: "/assets/cv1.png",
};


const objectModel = {
    objective: "",
    experience: [
      {
        role: "",
        company: "",
        date: "",
      },
      {
        role: "",
        company: "",
        date: "",
      },
      {
        role: "",
        company: "",
        date: "",
      },
    ],
    skills: ["", "", "", "", "", ""],
    education: [
      {
        course: "",
        school: "",
        date: "",
      },
      {
        course: "",
        school: "",
        date: "",
      },
      {
        course: "",
        school: "",
        date: "",
      },
    ],
    tasks: [],
    keywords: ["", "", "", "", ""],
  };