import React from "react";
import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Form = ({ details, handleChange }) => {
  const [show, setShow] = useState(false);

  const type = {
    text: 'text',
    password: 'password'
  }

  const handleShow = (e) => {
    e.preventDefault();
    console.log(show);
    setShow(!show);
  };

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
        type={show ? type.text : type.password}
        name="password"
        value={details.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShow}>
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default Form;
