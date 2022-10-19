import React from "react"
import { useState } from "react"
import Form from "./Form"
import { Typography, Link, Card, Button } from "@mui/material"
import { userInitialState } from "../utils/constants";

const LoginPage = () => {
  const [loginDetails, setLoginDeatils] = useState(userInitialState)

  const handleLoginChange = (e) => {
    const name = e.name
    const value = e.value

    setLoginDeatils({
      [name]: [value]
    })
  }

  return (
    <div className="auth-form">
      <h1 className="landing_title">
        Welcome to RolePlay
      </h1>
      <Card>
        <Form details={loginDetails} handleChange={handleLoginChange}/>
        <Button variant="contained">
          Login
        </Button>
      </Card>
      <Typography className="login_href">
        Don't have an account? {' '}
        <Link href='/'>
          Sign Up Here!
        </Link>
      </Typography>
    </div>
  )
}

export default LoginPage