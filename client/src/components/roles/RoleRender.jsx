import React from "react";
import { ListItem, Avatar, ListItemText } from "@mui/material";

const RoleRender = ({ role, profile }) => {
  return (
    <ListItem className="role_listItem">
      <div className="role_header">
        <Avatar alt={profile.name} src={profile.image} />
        <ListItemText>{`${profile.name} ${profile.surname}`}</ListItemText>
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
  );
};

export default RoleRender
