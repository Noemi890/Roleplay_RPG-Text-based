import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  List,
  Button,
  Dialog,
  TextField,
  ClickAwayListener,
  Select,
  MenuItem,
  Avatar,
  // InputLabel,
  // FormHelperText,
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
  const [gamePartecipants, setGamePartecipants] = useState([]);
  const [selectPartecipants, setSelectPartecipants] = useState([]);
  const [partecipants, setPartecipants] = useState([]);

  const location = useLocation();
  const roleId = location.state.role.id;
  const profile = location.state.profile;
  const profileId = location.state.profile.id;
  const game = location.state.game;
  
  useEffect(() => {
    client.get(`/role/${roleId}`).then((res) => {
      setRole(res.data.role);
    });
    setGamePartecipants([...game.profiles, game.author]);
  }, [response, roleId, game]);

  const isInRole = () => {
    console.log('isinrole',role)
    const found = role?.events?.find(
      (event) => event.profile.id === profile.id
    );
  
    const isAuthor = role.authorId === profile.id;
    console.log(found, isAuthor);
    if (found || isAuthor) return true;
    else return false;
  };

  const getPartecipantsNotInRole = () => {
    const partecipants = [];
    for (let i = 0; i < gamePartecipants.length; i++) {
      const found = role?.events.find(
        (char) => char.id !== gamePartecipants[i].id
      );
      const isAuthor = gamePartecipants[i].id === role.authorId;
      console.log("found", found, "is author", isAuthor);
      if (!found && !isAuthor) {
        partecipants.push(gamePartecipants[i]);
      }
    }
    console.log("partecipants", partecipants);
    return partecipants;
  };

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
        setResponse(res.data);
        setOpen(false);
      })
      .catch((error) => {
        setResponse(error);
      });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setSelectPartecipants([]);
    } else {
      setSelectPartecipants(value);
      const char = gamePartecipants.find(
        (char) => char.name === value[value.length - 1]
      );
      setPartecipants([...partecipants, { id: char.id }]);
    }
  };

  const handleAddPartecipantsClick = () => {
    client
      .patch(`/role/${role.id}/partecipants`, { partecipants })
      .then((res) => {
        setResponse(res.data);
        setPartecipants([]);
        setSelectPartecipants([]);
      });
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
                  {isInRole() && (
                    <div className="partecipants_container">
                      <Select
                        multiple
                        value={selectPartecipants}
                        variant="standard"
                        labelId="select"
                        label="Select Characters"
                        name="profiles"
                        sx={{ width: "10rem" }}
                        onChange={handleSelectChange}
                        renderValue={(selected) => {
                          return selected.join(", ");
                        }}
                      >
                        {getPartecipantsNotInRole()?.map((char) => (
                          <MenuItem
                            key={char?.id}
                            value={char?.name}
                            sx={{ gap: "0.5rem" }}
                          >
                            <Avatar alt={char?.name} src={char?.image} />
                            {` ${char?.name} ${char?.surname}`}
                          </MenuItem>
                        ))}
                      </Select>
                      <Button
                        onClick={handleAddPartecipantsClick}
                        variant="contained"
                        className="nav_btn"
                      >
                        Add partecipants
                      </Button>
                    </div>
                  )}
                  {role && (
                    <div className="role_wrap">
                      <RoleRender role={role} />
                    </div>
                  )}
                  {role.events?.map((event, i) => {
                    return (
                      <div className="role_wrap" key={i}>
                        <RoleRender event={event} />
                      </div>
                    );
                  })}
                  {isInRole() && (
                    <Button
                      onClick={handleAnswerClick}
                      className="nav_btn answer_btn"
                      variant="contained"
                    >
                      Answer
                    </Button>
                  )}
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
