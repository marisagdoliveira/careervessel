"use client";

import Add from "../../public/assets/add_button.svg";
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
import { HiOutlineTrash } from "react-icons/hi2";
import Edit from "../../public/assets/edit.svg";
import Cv1 from "../components/MiniCVs/Cv1";
import Cv2 from "../components/MiniCVs/Cv2";
import Cv3 from "../components/MiniCVs/Cv3";
import Cv4 from "../components/MiniCVs/Cv4";
import Cv5 from "../components/MiniCVs/Cv5";
import Cv6 from "../components/MiniCVs/Cv6";
import Cv7 from "../components/MiniCVs/Cv7";
import Cv8 from "../components/MiniCVs/Cv8";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const router = useRouter();
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


  const handleDelete = async (key) => {
    setLoading(true);
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: objectUser._id,
          key,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete library item");
      }




      // Re-fetch user data to update the library state
      const updatedResponse = await fetch(`/api/user?userId=${objectUser._id}`);
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated user data");
      }
      const updatedUserData = await updatedResponse.json();
      setLibrary(updatedUserData.user.library || []);
    } catch (error) {
      console.error("Error deleting library item:", error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = async (key) => {
    setLoading(true);
    try {
      // Send PATCH request to toggle the "open" property
      console.log(objectUser._id + "joooooooooooooooorge" + key)
      const response = await fetch('/api/open_cv', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: objectUser._id,
          key
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit library item");
      }

      // Redirect to the /generator page
      router.push("/generator")
    } catch (error) {
      console.error("Error editing library item:", error.message);
    } finally {
      setLoading(false);
    }
  };



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
            <div className="bg-white rounded-lg py-5 px-10 flex gap-5 w-[600px] h-[190px] overflow-x-auto overflow-y-hidden">
              {
                library.map((a, key) => {
                  return (

                    <div key={key} className="relative w-[100px] h-[140px] shadow-purple flex-shrink-0 shadow-lg rounded-md">
                      {a.layout === "Cv1" && <Cv1 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      {a.layout === "Cv2" && <Cv2 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      {a.layout === "Cv3" && <Cv3 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      {a.layout === "Cv4" && <Cv4 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      {a.layout === "Cv5" && <Cv5 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      {a.layout === "Cv6" && <Cv6 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      {a.layout === "Cv7" && <Cv7 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      {a.layout === "Cv8" && <Cv8 user={objectUser} colors={a.colors} className="absolute w-[100px] h-[140px] rounded-md"/>}
                      <div className="absolute w-[100%] h-[100%] top-0  opacity-0 rounded-md  hover:bg-zinc-600/30 hover:opacity-100">
                        <div className="flex flex-col items-center justify-center gap-2 h-[100%]">
                          <button onClick={() => handleEdit(key)} className="border-2 border-white text-white hover:bg-white hover:text-zinc-600 rounded-md px-2 py-1 text-sm"><Edit/></button>
                          <button onClick={() => handleDelete(key)} className="border-2 border-white text-white hover:bg-white hover:text-zinc-600 rounded-md px-2 py-1 text-sm"><HiOutlineTrash /></button>
                        </div>

                      </div>
                    </div>
                  )
                })
              }
              <div className="flex flex-col gap-1 my-5 items-center justify-center rounded-lg bg-white py-1 px-3">
                <Link href="/generator">
                  <Add className="size-6" />
                </Link>
              </div>
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