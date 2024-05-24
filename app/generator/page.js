"use client";

import React, { useState, useEffect } from "react";
import Cv1 from "../components/CVs/Cv1";
import { getSession } from "next-auth/react";

const page = () => {
  const [description, setdescription] = useState("");
  const [colors, setColors] = useState({
    color1: "#dddddd",
    color2: "#444444",
  });
  const [objectUser, setObjectUser] = useState(userModel);
  const [objectGPT, setObjectGPT] = useState(objectModel);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await fetch("api/generator", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responsed = JSON.parse(await response.json());
        setObjectGPT(responsed);
        console.log("API Response:", responsed); // Debug log
      } else {
        console.error("Error fetching data"); // Debug error
      }
    } catch (error) {
      console.error("Error:", error); // Debug error
    }
    setLoading(false);
  };



  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if (!session) {
          throw new Error("Unauthorized");
        }
        const userId = session.user.id;
        
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log(userData.user)
        setObjectUser(userData.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); 
  

  
  return (
    <div className="w-screen h-screen bg-zinc-800">
      <div className="w-[100%] h-[40px] box-gradient flex justify-center items-center"></div>
      <div className="flex justify-center mt-[40px]  gap-20">
        <div className="">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor={"story"}
              className={"text-lg font-bold text-zinc-500"}
            >
              Write your story here:
            </label>
            <textarea
              rows={10}
              onChange={(e) => setdescription(e.target.value)}
              value={description}
              id={"story"}
              placeholder={"Tell us about yourself"}
              className={
                "w-full p-5 mt-3 border-2 border-purple-500 rounded-md outline-0"
              }
            />
            <div className={"text-right "}>
              <button
                className={
                  "inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm rounded-md text-white bg-purple-500 hover:bg-purple disabled:bg-purple-200 transition ease-in-out duration-150 disabled:cursor-not-allowed"
                }
                type={"submit"}
                disabled={loading}
              >
                {loading ? "Aguenta os cavalos..." : "Generate"}
              </button>
            </div>
          </form>
        </div>
        <div>
          <Cv1 user={objectUser} object={objectGPT} colors={colors} />
        </div>
      </div>
    </div>
    );
    };
    
    export default page;

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
  tasks: [
   
  ],
};

const userModel = {
  name: "John Doe",
  email: "j8vZi@example.com",
  phone: "123-456-7890",
  location: "Anytown, USA",
  linkedin: "linkedin.com/in/johndoe",
  imgsrc: "/assets/cv1.png",
};
