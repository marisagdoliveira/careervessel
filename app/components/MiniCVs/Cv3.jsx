import React, { useState, useEffect } from 'react';
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import FileUploadComponent from '../FileUploadComponent';


const Cv3 = (props) => {
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
    <div className="w-full h-full bg-gray-100 flex justify-center items-center p-[20px] rounded-md leading-tight" contentEditable="true">
    <div className="bg-white shadow-lg rounded-lg w-[754px] h-[983px] p-[20px] flex flex-col gap-8">
      <div className="flex flex-col items-center">
      <div className="w-[170px] h-[170px] rounded-full bg-zinc-100 flex justify-center items-center" contentEditable="false">
                  {userPic ? (
                      <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[170px] h-[170px] rounded-full object-cover" />
                  ) : (
                          <FileUploadComponent onUploadSuccess={handleUploadSuccess} />
                  )}
                    
            </div>
        <h1 className="text-4xl font-bold mt-5">{user.name}</h1>
        <p className="text-xl text-gray-600">{object.experience[0].role}</p>
      </div>

      <div className="flex flex-col gap-5">
        <Section title="Contact" bgColor={colors.color1}>
          <Contact user={user} />
        </Section>
        <Section title="Experience" bgColor={colors.color1}>
          <Experience object={object} />
        </Section>
        
        <div className="flex flex-row gap-5">
              <div className="flex-1">
                <Section title="Skills" bgColor={colors.color1}>
                  <Skills object={object} />
                </Section>
              </div>
              <div className="flex-1">
                <Section title="Education" bgColor={colors.color1}>
                  <Education object={object} />
                </Section>
              </div>
              </div>
      </div>
    </div>
  </div>
);
};
  

export default Cv3

const Section = ({ title, bgColor, children }) => (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-white p-2" style={{ backgroundColor: bgColor }}>{title}</h2>
      {children}
    </div>
  );
  const Contact = ({ user }) => (
    <div className="flex justify-around mt-2 gap-3">
        <div className="flex flex-col mt-2 gap-3">
      <div className="flex items-center gap-3">
        <MdEmail />
        <p>{user.email}</p>
      </div>
      <div className="flex items-center gap-3">
        <MdOutlinePhoneIphone />
        <p>{user.phone}</p>
      </div>
      </div>
      <div className="flex flex-col mt-2 gap-3">
      <div className="flex items-center gap-3">
        <FaLinkedinIn />
        <p>{user.linkedin}</p>
      </div>
      <div className="flex items-center gap-3">
        <MdLocationOn />
        <p>{user.location}</p>
      </div>
      </div>
    </div>
  );

const Experience = ({object}) => {
    const experiences = object.experience
    return <div className='flex flex-col mt-2 gap-1 w-[100%]'>
        
        {experiences.map((experience, key) => {
            return (
              <div
                key={key}
                className="flex items-center space-between gap-1 w-[100%] text-left"
              >
                <p className="font-bold text-sm w-[40%] text-center">
                  {experience.date}
                </p>
                <p className="font-bold text-sm w-[80%] text-center">
                  {experience.role}
                </p>
                <p className="text-sm max-w-[20%] text-center">
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

const Education = ({object}) => {
    return <div className='flex flex-col gap-1 mt-2 w-[100%]'>
        {object.education.map((education, key) => {
            return <div key={key} className='flex items-center space-between gap-14 w-[100%] text-left'>
                <p className='font-bold text-center text-sm w-[100%]'>{education.course}</p>
                <p className='font-bold text-sm text-center ml-[-25px] w-[25%]'>{education.school}</p>
                <p className='text-sm text-center w-[25%]'>{education.date}</p>
                
            </div>
        })}
    </div>
}

const Bio = ({object}) => {
    return <div>
        <p className='text-base mt-2 text-justify'>{object.objective}</p>
        </div>
}

const Tasks= ({object}) => {
    return <div className='flex flex-col gap-3 mt-2 w-[100%]'>
        {object.tasks.map((task, key) => {
            return <div key={key} className={`w-[100%] flex items-start justify-start gap-4`} >
                <p className='font-bold'>{key + 1}</p>
                <p className='w-[90%]'>{task}</p>
                
                    
                </div>
        })}
    </div>
}