import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv1 = (props) => {
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
    <div className={`w-[100px] h-[140px] bg-zinc-200 flex rounded-md leading-tight`}>


        <div className='w-[30%] h-[100%] flex flex-col gap-[5px] items-center rounded-md' style={{backgroundColor: colors.color1}}>
            <div className="w-[20px] h-[20px] rounded-full flex justify-center items-center rounded-md" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[20px] h-[20px] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent  onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
            <h1 className='text-white p-1 w-full  font-semibold text-center' style={{backgroundColor: colors.color2}}></h1>

            <h1 className='text-white p-1 w-full  font-semibold text-center' style={{backgroundColor: colors.color2}}></h1>

            <h1 className='text-white p-1 w-full  font-semibold text-center' style={{backgroundColor: colors.color2}}></h1>

        </div>


        <div className='mt-10 ml-5 mr-5 w-[480px]'>
            <div style={{color: colors.color2}} className='flex flex-col gap-[10px]'>
            <h1 className='text-white p-2 mt-[2%px] w-full text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}></h1>
  
            <h1 className='text-white p-2 mt-[4%px] w-full text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}></h1>
    
            <h1 className='text-white p-2 mt-[-5%] w-full text-lg font-semibold text-right' style={{backgroundColor: colors.color2}}></h1>

            </div>

        </div>


    </div>
  )
}

export default Cv1

const Contact = ({userprop}) => {
    const user1 = userprop
    return (
      <div className="flex flex-col w-[100%]">
        
  
      </div>
    );                                                                                                        
}

