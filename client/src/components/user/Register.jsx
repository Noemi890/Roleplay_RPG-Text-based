import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./user.css";
import Form from "./Form";
import { Link, Typography, Card, Button, Alert } from "@mui/material";
import { userInitialState } from "../utils/constants";
import client from "../../client/client";

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState(userInitialState);
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()

  const handleChangeRegister = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    client
      .post('/check', registerDetails)
      .then(res => {
        if(!res.data.user) {
          navigate('/profile/create', { state: {...registerDetails} })
        }
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, '3000')
      })
  }

  return (
    <div className="auth-form">
      <h1 className="landing_title">Welcome to RolePlay</h1>
      <Card>
        <form className="form_layout" onSubmit={handleSubmit}>
        <Form details={registerDetails} handleChange={handleChangeRegister} />
        <Button
          className="submit_btn"
          variant="contained"
          type="submit"
        >
          Set up your first character
        </Button>
        </form>
        <Typography className="login_href">
          Already an User? <Link href="/login">Login Here!</Link>
        </Typography>
        {alert && 
          <Alert severity="error">Email already in use</Alert>
        }
      </Card>
    </div>
  );
};

export default RegisterPage;
