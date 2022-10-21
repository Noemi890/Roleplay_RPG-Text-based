import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import { userProfileCreation } from "../utils/constants";
import { Card, TextField, Button, Alert } from "@mui/material";
import client from "../../client/client";

const Profile = () => {
  const [userCharacter, setUserCharacter] = useState(userProfileCreation);
  const [data, setData] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const userId = location.state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCharacter({
      ...userCharacter,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userId, userCharacter)
    client
      .post('/profile/create', { user: userId, profile: userCharacter }, false)
      .then(res => {
        console.log(res)
        setData(res.data.message)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false);
          navigate('/login')
        }, '3000');
      })
    .catch (e => {
      setData(e.data.message)
      setError(true)
      setTimeout(() => {
        setError(false);
      }, '3000');
    })
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
          className="profile_creation_btn"
          variant="contained"
          type="submit"
        >
          {location.state ? "Register" : "Create Profile"}
        </Button>
        </form>
      </Card>
        {
          success ? 
          <Alert severity="success">{data}</Alert> : <></>
        }
        {
          error ? 
          <Alert severity="error">{data}</Alert> : <></>
        }
    </div>
  );
};

export default Profile;
