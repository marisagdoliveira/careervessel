import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv4 = (props) => {
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
        <div className="w-[100px] h-[140px] bg-zinc-100 grid grid-cols-2 grid-rows-4 gap-1 p-1 rounded-md leading-tight" contentEditable="true">    
        <div className='col-span-2 p-1 rounded-lg rounded-md' style={{ backgroundColor: colors.color1}}>
            <div className='flex justify-between gap-2'>
        <div className="w-[100%%] h-[100%] rounded-full object-cover  flex justify-center items-center" style={{ backgroundColor: colors.color1}} contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[20%] h-[20%] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent  onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
            <div className='flex flex-col'>
            
            
            
        </div></div></div>
        <div className='row-span-2 bg-zinc-300 p-2 rounded-lg' >

            <div className='col-span-1 mt-20'>

            
            </div>
            </div>
        <div className='col-span-1  bg-zinc-300  p-2 rounded-lg'>

           
        </div>
       
       
        <div className='col-span-1  p-2 rounded-lg w-fit h-fit' style={{ backgroundColor: colors.color1}}>

            
        </div>
       
       
        <div className='row-span-2  p-2 rounded-lg ' style={{ backgroundColor: colors.color1}}>

            
        </div>
    </div>
);
};
  

export default Cv4




