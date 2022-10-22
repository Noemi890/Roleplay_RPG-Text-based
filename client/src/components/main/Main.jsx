import React from "react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "../header/HeaderMain"
import SideBar from "../sideBar/SideBar"

const Main = () => {
  const [user, setUser] = useState({})
  const location = useLocation()
  
  useEffect(() => {
    console.log(location.state)
    setUser(location.state.user)
  //eslint-disable-next-line
  }, [])


  return (
    <>
    <Header profiles={location.state?.profiles} user={user}/>
    <SideBar />
    </>
  )
}

export default Main