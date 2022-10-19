import React from "react";
import { useState } from "react";
import "./user.css";
import Form from "./Form";
import { Link, Typography, Card, Button } from "@mui/material";
import { userInitialState } from "../utils/constants";

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState(userInitialState);

  const handleChangeRegister = (e) => {
    const name = e.name
    const value = e.value

    setRegisterDetails({
      [name]: [value]
    })
  }

  return (
          <div className="auth-form">
            <h1 className="landing_title">
              Welcome to RolePlay
            </h1>
            <Card>
              <Form details={registerDetails} handleChange={handleChangeRegister} isRegister={true}/>
              <Button variant="contained">
                Set up your first profile
              </Button>
            </Card>
            <Typography className="login_href">
              Already an User? {' '}
              <Link href='/login'>
                Login Here!
              </Link>
            </Typography>
          </div>
  );
};

export default RegisterPage;
