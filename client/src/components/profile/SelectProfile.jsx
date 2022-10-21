import React from "react"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Avatar, Dialog, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import './profile.css'
import client from "../../client/client"


const SelectProfile = () => {
  const [profiles, setProfiles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    client
      .get('/profiles')
      .then(res => {
        console.log(res.data.profiles)
        setProfiles(res.data.profiles)
      })
  //eslint-disable-next-line
  }, [])

  return (
    <>
    <h2 className="profile_select_title">Select your Character</h2>
    <Dialog className="select_profile_dialog" open={true}>
      <List>
      {
        profiles.map((profile, i) => {
          return (
            <>
            <ListItem 
              key={i}
            />
            <ListItemButton>
            <ListItemAvatar>
              <Avatar alt={profile.name} src={profile.image ? profile.image : ""}/>
            </ListItemAvatar>
            <ListItemText primary={`${profile.name} ${profile.surname}`}/>
            </ListItemButton>
            </>
          )
        })
      }
      </List>
    </Dialog>
    </>
  )
}

export default SelectProfile