import React from "react"
import { Card, TextField, Button } from "@mui/material"

const Form = (details, handleChange) => {
  return (
    <>
        <TextField
          required
          className="form_register"
          variant="standard"
          label="email"
          name="email"
          value={details.email}
          onChange={handleChange}
        />
        <TextField
          required
          className="form_register"
          variant="standard"
          label="password"
          type="password"
          name="password"
          value={details.password}
          onChange={handleChange}
        />
    </>
  )
}

export default Form