import React from "react";
import { useLocation } from "react-router-dom";
import { List } from "@mui/material";
import Header from "../header/HeaderMain";
import SideBar from "../sideBar/SideBar";
import RolesMain from "../roles/RolesMain";
import "./game.css";


const Game = () => {
  const location = useLocation()
  const profile = location.state.profile;
  const game = location.state.game
  console.log('in game',profile)

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
            <div className="container_roles">
            <h2 className="welcome_title">{`Welcome, ${profile.name} ${profile.surname}!`}</h2>
            <List className="list_ul_feed">
              <RolesMain
                profile={profile}
                game={game}
              />
            </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
