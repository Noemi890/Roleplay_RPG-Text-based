import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
  ClickAwayListener,
  Typography,
  Button,
  Alert
} from "@mui/material";
import AddCircleTwoTone from "@mui/icons-material/AddCircleTwoTone";
import client from "../../client/client";
import Header from "../header/HeaderMain";
import SideBar from "../sideBar/SideBar";
import "./addprofiles.css";

const AddProfilesFromPlatform = () => {
  const [platformProfiles, setPlatformProfiles] = useState({});
  const [partecipant, setPartecipant] = useState({});
  const [response, setResponse] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const profile = location.state.profile;
  const game = location.state.game;
  const profiles = location.state.profiles

  useEffect(() => {
    client.get(`/profiles`).then((res) => {
      setPlatformProfiles(res.data.profiles);
    });
    //eslint-disable-next-line
  }, [response]);

  const handleClickAway = () => {
    setPartecipant([])
    setOpenDialog(!openDialog);
  };

  const handleAddClick = (e, i) => {
    const profile = platformProfiles[i];
    setPartecipant(profile);
    setOpenDialog(!openDialog);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault('')
    client
      .patch(`/game/${game.id}`, { partecipant })
      .then(res => {
        client
          .patch(`/profile/${partecipant.id}`, { gameId: game.id})
          .then (res => {
            setResponse(res.data)
            setSuccess(true)
            setTimeout(() => {
              setSuccess(false)
              setOpenDialog(!openDialog)
            }, '2000')
          })
      })
      .catch(e => {
        setError(true)
        setTimeout(() => {
          setError(false)
          setOpenDialog(!openDialog)
        }, '2000')
      })
  };

  const handleBackClick = () => {
    client
      .get(`/game/${game.id}`)
      .then(res => {
        navigate('/game', {
          state: {
            profile,
            game: res.data.game,
            profiles
          }
        })
      })
  }

  return (
    <>
      <Dialog open={openDialog}>
        <ClickAwayListener onClickAway={() => handleClickAway()}>
          <div className="invite_character_wrap">
            <Typography>Invite this character to your game?</Typography>
            <div className="character_wrap">
            <Avatar alt={partecipant.name} src={partecipant.image} />
            <Typography>{`${partecipant.name} ${partecipant.surname}`}</Typography>
            </div>
            <Button
              variant="contained"
              className="nav_btn"
              onClick={handleAddSubmit}
            >
              Confirm
            </Button>
          </div>
        </ClickAwayListener>
        {
          success &&
          <Alert severity="success">Added Succesfully</Alert>
        }
        {
          error &&
          <Alert severity="error">Unable to process request</Alert>
        }
      </Dialog>
      <div className="game_wrap">
        <div className="header_wrap">
          <Header profile={profile} game={game}/>
        </div>
        <div className="sideBar_main_wrap">
          <div>
            <SideBar profile={profile} game={game} />
          </div>
          <div className="roles_wrap">
            <div className="container_profiles">
              <h2 className="welcome_title">{`Add character to your game`}</h2>
              <List className="list_ul_feed">
                {platformProfiles.length > 0 &&
                  platformProfiles?.map((profile, i) => {
                    return (
                      <div key={i} className="list_item_profile_wrap">
                        <ListItem className="list_item_profiles">
                          <ListItemAvatar>
                            <Avatar alt={profile.name} src={profile.image} />
                          </ListItemAvatar>
                          <ListItemText>{`${profile.name} ${profile.surname}`}</ListItemText>
                          <IconButton onClick={(e) => handleAddClick(e, i)}>
                            <AddCircleTwoTone />
                          </IconButton>
                        </ListItem>
                      </div>
                    );
                  })}
                  <div className="back_container">
                <Button variant="contained" className="nav_btn" onClick={handleBackClick}>Back</Button>
                </div>
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProfilesFromPlatform;
