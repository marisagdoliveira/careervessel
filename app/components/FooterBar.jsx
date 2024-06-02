import React from 'react'
import CVLogo from "../../public/assets/Logo.svg";
import GitHubIcon from '../../public/assets/icon _github.svg'
import GlassDoorIcon from '../../public/assets/icon _Glassdoor.svg'
import LinkedinIcon from '../../public/assets/icon _linkedin.svg'
import { FaRegCopyright } from "react-icons/fa6";
const FooterBar = () => {
  return (
    <div className="absolute bottom-0 w-[100%] h-[200px] bg-zinc-950 p-10 text-white">
      <div className='flex w-[100%] h-[100%] flex-col items-center justify-center'>
        <div className='h-[100%] flex justify-center items-center gap-2 mt-[50px]'>
          <FaRegCopyright />

          <p>All rights reserved</p>
          <CVLogo
            style={{ width: "30px", height: "30px" }}

          />
          
        </div>
        <div className='flex gap-5 w-[100%] h-[100%] items-end text-3xl'>
          <GitHubIcon className="cursor-pointer"/>
          <LinkedinIcon className="cursor-pointer" />
          <GlassDoorIcon className="cursor-pointer" />
          
        </div>
      </div>
    </div>
  )
}

export default FooterBar
