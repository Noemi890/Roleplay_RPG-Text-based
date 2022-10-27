import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  ClickAwayListener,
  TextField,
  Alert,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { initialResponse, initialRoleContent } from "../utils/constants";
import "./role.css";
import client from "../../client/client";
import RoleRender from "./RoleRender";
import { useEffect } from "react";

const RolesMain = ({ profile, game }) => {
  const [roles, setRoles] = useState([]);
  const [createRole, setCreateRole] = useState(initialRoleContent);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRole, setDeleteRole] = useState({});
  const [response, setResponse] = useState(initialResponse);

  const navigate = useNavigate();
  const location = useLocation();
  const profiles = location.state.profiles;

  useEffect(() => {
    client.get(`/roles/game/${game.id}`).then((res) => {
      setRoles(res.data.roles);
    });
    setCreateRole({
      ...initialRoleContent,
      gameId: game.id,
      profileId: profile.id,
    });
    //eslint-disable-next-line
  }, [response]);

  const handleCreateRoleClick = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    setCreateRole(initialRoleContent);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCreateRole({
      ...createRole,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    client
      .post("/role/create", createRole)
      .then((res) => {
        setResponse({
          ...response,
          success: {
            status: true,
            message: res.data.message,
          },
        });
        setTimeout(() => {
          setResponse(initialResponse);
          setCreateRole(initialRoleContent);
          setOpen(false);
        }, "2000");
      })
      .catch((error) => {
        setResponse({
          ...response,
          error: {
            status: true,
            message: error.response.data.message,
          },
        });
        setTimeout(() => {
          setResponse(initialResponse);
        }, "2000");
      });
  };

  const handleRoleClick = (e, i) => {
    navigate("/role", {
      state: {
        role: roles[i],
        profile,
        profiles,
        game,
      },
    });
  };

  const handleDeleteClickAway = () => {
    setDeleteOpen(false);
  };

  const handleDeleteClick = (e, role) => {
    setDeleteOpen(true);
    setDeleteRole(role);
  };

  const handleConfirmDelete = () => {
    console.log(deleteRole);
    client
      .delete(`/role/${deleteRole.id}`)
      .then((res) => {
        setResponse({
          ...response,
          success: {
            status: true,
            message: res.data.message,
          },
        });
        setTimeout(() => {
          setResponse(initialResponse);
          setDeleteOpen(false);
        }, "2000");
      })
      .catch((error) => {
        setResponse({
          ...response,
          error: {
            status: true,
            message: error.response.data.message,
          },
        });
        setTimeout(() => {
          setResponse(initialResponse);
          setDeleteOpen(false);
        }, "2000");
      });
  };

  return (
    <>
      <Dialog open={deleteOpen}>
        <ClickAwayListener onClickAway={() => handleDeleteClickAway()}>
          <div className="delete_dialog_container">
            <Typography>Are you sure you want to delete this role?</Typography>
            <Button variant="contained" onClick={handleConfirmDelete}>
              Confirm delete
            </Button>
          </div>
        </ClickAwayListener>
        <div className="alert_container">
        {response.success.status && (
          <Alert severity="success">{response.success.message}</Alert>
        )}
        {response.error.status && (
          <Alert severity="error">{response.error.message}</Alert>
        )}
      </div>
      </Dialog>
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
        <div className="alert_container">
        {response.success.status && (
          <Alert severity="success">{response.success.message}</Alert>
        )}
        {response.error.status && (
          <Alert severity="error">{response.error.message}</Alert>
        )}
      </div>
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
                  <RoleRender role={role} />
                </Button>
                {role.authorId === profile.id && (
                  <div className="delete_role_container">
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => handleDeleteClick(e, role)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RolesMain;
