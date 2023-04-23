import React from 'react'
import './SideBar.css'

function SideBar({ selected }) {
    const sidebarHtml = selected.map((item, index) => <div key={index}>{item}</div>)
  return (
    <div className='sidebar-container'>
        {sidebarHtml}
    </div>
  )
}

export default SideBar