import React from "react";
import { useLocation } from "react-router-dom";
import RoleRender from "./RoleRender";
import SideBar from "../sideBar/SideBar";
import Header from "../header/HeaderMain";

const RoleView = () => {
  const location = useLocation();
  const role = location.state.role;
  const profile = location.state.profile;
  const game = location.state.game;

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
          <div className="role_wrap">
            <RoleRender role={role} profile={profile} />

            {role.events?.map((event, i) => {
              return <RoleRender key={i} role={event}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleView;
