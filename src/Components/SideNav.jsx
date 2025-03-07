import React from 'react'
import 'remixicon/fonts/remixicon.css'
import SideNavTop from './SideNavTop'
import SideNavBottom from './SideNavBottom'


const SideNav = () => {
  return (
    <div>
        <div className="sideNav h-full w-[25vw] border-r-4 border-gray ">
            <SideNavTop/>   
            <SideNavBottom/>     
        </div>
    </div>
  )
}

export default SideNav