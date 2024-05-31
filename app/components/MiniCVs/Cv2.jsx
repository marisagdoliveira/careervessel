import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv2 = (props) => {
    const colors = props.colors
    const object = props.object
    const user = props.user

    const [userPic, setUserPic] = useState(user.img || null);
    useEffect(() => {
        // Update userPic state when user.img changes
        setUserPic(user.img || null);
    }, [user.img]);
    const handleUploadSuccess = (fileName) => {
        setUserPic(fileName);
    };
    
    return (
        <div style={{ background: `linear-gradient(to right, ${colors.color1}, ${colors.color2})` }} className={`w-[100px] h-[140px] bg-gradient-to-r flex justify-center items-center p-[2%] rounded-md leading-tight`} >
          <div className="bg-white shadow-lg rounded-lg w-[70%] h-[90%] p-[5%] flex flex-col gap-[8%] rounded-md">

            <div className="w-[100%] h-[100%] rounded-full bg-zinc-100 flex justify-center items-center" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[20%] h-[20%] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent  onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
              
      
    
            <div className="flex flex-col gap-[5%]">
              <Section title="" bgColor={colors.color2}>
              </Section>
              <Section title="" bgColor={colors.color2}>

              </Section>
              <Section title="" bgColor={colors.color2}>

              </Section>
              <Section title="" bgColor={colors.color2}>

              </Section>
            </div>
          </div>
        </div>
      );
    };
  

export default Cv2

const Section = ({ title, bgColor, children }) => (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-white p-1" style={{ backgroundColor: bgColor }}>{title}</h2>
      {children}
    </div>
  );
