import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { List, Button } from "@mui/material";
import client from "../../client/client";
import Header from "../header/HeaderMain";
import SideBar from "../sideBar/SideBar";
import RolesMain from "../roles/RolesMain";
import "./game.css";
// import HeaderGame from "../header/HeaderGame";

const Game = () => {
  const [user, setUser] = useState({});
  const [game, setGame] = useState({});
  const [roleCreated, setRoleCreated] = useState({});
  const location = useLocation();

  useEffect(() => {
    setUser(location.state.user);
    client.get(`/game/${location.state.user.gameId}`).then((res) => {
      setGame(res.data.game);
    });
    //eslint-disable-next-line
  }, [roleCreated]);

  return (
    <>
      <div className="game_wrap">
        <div className="header_wrap">
          <Header profiles={location.state.profiles} user={user} game={game} />
        </div>
        <div className="sideBar_main_wrap">
          <div>
            <SideBar user={user} game={game} />
          </div>
          <div className="roles_wrap">
            <List>
              <RolesMain
                user={user}
                game={game}
                setRoleCreated={setRoleCreated}
              />
            </List>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
