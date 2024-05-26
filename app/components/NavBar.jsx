import Link from "next/link";
import CVLogo from "../../public/assets/Logo.svg";
import React from 'react'

const NavBar = () => {
  return (
    <div>
          <div className="w-[100%] h-[3vw] p-1 box-gradient flex space-between">
              <Link href="/dashboard"><CVLogo style={{ width: "100%", height: "100%" }} className="ml-[20px]" /></Link>
          </div>
    </div>
  )
}

export default NavBar
