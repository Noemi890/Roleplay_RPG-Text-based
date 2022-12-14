import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@mui/material";
import "./profile.css";
import RenderList from "./RenderList";
import client from "../../client/client";
import { useContext } from "react";
import { loggedInUser } from "../../App";

const SelectProfile = () => {
  // const { user } = useContext(loggedInUser)
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    client.get(`/user/${location.state?.id}/profiles`).then((res) => {
      setProfiles(res.data.profiles);
    });
    //eslint-disable-next-line
  }, []);

  const handleCreateNewProfile = () => {
    navigate('/profile/create', { state: location.state.id })
  }

  const handleClick = (e, i) => {
    const profile = profiles[i]
    const gameId = profile.gameId ? profile.gameId : profile.authorGameId
    if (gameId) {
      client
        .get(`/game/${gameId}`)
        .then (res => {
          const game = res.data.game
          navigate("/game", {
            state: {
              profile,
              profiles,
              game
            },
          });
        })
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
