import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import { userProfileCreation } from "../utils/constants";
import { Card, TextField, Button } from "@mui/material";

const Profile = () => {
  const [userCharacter, setUserCharacter] = useState(userProfileCreation);
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    if (location.state) {
    setUserCharacter({
      ...location.state,
      ...userProfileCreation,
    })};
    // eslint-disable-next-line
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCharacter({
      ...userCharacter,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(userCharacter);
  };

  return (
    <div className="auth-form">
      <h2 className="profile_creation_title">Create your new Character</h2>
      <Card className="profile_creation_card">
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
          className="profile_creation_btn"
          variant="contained"
          onClick={handleSubmit}
        >
          {location.state ? "Register" : "Create Profile"}
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
