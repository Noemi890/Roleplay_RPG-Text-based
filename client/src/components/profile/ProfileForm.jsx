import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import { userProfileCreation } from "../utils/constants";
import { Card, TextField, Button, Alert } from "@mui/material";
import client from "../../client/client";

const Profile = () => {
  const [userCharacter, setUserCharacter] = useState(userProfileCreation);
  const [data, setData] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState({})
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.userId;
  const profiles = location.state.profiles
  const header = location.state ? true : false;
  
  useEffect(() => {
    setProfile(location.state.profile)
    }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCharacter({
      ...userCharacter,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .post("/profile/create", { user: {id: userId}, profile: userCharacter }, header)
      .then((res) => {
        setData(res.data.message);
        setSuccess(true);
        const profile = res.data.createdProfile;
        let profiles = res.data.user.profile;
        setTimeout(() => {
          setSuccess(false);
          if (profiles.length < 1) {
            navigate("/login");
          } else {
            client
              .get(`/user/${userId}/profiles`)
              .then(res => {
                profiles = res.data.profiles
                navigate("/main", {
                  state: {
                    profile,
                    profiles,
                  }
              })
            });
          }
        }, "2000");
      })
      .catch((e) => {
        setData(e.response.data.error);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, "3000");
      });
  };

  const handleBackClick = () => {
    if(!location.state.game) {
      navigate('/main', {state: {
        profile,
        profiles
      }})}
    else {
    navigate("/game", {state: {
      profile,
      profiles
    }});
    }
  };

  return (
    <div className="auth-form">
      <h2 className="profile_creation_title">Create your new Character</h2>
      <Card className="profile_creation_card">
        <form className="profile_creation_card" onSubmit={handleSubmit}>
          <TextField
            required
            variant="standard"
            className="profile_creation_input"
            name="name"
            label="name"
            value={userCharacter.name}
            onChange={handleChange}
          />
          <TextField
            required
            variant="standard"
            className="profile_creation_input"
            name="surname"
            label="surname"
            value={userCharacter.surname}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            className="profile_creation_input"
            type="text"
            name="image"
            label="image URL"
            value={userCharacter.image}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            className="profile_creation_input"
            name="race"
            label="race"
            value={userCharacter.race}
            onChange={handleChange}
          />
          <TextField
            type="number"
            variant="standard"
            className="profile_creation_input"
            label="age"
            name="age"
            value={userCharacter.age}
            onChange={handleChange}
          />
          <TextField
            multiline
            variant="standard"
            className="profile_creation_input"
            label="biography"
            name="biography"
            value={userCharacter.biography}
            onChange={handleChange}
          />
          <Button
            className="profile_creation_btn nav_btn"
            variant="contained"
            type="submit"
          >
            Create Profile
          </Button>
          {header && (
            <Button
              className="go_back_btn nav_btn"
              variant="contained"
              onClick={handleBackClick}
            >
              Back
            </Button>
          )}
        </form>
      </Card>
      {success ? <Alert severity="success">{data}</Alert> : <></>}
      {error ? <Alert severity="error">{data}</Alert> : <></>}
    </div>
  );
};

export default Profile;
