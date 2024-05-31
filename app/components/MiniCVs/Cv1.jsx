import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv1 = (props) => {
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
    <div className={`w-[794px] h-[1123px] bg-zinc-100 flex rounded-md leading-tight`} contentEditable="true">


        <div className='w-[300px] h-[100%] px-5 py-7 flex flex-col gap-7 items-center rounded-md' style={{backgroundColor: colors.color1}}>
            <div className="w-[170px] h-[170px] rounded-full flex justify-center items-center rounded-md" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[170px] h-[170px] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent  onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
            <h1 className='text-white p-2 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}>Contact</h1>
            <Contact userprop={user}/>
            <h1 className='text-white p-2 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}>Experience</h1>

            <h1 className='text-white p-2 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}>Skills</h1>

        </div>


        <div className='mt-10 ml-5 mr-5 w-[480px]'>
            <div style={{color: colors.color2}} className='flex flex-col gap-5'>
            <Name userprop={user} objectprop={object}/>
            <h1 className='text-white p-2 mt-[23px] w-full text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}>About me</h1>
     
            <h1 className='text-white p-2 mt-[40px] w-full text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}>Education</h1>
      
            <h1 className='text-white p-2 mt-[-5px] w-full text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}>Tasks</h1>
            
            </div>

        </div>


    </div>
  )
}

export default Cv1
