import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  ClickAwayListener,
  TextField,
  Alert,
} from "@mui/material";
import { initialRoleContent } from "../utils/constants";
import "./role.css";
import client from "../../client/client";
import RoleRender from "./RoleRender";

const RolesMain = ({ profile, game, setRoleCreated, roleCreated }) => {
  // const [roles, setRoles] = useState([]) 
  const [createRole, setCreateRole] = useState(initialRoleContent);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({
    success: {
      message: "",
      status: false,
    },
    error: {
      message: "",
      status: false,
    },
  });
  const navigate = useNavigate();
  const roles = game.roles
  const location = useLocation()
  const profiles = location.state.profiles

  const handleCreateRoleClick = () => {
    console.log(roles)
    setOpen(true);
  };

  const handleClickAway = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreateRole({
      ...createRole,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreateRole({
      ...createRole,
      gameId: game.id,
      profileId: profile.id,
    });

    client
      .post("/role/create", createRole)
      .then((res) => {
        console.log(res);
        setResponse({
          ...response,
          success: {
            status: true,
            message: res.data.message,
          },
        });
        setTimeout(() => {
          setResponse({
            ...response,
            success: { status: false },
          });
          setOpen(false);
          setRoleCreated(res.data.role);
        }, "3000");
      })
      .catch((error) => {
        console.log(error);
        setResponse({
          ...response,
          error: {
            status: true,
            message: error.response.data.message,
          },
        });
        setTimeout(() => {
          setResponse({
            ...response,
            error: { status: false },
          });
        }, "3000");
      });
  };

  const handleRoleClick = (e, i) => {
    navigate("/role", { state: { 
      role: roles[i], 
      profile,
      profiles,
      game 
      } 
    });
  };

  return (
    <>
      <Dialog open={open}>
        <ClickAwayListener onClickAway={() => handleClickAway()}>
          <form className="create_role_form" onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              label="title"
              name="title"
              sx={{ width: "25rem" }}
              value={createRole.title}
              onChange={handleChange}
            />
            <TextField
              multiline
              variant="standard"
              label="content"
              name="content"
              sx={{ width: "25rem" }}
              value={createRole.content}
              onChange={handleChange}
            />
            <Button type="submit" className="nav_btn" variant="contained">
              Create
            </Button>
          </form>
        </ClickAwayListener>
        {response.success.status && (
          <Alert severity="success">{response.success.message}</Alert>
        )}
        {response.error.status && (
          <Alert severity="error">{response.error.message}</Alert>
        )}
      </Dialog>
      <div className="listItem_wrap">
        <div className="create_role_wrap">
          <Button
            size="large"
            className="nav_btn"
            variant="contained"
            onClick={handleCreateRoleClick}
          >
            Create Role
          </Button>
        </div>
        {roles &&
          roles.map((role, i) => {
            return (
              <div className="role_wrap" key={i}>
                <Button
                  variant="none"
                  sx={{ width: "-webkit-fill-available" }}
                  onClick={(e) => handleRoleClick(e, i)}
                >
                  <RoleRender role={role} i={i} profile={profile} />
                </Button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RolesMain;
