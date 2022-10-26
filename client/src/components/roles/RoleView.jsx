import React from "react";
import { useLocation } from "react-router-dom";
import { List } from "@mui/material";
import RoleRender from "./RoleRender";
import SideBar from "../sideBar/SideBar";
import Header from "../header/HeaderMain";

const RoleView = () => {
  console.log("inside roleview", useLocation().state);
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
          <div className="roles_wrap">
            <List className="list_ul_feed">
            <h2 className="title_role_view">{`${role.title}`}</h2>
              <div className="listItem_wrap">
                <div className="role_wrap">
                  <RoleRender role={role} profile={profile} />
                </div>

                {role.events?.map((event, i) => {
                  return (
                    <div className="role_wrap">
                      <RoleRender i={i} role={event} />
                    </div>
                  )
                })}
              </div>
            </List>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleView;
