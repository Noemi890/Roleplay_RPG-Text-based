import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@mui/material";
import "./profile.css";
import RenderList from "./RenderList";
import client from "../../client/client";

const SelectProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    client.get(`/user/${location.state.id}/profiles`).then((res) => {
      setProfiles(res.data.profiles);
    });
    //eslint-disable-next-line
  }, []);

  const handleCreateNewProfile = () => {
    navigate('/profile/create', { state: location.state.id })
  }

  const handleClick = (e, index) => {
    const profile = profiles[index];

    if (profile.gameId) {
      navigate("/game", {
        state: {
          profile,
          profiles
        },
      });
    } else {
      navigate("/main", {
        state: {
          profile,
          profiles
        },
      });
    }
  };

  return (
    <>
      <h2 className="profile_select_title">Select your Character</h2>
      <Dialog className="select_profile_dialog" open={true}>
        <RenderList profiles={profiles} handleClick={handleClick} handleCreateNewProfile={handleCreateNewProfile}/>
      </Dialog>
    </>
  );
};

export default SelectProfile;
