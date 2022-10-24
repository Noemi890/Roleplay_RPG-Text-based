import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { List } from "@mui/material";
import Header from "../header/HeaderMain";
import SideBar from "../sideBar/SideBar";

const Main = () => {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    setUser(location.state.user);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="main_wrap">
        <div className="header_wrap">
          <Header profiles={location.state.profiles} user={user} />
        </div>
        <div className="sideBar_main_wrap">
          <div>
            <SideBar />
          </div>
          <div>
            <List></List>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
