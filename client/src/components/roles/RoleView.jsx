import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  List,
  Button,
  Dialog,
  TextField,
  ClickAwayListener,
} from "@mui/material";
import RoleRender from "./RoleRender";
import SideBar from "../sideBar/SideBar";
import Header from "../header/HeaderMain";
import { useState } from "react";
import client from "../../client/client";

const RoleView = () => {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState({});
  const [response, setResponse] = useState({});
  const location = useLocation();
  const roleId = location.state.role.id;
  const profile = location.state.profile;
  const profileId = location.state.profile.id;
  const game = location.state.game;

  useEffect(() => {
    client.get(`/role/${roleId}`).then((res) => {
      setRole(res.data.role);
    });
    //eslint-disable-next-line
  }, [response]);

  const handleAnswerClick = () => {
    setOpen(true);
  };

  const handleAnswerChange = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  };

  const handleClickAway = () => {
    setAnswer("");
    setOpen(false);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    client
      .post(`/events`, { answer, roleId, profileId })
      .then((res) => {
      setResponse(res.data)
      setOpen(false)
      })
      .catch(error => {
        setResponse(error)
      })
  };

  return (
    <>
      <Dialog open={open}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <form onSubmit={handleAnswerSubmit}>
            <TextField
              multiline
              sx={{ width: "25rem" }}
              variant="standard"
              label="content"
              name="content"
              value={answer}
              onChange={handleAnswerChange}
            />
            <Button className="nav_btn" variant="contained" type="submit">
              Answer
            </Button>
          </form>
        </ClickAwayListener>
      </Dialog>
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
              <List className="list_ul_feed">
                <h2 className="title_role_view">{`${role.title}`}</h2>
                <div className="listItem_wrap">
                  <div className="role_wrap">
                    <RoleRender role={role} profile={profile} />
                  </div>

                  {role.events?.map((event, i) => {
                    return (
                      <div className="role_wrap" key={i}>
                        <RoleRender role={event} />
                      </div>
                    );
                  })}
                  <Button
                    onClick={handleAnswerClick}
                    className="nav_btn answer_btn"
                    variant="contained"
                  >
                    Answer
                  </Button>
                </div>
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleView;
