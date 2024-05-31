import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv6 = (props) => {
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
        <div className={`w-[100px] h-[140px] bg-zinc-100 flex rounded-md leading-tight`} contentEditable="true">
        <div className='mt-1 ml-1 mr-1 w-[480px] rounded-md'>
          <div style={{color: colors.color2}} className='flex flex-col gap-1 ' >
          <h1 className='text-white p-2 mt-[23%] w-full font-semibold text-left rounded-lg' style={{backgroundColor: colors.color2}}></h1>
          <h1 className='text-white p-2 mt-[40%] w-full font-semibold text-left rounded-lg' style={{backgroundColor: colors.color2}}></h1>
          <h1 className='text-white p-2 mt-[-5%] w-full font-semibold text-left rounded-lg' style={{backgroundColor: colors.color2}}></h1>
          </div>

      </div>


      <div className='w-[100%] h-[100%] flex flex-col gap-2 items-center rounded-md leading-tight' style={{backgroundColor: colors.color1}}>
      <div className="w-[100%] mt-2 h-[fit] rounded-full bg-zinc-100 flex justify-center items-center" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[20px] h-[20px] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent  onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
          <h1 className='text-white p-1 w-full font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}></h1>

          <h1 className='text-white p-1 w-full  font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}></h1>
          <h1 className='text-white p-1 w-full  font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}></h1>
      </div>


    


  </div>
);
};
  

export default Cv6

