import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog, ClickAwayListener, TextField } from "@mui/material";
import "./sidebar.css";
import { initialCreateGame } from "../utils/constants";
import client from "../../client/client";

const SideBar = ({profile, game = null }) => {
  const [open, setOpen] = useState(false);
  const [newGame, setNewGame] = useState(initialCreateGame);
  const location = useLocation()
  const navigate = useNavigate()

  const handleCreateGameClick = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleChangeCreate = (e) => {
    e.preventDefault();
    const { value, label } = e.target
    setNewGame({
      ...newGame,
      [label]: value
    })
  };

  const handleCreateGameSubmit = () => {
    client
      .post('/game', { newGame, profileId: location.state.profile.id })
      .then(res => {
        console.log(res)
        navigate('/game', { state: {

        }})
      })
  };

  return (
    <>
      <Dialog open={open}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <form onSubmit={handleCreateGameSubmit}>
            <TextField
              value={newGame.title}
              label="title"
              onChange={handleChangeCreate}
            />
            <TextField
              value={newGame.story}
              label="story"
              onChange={handleChangeCreate}
            />
            <Button variant="contained" className="nav_btn" type="submit">
              Create Game
            </Button>
          </form>
        </ClickAwayListener>
      </Dialog>
      <div className="side_bar">
        <nav className="side_nav">
          {game ? (
            <>
              <Button className="nav_btn" variant="contained">
                Ended Roles
              </Button>
              <Button className="nav_btn" variant="contained">
                Your Open Roles
              </Button>
              {
                game.authorId === profile.id ? 
                <Button className="nav_btn" variant="contained">
                  Add Profile to game
                </Button> : <></>
              }
            </>
          ) : (
            <Button
              onClick={handleCreateGameClick}
              className="nav_btn"
              variant="contained"
            >
              Create your Game
            </Button>
          )}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
