import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv6 = (props) => {
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
        <div className='mt-10 ml-5 mr-5 w-[480px] rounded-md'>
          <div style={{color: colors.color2}} className='flex flex-col gap-5 ' >
          <Name userprop={user} objectprop={object}/>
          <h1 className='text-white p-2 mt-[23px] w-full text-lg font-semibold text-left rounded-lg' style={{backgroundColor: colors.color2}}>About me</h1>
          <Bio object={object}/>
          <h1 className='text-white p-2 mt-[40px] w-full text-lg font-semibold text-left rounded-lg' style={{backgroundColor: colors.color2}}>Education</h1>
          <Education object={object}/>
          <h1 className='text-white p-2 mt-[-5px] w-full text-lg font-semibold text-left rounded-lg' style={{backgroundColor: colors.color2}}>Tasks</h1>
          <Tasks object={object}/>
          </div>

      </div>


      <div className='w-[300px] h-[100%] px-5 py-7 flex flex-col gap-7 items-center rounded-md leading-tight' style={{backgroundColor: colors.color1}}>
      <div className="w-[170px] h-[170px] rounded-full bg-zinc-100 flex justify-center items-center" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[170px] h-[170px] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent  onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
          <h1 className='text-white p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Contact</h1>
          <Contact userprop={user}/>
          <h1 className='text-white p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Experience</h1>
          <Experience object={object}/>
          <h1 className='text-white p-2 w-full text-lg font-semibold text-center rounded-lg' style={{backgroundColor: colors.color2}}>Skills</h1>
          <Skills object={object}/>
      </div>


    


  </div>
);
};
  

export default Cv6

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
    return <div className='flex flex-col gap-3 w-[100%]'>
        
        {experiences.map((experience, key) => {
            return (
              <div
                key={key}
                className="flex items-center space-between gap-1 w-[100%] text-left"
              >
                <p className="font-bold text-sm w-[50%] text-center">
                  {experience.date}
                </p>
                <p className="font-bold text-sm w-[100%] text-center">
                  {experience.role}
                </p>
                <p className="text-sm text-center max-w-[90px]">
                  {experience.company}
                </p>
              </div>
            );
        })}
    </div>
}

const Skills = ({ object }) => {
    const arr = [];
    for (let i = 0; i < object.skills.length; i++) {
        arr.push(Math.floor(Math.random() * (120 - 60 + 1) + 60));
      }
      
  if (object.skills[0] !== "") {
    return (
      <div className="flex flex-col gap-3 w-[100%]">
        {object.skills.map((skill, key) => {
          
          return (
            <div key={key} className="flex-1 flex flex-row">
              <div className="flex-1 flex flex-col">
                <p key={key} className="text-left">
                  {skill}
                </p>
              </div>
              <div className={`flex-1 flex items-center justify-start`}>
                <div
                  className={`h-3 bg-zinc-500 ml-2 `}
                  style={{ width: `${arr[key]}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    )} ;
  };


const Name = ({userprop, objectprop}) => {
    const user1 = userprop
    const object1 = objectprop
    return <div>
        <h1 className='text-7xl font-bold mb-1'>{user1.name}</h1>
        {object1.experience[0].role && (<p className='text-3xl mt-4 text-right'>{object1.experience[0].role}</p>)}
        </div>
}

const Education = ({ object }) => {
  return (
    <div className="flex flex-col gap-3 w-[100%]">
      {object.education.map((education, key) => {
        return (
          <div
            key={key}
            className="flex items-center space-between gap-14 w-[100%] text-left"
          >
            <p className="font-bold text-center text-sm w-[100%]">
              {education.course}
            </p>
            <p className="font-bold text-center text-sm ml-[-25px] w-[100%]">
              {education.school}
            </p>
            <p className="text-sm text-center w-[100%]">{education.date}</p>
          </div>
        );
      })}
    </div>
  );
};

const Bio = ({object}) => {
    return <div>
        <p className='text-base mt-2 text-justify'>{object.objective}</p>
        </div>
}

const Tasks= ({object}) => {
    return <div className='flex flex-col gap-3 w-[100%]'>
        {object.tasks.map((task, key) => {
            return <div key={key} className={`w-[100%] flex items-start justify-start gap-4`} >
                <p className='font-bold'>{key + 1}</p>
                <p className='w-[90%]'>{task}</p>
                
                    
                </div>
        })}
    </div>
}