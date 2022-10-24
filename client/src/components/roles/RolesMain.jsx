import React from "react";
import { useState } from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  ClickAwayListener,
  TextField,
  Alert,
} from "@mui/material";
import { initialRoleContent } from "../utils/constants";
import "./role.css";
import client from "../../client/client";

const RolesMain = ({
  user,
  game,
  setRoleCreated
}) => {
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

  const handleCreateRoleClick = () => {
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
      profileId: user.id,
    });

    client
      .post("/role/create", createRole)
      .then((res) => {
        console.log(res);
        setResponse({
          ...response,
          success: { status: true },
        });
        setTimeout(() => {
          setResponse({
            ...response,
            success: { status: false },
          });
          setOpen(false);
          setRoleCreated(res.data);
        }, "3000");
      })
      .catch((error) => {
        setResponse({
          ...response,
          error: { status: true },
        });
        setTimeout(() => {
          setResponse({
            ...response,
            error: { status: false },
          });
        }, "3000");
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
              sx={{ width: "30rem" }}
              value={createRole.title}
              onChange={handleChange}
            />
            <TextField
              multiline
              variant="standard"
              label="content"
              name="content"
              sx={{ width: "30rem" }}
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
        {game.roles &&
          game.roles.map((role, i) => {
            return (
              <div className="role_wrap" key={i}>
                <ListItem className="role_listItem">
                  <div className="role_header">
                    <Avatar alt={user.name} src={user.image} />
                    <ListItemText>{`${user.name} ${user.surname}`}</ListItemText>
                  </div>
                  <div className="role_title">
                    <ListItemText>
                      <strong>{role.title}</strong>
                    </ListItemText>
                  </div>
                  <div className="role_content">
                    <ListItemText>{role.content}</ListItemText>
                  </div>
                </ListItem>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default RolesMain;
