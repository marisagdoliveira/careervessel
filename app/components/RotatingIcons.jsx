import React from 'react'
import GitHubIcon from '../../public/assets/icon _github.svg'
import GlassDoorIcon from '../../public/assets/icon _Glassdoor.svg'
import IndeedIcon from '../../public/assets/icon _indeed.svg'
import LinkedinIcon from '../../public/assets/icon _linkedin.svg'
import '../../app/globals.css';
const RotatingIcons = () => {
  return (
   
<div className='absolute top-[19vw] left-[20vw]'>
  <div className="spin-animation">
    <div className="icon-container">
      <GitHubIcon className="absolute left-[6vw] top-[1vw]" style={{width: "3.4vw", height: "3.4vw"}}/>
      <GlassDoorIcon className="absolute top-[0.5vw]" style={{width: "3.4vw", height: "3.4vw"}}/>
      <LinkedinIcon className="absolute left-[2vw] top-[4vw]" style={{width: "3.4vw", height: "3.4vw"}}/>
      <IndeedIcon className="absolute left-[2vw] " style={{width: "3.4vw", height: "3.4vw"}}/>
    </div>
  </div>
</div>
  )
}

export default RotatingIcons



