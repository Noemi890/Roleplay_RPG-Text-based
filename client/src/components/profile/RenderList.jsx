import React from "react";
import {
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const RenderList = ({ profiles, handleClick }) => {
  return (
    <List>
      {profiles?.map((profile, i) => {
        return (
          <ListItem
            sx={{ cursor: "pointer" }}
            key={i + 1}
            onClick={(e) => handleClick(e, i)}
          >
            <ListItemAvatar>
              <Avatar
                alt={profile.name}
                src={profile.image ? profile.image : ""}
              />
            </ListItemAvatar>
            <ListItemText primary={`${profile.name} ${profile.surname}`} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default RenderList;
