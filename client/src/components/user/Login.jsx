import React from "react";
import { useState } from "react";
import Form from "./Form";
import { Typography, Link, Card, Button } from "@mui/material";
import { userInitialState } from "../utils/constants";
import client from "../../client/client";

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState(userInitialState);

  const handleLoginChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(loginDetails);
  };

  return (
    <div className="auth-form">
      <h1 className="landing_title">Welcome to RolePlay</h1>
      <Card>
        <Form details={loginDetails} handleChange={handleLoginChange} />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Card>
      <Typography className="login_href">
        Don't have an account? <Link href="/">Sign Up Here!</Link>
      </Typography>
    </div>
  );
};

export default LoginPage;
