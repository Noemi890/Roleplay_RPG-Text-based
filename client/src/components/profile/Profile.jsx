import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import { userProfileCreation } from "../utils/constants";
import {
  Card,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const Profile = () => {
  const [userAndProfile, setUserAndProfile] = useState({});
  const [radioType, setRadioType] = useState("text");

  const imageType = {
    file: "file",
    text: "text",
  };

  const upload = radioType === imageType.file;

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    if (!location.state) {
      setUserAndProfile(userProfileCreation);
    }
    setUserAndProfile({
      ...location.state,
      ...userProfileCreation,
    });
    // eslint-disable-next-line
  }, []);

  const handleRadioChange = (e) => {
    const value = e.target.value;

    setRadioType(value);
  };

  return (
    <div className="auth-form">
      <h2 className="profile_creation_title">Create your new Profile</h2>
      <Card>
        <TextField
          required
          variant="standard"
          className="profile_creation_input"
          label="name"
        />
        <TextField
          required
          variant="standard"
          className="profile_creation_input"
          label="surname"
        />
        <RadioGroup row value={radioType} onChange={handleRadioChange}>
          <FormControlLabel value="text" control={<Radio />} label="URL" />
          <FormControlLabel value="file" control={<Radio />} label="File" />
        </RadioGroup>
        <TextField
          variant="standard"
          className="profile_creation_input"
          type={upload ? imageType.file : imageType.text}
          label="image"
        />
        <TextField 
          variant="standard" 
          className="profile_creation_input"
          label="race"
        />
        <TextField 
          variant="standard" 
          className="profile_creation_input"
          label="age"
        />
        <TextField
          multiline
          variant="standard"
          className="profile_creation_input"
          label="biography"
        />
      </Card>
    </div>
  );
};

export default Profile;
