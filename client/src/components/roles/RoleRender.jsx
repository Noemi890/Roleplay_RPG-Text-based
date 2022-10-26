import React from "react";
import { ListItem, Avatar, ListItemText } from "@mui/material";

const RoleRender = ({ role, profile = null }) => {
  console.log(role)
  const name = !profile ? role.profile?.name : profile.name
  const surname = !profile ? role.profile?.surname : profile.surname
  const image = !profile ? role.profile?.image : profile.image
  
  return (
    <ListItem className="role_listItem">
      <div className="role_header">
        <Avatar alt={name} src={image} />
        <ListItemText>{`${name} ${surname}`}</ListItemText>
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
