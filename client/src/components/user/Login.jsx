import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { Typography, Link, Card, Button, Alert } from "@mui/material";
import { userInitialState, initialErrorState } from "../utils/constants";
import client from "../../client/client";
import { tokenKey } from "../../client/client";
import { loggedInUser } from "../../App";

const LoginPage = () => {
  const { onLogin } = useContext(loggedInUser);
  const [loginDetails, setLoginDetails] = useState(userInitialState);
  const [error, setError] = useState(initialErrorState);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
      client
        .post("/login", {...loginDetails})
        .then((res) => {
          localStorage.setItem(tokenKey, res.data.token);
          const user = res.data.user;
          onLogin(user);
          navigate("/profile/select", {
            state: {
              id: user.id
            },
          });
        })
      .catch (error => {
      setError({
        error: true,
        message: error.response.data.error,
      });
      setTimeout(() => {
        setError(initialErrorState);
      }, "3000");
    })
  };

  return (
    <div className="auth-form">
      <h1 className="landing_title">Welcome to RolePlay</h1>
      <Card>
        <form className="form_layout" onSubmit={handleSubmit}>
          <Form details={loginDetails} handleChange={handleLoginChange} />
          <Button className="submit_btn" variant="contained" type="submit">
            Login
          </Button>
          <Typography className="login_href">
            Don't have an account? <Link href="/">Sign Up Here!</Link>
          </Typography>
        </form>
      </Card>
      {error.error && <Alert severity="error">{error.message}</Alert>}
    </div>
  );
};

export default LoginPage;
