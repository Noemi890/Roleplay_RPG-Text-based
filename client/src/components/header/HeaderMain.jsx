import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './header.css'
import { Avatar, Button, ClickAwayListener, Dialog, DialogContent } from '@mui/material'
import RenderList from "../profile/RenderList"

const Header = ({profiles, user, game = null}) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleProfilesClick = () => {
    setOpen(true)
  }

  const handleSwitchClick = (e, i) => {
    if (Boolean(profiles[i].gameId)) {
      navigate('/game', {state: {
        profiles,
        user: profiles[i]
      }})
      setTimeout(() => {
        setOpen(false)
      }, '500')
    }
    else {
      navigate('/main', {state: {
        profiles,
        user: profiles[i]
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
      </nav>
      {
        open && 
        <Dialog open={open}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <DialogContent>
              <RenderList profiles={profiles} handleClick={handleSwitchClick}/>
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
      }
    </div>
   </header>
  )
}

export default Header