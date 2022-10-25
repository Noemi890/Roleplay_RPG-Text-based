import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@mui/material";
import Header from "../header/HeaderMain";
import SideBar from "../sideBar/SideBar";
import './main.css'

const Main = () => {
  const location = useLocation();
  const profile = location.state.profile

  return (
    <>
      <div className="main_wrap">
        <div className="header_wrap">
          <Header profile={profile} />
        </div>
        <div className="sideBar_main_wrap">
          <div>
            <SideBar />
          </div>
          <div className="welcome_no_game_user">
            <Card className="wrap_welcome">
            <h2 className="welcome_title">
              {`Welcome, ${profile.name} ${profile.surname}!`}
            </h2>
            <h3>Start by creating your first Game or join an existing one!</h3>
            <span>Check on your left! You're having everything you need!</span>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
