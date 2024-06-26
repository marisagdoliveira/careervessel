"use client";

import { TiArrowSortedDown } from "react-icons/ti";
import { RiCloseCircleFill } from "react-icons/ri";
import Download from "../../public/assets/download.svg";
import Edit from "../../public/assets/edit.svg";
import Vshape from "../../public/assets/bg-v-shape.svg";
import Add from "../../public/assets/add_button.svg";
import React, { useState, useEffect, useRef } from "react";
import Cv1 from "../components/CVs/Cv1";
import Cv2 from "../components/CVs/Cv2";
import Cv3 from "../components/CVs/Cv3";
import Cv4 from "../components/CVs/Cv4";
import Cv5 from "../components/CVs/Cv5";
import Cv6 from "../components/CVs/Cv6";
import Cv7 from "../components/CVs/Cv7";
import Cv8 from "../components/CVs/Cv8";
import { getSession } from "next-auth/react";
import "../../app/globals.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import NavBar from "../components/NavBar";
import Chatbot from "../components/Chatbot";
import Link from "next/link";
import LinkedinSearch from "../components/Linkedin";
import UndoRedo from "../components/UndoRedo";
import FooterBar from "../components/FooterBar";

const page = () => {
  const printRef = useRef();
  const [description, setdescription] = useState("");
  const [colorsMenu, setColorsMenu] = useState(false);
  const [colors, setColors] = useState({
    color1: "#7568CD",
    color2: "#4b2e83",
  });
  const [selectedCv, setSelectedCv] = useState("Cv1");
  const [loading, setLoading] = React.useState(false);
  const [objectUser, setObjectUser] = useState(userModel);
  const [objectGPT, setObjectGPT] = useState(objectModel);

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
        console.log("API Response:", responsed);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
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
        const url = `/api/user?userId=${userId}`;
        console.log(url);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log(userData.user);
        setObjectUser(userData.user);

        


        let key;
        console.log("JIIIIIIIIIIIIRGE" + userData.user.library[0].open)
      // for (let i = 0; i < userData.user.library.length-1; i++) {
      //   if (userData.user.library[i].open === true) {
      //     key = i
      //   }
      // }
      key = userData.user.library.findIndex(e => e.open)
      console.log("jiiiiiiiiir" + key + userData.user.library.length)
      if (key >= userData.user.library.length) {
        console.log("No open items found in the library.");
        return;
      }
  
      const response1 = await fetch("/api/close_cv", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.user._id,
        }),
      });
      
      if (!response1.ok) {
        throw new Error("Failed to edit library item");
        
      }
      
      if (response1.ok) {
        const newUserData = await response1.json();
          setSelectedCv(newUserData.user.library[key].layout);
          setObjectGPT(newUserData.user.library[key].objectgpt);
          setColors(newUserData.user.library[key].colors);
      }
      console.log("JIIIIIIIIIIIIRGE" + newUserData.user.library[6].open) // Corrected variable name
      // Update objectGPT and colors directly
     
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveToLibrary = async () => {
    const object = {
      layout: selectedCv,
      colors: colors,
      objectgpt: objectGPT,
      open: false,
    };

    try {
      const session = await getSession();
      if (!session) {
        throw new Error("Unauthorized");
      }
      const userId = session.user.id;
      let response = await fetch("api/user_library", {
        method: "PATCH",
        body: JSON.stringify({ userId, object }),
        headers: {
          "Content-Type": "application/json",
        },
      });



      if (response.ok) {
        const responsed = await response.json();
        console.log("API Response:", responsed);
      } else {
        console.error("Failed to save to library:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSavePdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(data);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const width = imgWidth * ratio;
    const height = imgHeight * ratio;

    pdf.addImage(data, "PNG", 0, 0, width, height);
    pdf.save("download.pdf");
  };

  return (
    <div className="relative bg-zinc-900 h-[100vw] transition-all duration-75">
      <div
        className="absolute bg-transparent pointer-events-none "
        style={{ width: "100vw", zIndex: 0, top: "-220px" }}
      >
        <Vshape style={{ width: "100%", height: "100%" }} />
      </div>
      <div
        className="w-screen h-[100vw] pb-[100px]  bg-zinc-900 "
        style={{ zIndex: 1 }}
      >
        <NavBar user={objectUser} />
        <div className="absolute top-[4vw] right-[13vw] text-sm text-left">
          {objectGPT.keywords[0].length > 0 && (
            <div className="flex flex-col  gap-4 text-white  font-semibold">
              <p>Start applying now!</p>
              <LinkedinSearch
                objectGPT={objectGPT}
                className="transition-all duration-200"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center mt-[100px] text-left gap-4 overflow-x-hidden">
          <div className="flex flex-col items-center ">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor={"story"}
                className={"text-lg font-bold text-white text-left"}
              >
                Share your story with us:
              </label>
              <div className="gradient-box-animated p-1 rounded-md focus:border-2 mt-5 mb-5 focus:border-purple-500">
                <textarea
                  rows={10}
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  id={"story"}
                  placeholder={
                    "For a more detailed and accurate CV, don't forget to specify your: \n\n  - Experience (where you've been, your roles and when you did it);\n  - Education (what you studied, your degree, your school and when you did it); \n  - Objective (what you're looking for). \n\nIf there's something you want to add or change when the CV's generated, you can edit the information to your liking."
                  }
                  className={
                    "w-[27vw] h-[20vw] text-sm bg-zinc-950 text-white p-5   rounded-md outline-0"
                  }
                />
                <style jsx>{`
                  #story::placeholder {
                    color: rgba(
                      150,
                      150,
                      150,
                      0.7
                    ); /* Zinc color with opacity */
                  }
                `}</style>
              </div>
              <div className="text-center">
                <button
                  className={
                    " w-[250px] text-center px-6 py-1.5 font-semibold leading-6 text-lg rounded-md text-white gradient-box-animated hover:text-zinc-800 disabled:cursor-not-allowed transition-all"
                  }
                  type={"submit"}
                  disabled={loading}
                >
                  {loading ? "Please wait" : "Generate CV"}
                </button>
              </div>
            </form>
            <div className="flex flex-col items-end w-[100%] mt-10 gap-3">
              <div className="flex flex-col gap-1 my-5 items-center justify-center  rounded-lg hover:bg-purple-600/10 transition-all duration-75  bg-white py-1 px-3">
                <button onClick={handleSaveToLibrary} className="flex flex-col gap-1 items-center text-gradient font-semibold py-1">
                <p>Add to Library</p>
                  <Add className="size-6" />
                </button>
              </div>
              <div className="flex justify-center rounded-lg bg-white hover:bg-purple-600/10 transition-all duration-75 py-1 px-3 ">
                <button
                  onClick={handleSavePdf}
                  className=" text-gradient text-zinc-50 gap-2 flex justify-center items-center font-bold flex-row"
                >
                  <p>PDF</p>

                  <Download className="text-gradient" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-2">
            <div className="w-[794px] flex justify-between justify-center ">
              
              <Link
                href="/profile"
                className="flex items-center py-1 px-3 rounded-lg  transition-all duration-75 rounded-lg font-semibold text-zinc-50 hover:text-lg hover:pr-1 hover:pl-0 transition-all  mr-60 cursor-pointer "
              > <div className="relative w-[170px] mb-[24px]">
                  <p className="absolute left-0 top-0 text-gradient ">Edit contact details</p>
                  </div>
                <Edit/>
              </Link>
            </div>
            <div className="flex gap-3 mt-2">
              <div className="relative">
                <div className="absolute mb-[10px] right-0 top-[-40px]">
                  {!colorsMenu && (
                    <div className=" rounded-lg mb-2 flex items-center gap-2 w-fit p-1 bg-white text-gray-500  hover:bg-purple-600/10 transition-all duration-75">
                      <div
                        onClick={(e) => setColorsMenu(true)}
                        className="rounded-full cursor-pointer size-4"
                        style={{
                          background: `linear-gradient(to bottom right, ${colors.color1}, ${colors.color2})`,
                        }}
                      ></div>
                      <p
                        onClick={(e) => setColorsMenu(true)}
                        className="font-semibold text-gradient cursor-pointer text-lg"
                      >
                        Select Color
                      </p>
                      <TiArrowSortedDown
                        onClick={(e) => setColorsMenu(true)}
                        className=" cursor-pointer hover:text-white"
                      />
                    </div>
                  )}

                  {colorsMenu && (
                    <div className="w-[32vw] absolute right-0 rounded-lg p-1 pr-4 bg-purple-600/10">
                      <div className=" flex justify-end">
                        <RiCloseCircleFill
                          className="absolute right-2 top-3 text-slate-400 hover:text-white cursor-pointer mb-1"
                          onClick={(e) => setColorsMenu(false)}
                        />
                      </div>
                      <div className="flex flex-wrap w-[100%] gap-3">
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#7568CD", color2: "#4b2e83" })
                          }
                          className="rounded-full size-8    hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer "
                          style={{
                            background: `linear-gradient(to bottom right, #7568CD, #4b2e83)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#444444", color2: "#888888" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #444444, #888888)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#a6c6ea", color2: "#92a6db" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #a6c6ea, #92a6db)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#e6e6fa", color2: "#9eaaba" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #e6e6fa, #9eaaba)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#dddfff", color2: "#fdd3c3" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #dddfff, #fdd3c3)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#c6b5a6", color2: "#918479" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #c6b5a6, #918479)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#b27e7d", color2: "#edc8c4" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #b27e7d, #edc8c4)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#da635d", color2: "#4e4e56" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #da635d, #4e4e56)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#567356", color2: "#354531" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #567356, #354531)`,
                          }}
                        ></div>
                        <div
                          onClick={(e) =>
                            setColors({ color1: "#6e3838", color2: "#5b2a2a" })
                          }
                          className="rounded-full size-8 hover:border-2 border-black/50 hover:border-black/50 transition-colors duration-75 cursor-pointer"
                          style={{
                            background: `linear-gradient(to bottom right, #6e3838, #5b2a2a)`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="absolute right-[-156px] top-[0]">
                <UndoRedo />
              </div>
                </div>

                <div ref={printRef}>
                  {selectedCv === "Cv1" && (
                    <Cv1 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                  {selectedCv === "Cv2" && (
                    <Cv2 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                  {selectedCv === "Cv3" && (
                    <Cv3 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                  {selectedCv === "Cv4" && (
                    <Cv4 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                  {selectedCv === "Cv5" && (
                    <Cv5 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                  {selectedCv === "Cv6" && (
                    <Cv6 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                  {selectedCv === "Cv7" && (
                    <Cv7 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                  {selectedCv === "Cv8" && (
                    <Cv8 user={objectUser} object={objectGPT} colors={colors} />
                  )}
                </div>
              </div>
              <div className="bg-white flex flex-col items-center gap-10 p-5 rounded-md">
                <p className="text-gradient font-semibold text-4xl">Layout</p>
                <div className="flex flex-col gap-4 h-[800px] scrollbar overflow-auto overflow-x-hidden">
                  <img
                    src={`/assets/cvPics/Cv1.png`}
                    onClick={(e) => setSelectedCv("Cv1")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                  <img
                    src={`/assets/cvPics/Cv2.png`}
                    onClick={(e) => setSelectedCv("Cv2")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                  <img
                    src={`/assets/cvPics/Cv3.png`}
                    onClick={(e) => setSelectedCv("Cv3")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                  <img
                    src={`/assets/cvPics/Cv4.png`}
                    onClick={(e) => setSelectedCv("Cv4")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                  <img
                    src={`/assets/cvPics/Cv5.png`}
                    onClick={(e) => setSelectedCv("Cv5")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                  <img
                    src={`/assets/cvPics/Cv6.png`}
                    onClick={(e) => setSelectedCv("Cv6")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                  <img
                    src={`/assets/cvPics/Cv7.png`}
                    onClick={(e) => setSelectedCv("Cv7")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                  <img
                    src={`/assets/cvPics/Cv8.png`}
                    onClick={(e) => setSelectedCv("Cv8")}
                    alt="User Pic"
                    className="w-[120px] rounded-md border-2 border-transparent hover:border-3 hover:border-purple-600 rounded-sm object-cover shadow-md shadow-bl mr-5 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <Chatbot />
          </div>
        </div>
      </div>
      <div className="relative mt-[180px] h-2 bg-zinc-900">
<FooterBar/>
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
  tasks: [],
  keywords: ["", "", "", "", ""],
};

const userModel = {
  name: "John Doe",
  email: "j8vZi@example.com",
  phone: "123-456-7890",
  location: "Anytown, USA",
  linkedin: "linkedin.com/in/johndoe",
  imgsrc: "/assets/cv1.png",
};
