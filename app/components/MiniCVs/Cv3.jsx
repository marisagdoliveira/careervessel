import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv3 = (props) => {
    const colors = props.colors
    
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
    <div className="w-[100px] h-[140px] bg-gray-100 flex justify-center items-center p-[2%] rounded-md leading-tight" >
    <div className="bg-white shadow-lg rounded-lg w-[75%] h-[100%] p-[2%] flex flex-col gap-[8%]">

      <div className="w-[100%] h-[60%] rounded-full bg-zinc-100 flex justify-center items-center" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[20%] h-[20%] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>

        


            <div className="flex flex-col gap-[5%] h-[5px]" style={{ backgroundColor: `${colors.color1}` }}></div>
            <div className="flex flex-col gap-[5%] h-[5px]" style={{ backgroundColor: `${colors.color1}` }}></div>
            <div className="flex flex-col gap-[5%] h-[5px]" style={{ backgroundColor: `${colors.color1}` }}></div>
      
        
        
        <div className="flex flex-row gap-[5%]">
              <div className="flex-1">
                
              </div>
              <div className="flex-1">
                
              </div>
              </div>
      
    </div>
  </div>
);
};
  

export default Cv3




