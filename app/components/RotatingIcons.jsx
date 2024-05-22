import React from 'react'
import GitHubIcon from '../../public/assets/icon _github.svg'
import GlassDoorIcon from '../../public/assets/icon _Glassdoor.svg'
import IndeedIcon from '../../public/assets/icon _indeed.svg'
import LinkedinIcon from '../../public/assets/icon _linkedin.svg'
import '../../app/globals.css';
const RotatingIcons = () => {
  return (
   
<div className='absolute top-[350px] left-[380px]'>
  <div className="spin-animation">
    <div className="icon-container">
      <GitHubIcon className="absolute left-24 top-4" style={{width: "50px", height: "50px"}}/>
      <GlassDoorIcon className="absolute top-2" style={{width: "50px", height: "50px"}}/>
      <LinkedinIcon className="absolute left-8 top-14" style={{width: "50px", height: "50px"}}/>
      <IndeedIcon className="absolute left-8 " style={{width: "50px", height: "50px"}}/>
    </div>
  </div>
</div>
  )
}

export default RotatingIcons



