import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener, Dialog } from "@mui/material";
import "./profile.css";
import RenderList from "./RenderList";
import client from "../../client/client";

const SelectProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    client.get("/profiles").then((res) => {
      setProfiles(res.data.profiles);
    });
    //eslint-disable-next-line
  }, []);

  const handleClick = (e, index) => {
    const profile = profiles[index];
    console.log(profile);
    if (profile.gameId) {
      navigate("/game", { state: {
        user: profile,
        profiles
      } 
    });
    } else {
      navigate("/main", { state: {
        user: profile,
        profiles
      } 
    });
    }
  };

  return (
    <>
      <h2 className="profile_select_title">Select your Character</h2>
      <Dialog className="select_profile_dialog" open={true}>
          <RenderList profiles={profiles} handleClick={handleClick} />
      </Dialog>
    </>
  );
};

export default SelectProfile;
