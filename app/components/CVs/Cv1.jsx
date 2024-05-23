import React from 'react'
import { MdEmail, MdLocationOn, MdOutlinePhoneIphone } from "react-icons/md";

const user = {
    name: 'John Doe',
    email: 'j8vZi@example.com',
    phone: '123-456-7890',
    location: 'Anytown, USA',
    imgsrc: '/assets/cv1.png'
}

const gptJson = {
    education: [
        {
            role: 'Software Engineer',
            company: 'Gaagle',
            date: '2023-Present',
        },
        {
            role: 'Junior Frontend',
            company: 'MacroHard',
            date: '2022-Present',
        },
        {
            role: 'Internship UxDesign',
            company: 'Pear',
            date: '2021-Present',
        },
    ],
    skills: [
        'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB',
    ]
}


const Cv1 = (props) => {
    const colors = props.colors
    console.log(colors)
  return (
    <div className={`w-[794px] h-[1123px] bg-zinc-100`} >
        <div className='w-[300px] h-[100%] px-5 py-7 flex flex-col gap-7 items-center' style={{backgroundColor: colors.color1}}>
            <div className="w-[170px] h-[170px] rounded-full bg-zinc-100 flex justify-center items-center">
                    <img src="/assets/cv1.png"/>
            </div>
            <h1 className='text-white p-2 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}>Contact</h1>
            <Contact/>
            <h1 className='text-white p-2 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}>Education</h1>
            <Education />
            <h1 className='text-white p-2 w-full text-lg font-semibold text-center' style={{backgroundColor: colors.color2}}>Skills</h1>
            <Skills />
        </div>
        <div>

        </div>
    </div>
  )
}

export default Cv1

const Contact = () => {
    return <div className='flex flex-col gap-3 w-[100%]'> 
                <div className='flex items-center space-between gap-3'>
                    <MdEmail/>                                                                                                      
                    <p>{user.email}</p>
                </div>
                <div className='flex items-center space-between gap-3'> 
                <MdOutlinePhoneIphone/>                                                          
                    <p>{user.phone}</p>
                </div>
                <div className='flex items-center space-between gap-3'>
                    <MdLocationOn/>
                    <p>{user.location}</p>
                </div>
    </div>                                                                                                        
}

const Education = () => {
    return <div className='flex flex-col gap-3 w-[100%]'>
        {gptJson.education.map((education) => {
            return <div className='flex items-center space-between gap-1 w-[100%] text-left'>
                <p className='font-bold text-sm '>{education.date}</p>
                <p className='font-bold ml-[-25px]'>{education.role}</p>
                <p className='text-sm text-right'>{education.company}</p>
                
            </div>
        })}
    </div>
}
const Skills = () => {
    return <div className='flex flex-col gap-3 w-[100%]'>
        {gptJson.skills.map((skill, key) => {
            return <div key={key} className={`w-[100%] flex items-center space-between gap-${key*5} text-left`} >
                <p className='text-left mr-5'>{skill}</p>
                    <div className='w-full h-3 bg-zinc-500'>
                       
                    </div>
                </div>
        })}
    </div>
}