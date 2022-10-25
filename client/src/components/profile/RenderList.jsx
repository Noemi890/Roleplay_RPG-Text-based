import React from "react";
import {
  ListItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

const RenderList = ({ profiles, handleClick, handleCreateNewProfile }) => {
  return (
    <List className="list_item">
      {profiles?.map((profile, i) => {
        return (
          <ListItem
            type="button"
            className="list_item_render"
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
      <div className="create_new_profile_btn">
        <Button
          className="nav_btn"
          variant="contained"
          onClick={handleCreateNewProfile}
          endIcon={<AddCircleTwoToneIcon />}
        >
          Create new profile
        </Button>
      </div>
    </List>
  );
};

export default RenderList;
