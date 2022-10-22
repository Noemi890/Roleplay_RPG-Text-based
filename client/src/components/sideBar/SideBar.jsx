import React from "react"
import { Button } from "@mui/material"
import './sidebar.css'

const SideBar = ({ user, game = null }) => {


  return (
    <div className="side_bar">
      <nav className="side_nav">
        { game ?
          <>
            <Button className="nav_btn" variant="contained">Game Roles</Button>
            <Button className="nav_btn" variant="contained">Your open Roles</Button>
            <Button className="nav_btn" variant="contained">Ended Roles</Button>
            <Button className="nav_btn" variant="contained">Create Role</Button>
          </> : 
          <>
            <Button className="nav_btn" variant="contained">Explore Games</Button>
            <Button className="nav_btn" variant="contained">Create your Game</Button>
          </>
        }
      </nav>
    </div>
  )
}

export default SideBar