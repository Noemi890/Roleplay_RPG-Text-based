import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./user.css";
import Form from "./Form";
import { Link, Typography, Card, Button } from "@mui/material";
import { userInitialState } from "../utils/constants";

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState(userInitialState);
  const navigate = useNavigate()

  const handleChangeRegister = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
  };

  return (
    <div className="auth-form">
      <h1 className="landing_title">Welcome to RolePlay</h1>
      <Card>
        <Form details={registerDetails} handleChange={handleChangeRegister} />
        <Button 
          variant="contained"
          onClick={() => navigate('/profile/create', { state: {...registerDetails} })}
        >
          Set up your first profile
        </Button>
      </Card>
      <Typography className="login_href">
        Already an User? <Link href="/login">Login Here!</Link>
      </Typography>
    </div>
  );
};

export default RegisterPage;
