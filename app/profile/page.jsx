"use client";

import Vshape from "../../public/assets/bg-v-shape.svg";
import NavBar from "../components/NavBar";
import Chatbot from "../components/Chatbot";
import UserPic from "../components/UserPic";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import FileUploadComponent from "../components/FileUploadComponent";
import UpdateUserForm from "../components/UpdateUser";
import FooterBar from "../components/FooterBar";
const page = () => {
  const [objectUser, setObjectUser] = useState(userModel);
  const [loading, setLoading] = React.useState(false);

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
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center w-full ">
          <div className="flex justify-center w-[60vw] h-[100vw] bg-gradient-to-t from-black to-transparent ">
            
            <div className="flex flex-col gap-2 items-center mt-2">
              
              <h1 className="text-2xl text-white font-semibold">{objectUser.name}</h1>
              
              <div className="w-32 h-32">
                
                <UserPic user={objectUser} />
              </div>
              
              <FileUploadComponent />
              <UpdateUserForm />

            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
};

export default page;

const userModel = {
  name: "John Doe",
  email: "j8vZi@example.com",
  phone: "123-456-7890",
  location: "Anytown, USA",
  linkedin: "linkedin.com/in/johndoe",
  imgsrc: "/assets/cv1.png",
};
