import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import client from "../../client/client";
import Header from "../header/HeaderMain";
import SideBar from "../sideBar/SideBar";
// import HeaderGame from "../header/HeaderGame";

const Game = () => {
  const [user, setUser] = useState({})
  const [game, setGame] = useState({})
  const location = useLocation()

  useEffect(() => {
    setUser(location.state.user)
    client
      .get(`/game/${location.state.user.gameId}`)
      .then(res => {
        setGame(res.data.game)
      })
  //eslint-disable-next-line
  }, [])


  return (
    <>
    <Header profiles={location.state.profiles} user={user} game={game}/>
    <SideBar user={user} game={game}/>
    </>
  )
}

export default Game