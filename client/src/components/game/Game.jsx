import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { List } from "@mui/material";
import client from "../../client/client";
import Header from "../header/HeaderMain";
import SideBar from "../sideBar/SideBar";
import RolesMain from "../roles/RolesMain";
import "./game.css";
import { loggedInUser } from "../../App";

const Game = () => {
  const [game, setGame] = useState({});
  const [roleCreated, setRoleCreated] = useState({});
  const profile = useLocation().state.profile;

  useEffect(() => {
    if(profile.gameId !== null) {
    client.get(`/game/${profile.gameId}`).then((res) => {
      console.log(res.data.game)
      setGame(res.data.game);
    });
    }
    //eslint-disable-next-line
  }, [roleCreated, location]);

  return (
    <>
      <div className="game_wrap">
        <div className="header_wrap">
          <Header profile={profile} game={game} />
        </div>
        <div className="sideBar_main_wrap">
          <div>
            <SideBar profile={profile} game={game} />
          </div>
          <div className="roles_wrap">
            <List className="list_ul_feed">
              <h2 className="welcome_title">{`Welcome, ${profile.name} ${profile.surname}!`}</h2>
              <RolesMain
                profile={profile}
                game={game}
                setRoleCreated={setRoleCreated}
                roleCreated={roleCreated}
              />
            </List>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
