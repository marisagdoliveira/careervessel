import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv4 = (props) => {
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
        <div className="w-[794px] h-[1123px] bg-zinc-100 grid grid-cols-2 grid-rows-4 gap-5 p-5">    
        <div className='col-span-2 bg-zinc-400 p-5 rounded-lg'>
            <div className='flex justify-between gap-10'>
        <div className="w-[170px] h-[170px] rounded-full object-cover bg-zinc-100 flex justify-center items-center">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[170px] h-[170px] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
            <div className='flex flex-col'>
            <Name userprop={user} objectprop={object}/>
            
            <Bio object={object}/>
        </div></div></div>
        <div className='row-span-3 bg-zinc-300 p-5 rounded-lg'>
        <h1 className='text-white p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Contact</h1>
            <Contact userprop={user}/>
            <div className='col-span-1 '>
            <h1 className='text-white p-2 mt-[20px] mb-[10px] p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Skills</h1>
            <Skills object={object}/>
            </div>
            <div className='col-span-1 bg-zinc-300 p-5 rounded-lg'>
            
        
        </div>
        <h1 className='text-white p-2 mt-[5px]  p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Education</h1>
            <Education object={object}/>
        </div>
       
       
        <div className='col-span-1 bg-zinc-300 p-5 rounded-lg '>
        <h1 className='text-white p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Experience</h1>
            <Experience object={object}/>
        </div>
       
       
        <div className='col-span-1 bg-zinc-300 p-5 rounded-lg h-[400px]'>
        <h1 className='text-white    p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Tasks</h1>
            <Tasks object={object}/>
        </div>
    </div>
);
};
  

export default Cv4

const Section = ({ title, bgColor, children }) => (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-white p-2" style={{ backgroundColor: bgColor }}>{title}</h2>
      {children}
    </div>
  );
  const Contact = ({userprop}) => {
    const user1 = userprop
    return <div className='flex flex-col gap-3 w-[100%]'> 
                <div className='flex items-center space-between gap-3'>
                    <MdEmail/>                                                                                                      
                    <p>{user1.email}</p>
                </div>
                <div className='flex items-center space-between gap-3'> 
                <MdOutlinePhoneIphone/>                                                          
                    <p>{user1.phone}</p>
                </div>
                <div className='flex items-center space-between gap-3'>
                <FaLinkedinIn />                                                          
                    <p>{user1.linkedin}</p>
                </div>
                <div className='flex items-center space-between gap-3'>
                    <MdLocationOn/>
                    <p>{user1.location}</p>
                </div>
    </div>                                                                                                        
}

const Experience = ({object}) => {
    const experiences = object.experience
    return <div className='flex flex-col mt-5 gap-3 w-[100%]'>
        
        {experiences.map((experience, key) => {
            return <div key={key} className='flex items-center space-between gap-1 w-[100%] text-left'>
                <p className='font-bold text-sm w-[50%] '>{experience.date}</p>
                <p className='font-bold w-[100%] text-right'>{experience.role}</p>
                <p className='text-sm text-right w-[100%]'>{experience.company}</p>
                
            </div>
        })}
    </div>
}

const Skills = ({object}) => {
    return <div className='flex flex-col mt-5 gap-3 w-[100%]'>
        {object.skills.map((skill, key) => {
            return <div key={key} className={`w-[100%] flex items-center space-between gap-${key*5} text-left`} >
                <p key={key} className='text-left mr-5'>{skill}</p>
                    <div className='w-full h-3 bg-zinc-500'>
                       
                    </div>
                </div>
        })}
    </div>
}


const Name = ({userprop, objectprop}) => {
    const user1 = userprop
    const object1 = objectprop
    return <div>
        <h1 className='text-7xl font-bold mb-1'>{user1.name}</h1>
        {object1.experience[0].role && (<p className='text-3xl mt-4 text-right'>{object1.experience[0].role}</p>)}
        </div>
}

const Education = ({object}) => {
    return <div className='flex flex-col mt-5 gap-3 w-[100%]'>
        {object.education.map((education, key) => {
            return <div key={key} className='flex items-center space-between gap-14 w-[100%] text-left'>
                <p className='font-bold text-sm w-[100%]'>{education.course}</p>
                <p className='font-bold text-right ml-[-25px] w-[25%]'>{education.school}</p>
                <p className='text-sm text-right w-[25%]'>{education.date}</p>
                
            </div>
        })}
    </div>
}

const Bio = ({object}) => {
    return <div>
        <p className='text-base w-[500px] mt-2 text-justify'>{object.objective}</p>
        </div>
}

const Tasks= ({object}) => {
    return <div className='flex flex-col my-5 gap-3 w-[100%]'>
        {object.tasks.map((task, key) => {
            return <div key={key} className={`w-[100%] flex items-start justify-start gap-4`} >
                <p className='font-bold'>{key + 1}</p>
                <p className='w-[90%]'>{task}</p>
                
                    
                </div>
        })}
    </div>
}