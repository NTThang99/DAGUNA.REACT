import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useAuth from "./UseAuth";

export default function SocialIcons() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(null);


  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate("/login");
  };
  const handleClickShowLogout = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClickLogout = (evt)=>{
    localStorage.removeItem("user");
    setUser(null)
    handleClose();
    navigate("/");
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
    setUser(localStorage.getItem("user") || null);
  }, [localStorage.getItem("user")])


  return (
    <>
      <div className="d-inline-flex align-items-center py-2">
        {
          user == null ? (
            <Button
              id="basic-button"
              className="me-3"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ fontSize: '20px', color: '#FEA116 ', fontWeight: 700 }}
            >
              Login
            </Button>
          ) :
            (
              <>
                <Button
                  id="basic-button"
                  className="me-3"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickShowLogout}
                  sx={{ fontSize: '20px', color: '#FEA116 ', fontWeight: 700 }}
                >
                 <i class="fa-solid fa-user"></i>
                </Button><Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                </Menu>
              </>)
        }
      </div>
    </>
  );
}
