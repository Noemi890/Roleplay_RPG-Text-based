import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client/client";
import Header from "../header/HeaderMain";
// import HeaderGame from "../header/HeaderGame";

const Game = () => {
  const [user, setUser] = useState({})
  const location = useLocation()

  useEffect(() => {
    setUser(location.state.user)
    client
      .get('/game', user.gameId)
      .then(res => {
        console.log(res)
      })
  //eslint-disable-next-line
  }, [])


  return (
    <>
    <Header profiles={location.state.profiles} setUser={setUser} user={user}/>
    </>
  )
}

export default Game