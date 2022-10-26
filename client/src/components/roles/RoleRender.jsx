import React from "react";
import { ListItem, Avatar, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

const RoleRender = ({ role = null, event = null }) => {
  const isRoleView = useLocation().pathname === '/role' ? true : false
  let name, surname, image, content

  if (role) {
    name = role?.author?.name
    surname = role?.author?.surname
    image = role?.author?.image
    content = role?.content
  }
  else {
    name = event?.profile?.name
    surname = event?.profile?.surname
    image = event?.profile?.image
    content = event?.content
  }

  console.log('rolerender',role)
  return (
    <ListItem className="role_listItem">
      <div className="role_header">
        <Avatar alt={name} src={image} />
        <ListItemText>{`${name} ${surname}`}</ListItemText>
      </div>
      <div className="role_title">
        {!isRoleView ? (
          <ListItemText>
            <strong>{role.title}</strong>
          </ListItemText>
        ) : <></>}
      </div>
      <div className="role_content">
        <ListItemText>{content}</ListItemText>
      </div>
    </ListItem>
  );
};

export default RoleRender;
