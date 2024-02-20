import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from './Sidebar/Sidebar';
const Layout = () => {
    var data = null;
    if (sessionStorage.getItem("userId")) {
         data = sessionStorage.getItem("userId")
    }
  return (
    <>
      {data && data !== null ? <><SideBar><Outlet/></SideBar></> :<Navigate to={"/login"}/>}
    </>
  )
}

export default Layout
