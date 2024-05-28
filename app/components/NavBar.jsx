import Link from "next/link";
import CVLogo from "../../public/assets/Logo.svg";
import React from 'react'

const NavBar = () => {
  return (
    <div>
          <div className="w-[100%] h-[3vw] p-[4px] box-gradient-nav flex space-between">
              <Link href="/dashboard"><CVLogo style={{ width: "100%", height: "4.5vw" }} className="ml-[20px] mt-2" /></Link>
          </div>
    </div>
  )
}

export default NavBar
