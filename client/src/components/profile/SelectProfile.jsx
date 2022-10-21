import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import "./profile.css";
import client from "../../client/client";

const SelectProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    client.get("/profiles").then((res) => {
      setProfiles(res.data.profiles);
    });
    //eslint-disable-next-line
  }, []);

  const handleClick = (e, index) => {
    const profile = profiles[index]
    console.log(profile)
    if (profile.gameId) {
      navigate('/game', {state: profile})
    }
    else {
      navigate('/main', {state: profile})
    }
  };

  return (
    <>
      <h2 className="profile_select_title">Select your Character</h2>
      <Dialog className="select_profile_dialog" open={true}>
        <List>
          {profiles.map((profile, i) => {
            return (
                <ListItem
                  sx={{ cursor: "pointer" }}
                  key={i + 1}
                  onClick={(e) => handleClick(e, i)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={profile.name}
                      src={profile.image ? profile.image : ""}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${profile.name} ${profile.surname}`}
                  />
                </ListItem>
            );
          })}
        </List>
      </Dialog>
    </>
  );
};

export default SelectProfile;
