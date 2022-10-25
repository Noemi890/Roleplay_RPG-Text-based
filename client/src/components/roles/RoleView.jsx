import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import RoleRender from "./RoleRender";
import SideBar from "../sideBar/SideBar";
import Header from "../header/HeaderMain";

const RoleView = () => {
  const location = useLocation();
  const role = location.state.role;
  const user = location.state.user;
  const game = location.state.game

  return (
    <>
      <div className="game_wrap">
        <div className="header_wrap">
          <Header user={user} game={game} />
        </div>
        <div className="sideBar_main_wrap">
          <div>
            <SideBar user={user} game={game} />
          </div>
          <div className="role_wrap">
            <RoleRender role={role} user={user} />
          </div>
          {role.events?.map((event, i) => {
            return (
              <div className="role_wrap" key={i}>
                <RoleRender role={event} user={user} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RoleView;
