import React from "react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import 

const Main = () => {
  const [user, setUser] = useState({})
  const location = useLocation()
  console.log(location.state)

  useEffect(() => {
    setUser(location.state)
  //eslint-disable-next-line
  }, [])

  return (
    <>

    </>
  )
}

export default Main