import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv5 = (props) => {
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
        <div className='mt-2 ml-1 mr-1 w-[48%] rounded-md'>
            <div style={{color: colors.color2}} className='flex flex-col gap-1'>
            
            <h1 className='text-white p-1 mt-[2%] w-fit text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}> </h1>
            
            <h1 className='text-white p-1 mt-[4%] w-fit text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}> </h1>
            
            <h1 className='text-white p-1 mt-[-0.5%] w-fit text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}> </h1>
            
            </div>

        </div>

        <div className='w-[100%] h-[100%] p-1 flex flex-col gap-1 items-center rounded-md leading-tight' style={{backgroundColor: colors.color1}}>
        <div className="w-[100%] h-[100%] rounded-full bg-zinc-100 flex justify-center items-center" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[35%] h-[30%] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent  onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
            <h1 className='text-white p-1 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}> </h1>

            <h1 className='text-white p-1 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}> </h1>
            
            <h1 className='text-white p-1 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}> </h1>
            
        </div>


        


    </div>
);
};
  

export default Cv5


