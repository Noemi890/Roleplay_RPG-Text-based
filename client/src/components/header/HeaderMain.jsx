import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import './header.css'
import { Avatar, Button, ClickAwayListener, Dialog, DialogContent } from '@mui/material'
import RenderList from "../profile/RenderList"
import client from "../../client/client"
import { tokenKey } from "../../client/client"

const Header = ({ user, game = null}) => {
  const [open, setOpen] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [newProfile, setNewProfile] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    client
      .get(`/user/${location.state.profile.userId}/profiles`)
      .then(res => {
        setProfiles(res.data.profiles)
      })
    //eslint-disable-next-line
  }, [newProfile])

  const handleProfilesClick = () => {
    setOpen(true)
  }

  const handleCreateNewProfile = () => {
    navigate('/profile/create', { state: {id : user.userId} })
  }

  const handleLogOutClick = () => {
    localStorage.setItem(tokenKey, '')
    navigate('/login', {replace: true})
  }

  const handleSwitchClick = (e, i) => {
    if (Boolean(profiles[i].gameId)) {
      navigate('/game', {state: {
        profile: profiles[i],
        profiles
      }})
      setTimeout(() => {
        setOpen(false)
      }, '500')
    }
    else {
      navigate('/main', {state: {
        profile: profiles[i],
        profiles
      }})
    setTimeout(() => {
      setOpen(false)
    }, '500')
    }
  }

  return (
   <header>
    <div className="header">
      <div className="title_logo_container">
      <h3 className="main_title">&copy;RolePlay</h3>
      <Avatar sx={{ width: 56, height: 56 }} alt={user.name} src={user.image}/>
      </div>
      {
        game && 
        <h2 className="RPG_title">{`${game?.title} RPG`}</h2>
      }
      <nav>
        <Button className="nav_btn" variant="contained" onClick={handleProfilesClick}>Profiles</Button>
        <Button className="nav_btn" variant="contained" onClick={handleLogOutClick}>log out</Button>
      </nav>
      {
        open && 
        <Dialog open={open} scroll="body" >
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <DialogContent>
              <RenderList profiles={profiles} handleClick={handleSwitchClick} handleCreateNewProfile={handleCreateNewProfile}/>
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
      }
    </div>
   </header>
  )
}

export default Header