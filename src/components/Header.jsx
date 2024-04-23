import React from "react";
import { useState ,useEffect} from "react";
import { Link ,useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { IconCart } from "../components/IconCart";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export const Header = () => {
  
  const {  isUserLogged,logout, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
        login(isAuthenticated)
    }
}, []);

const handleLogout = () => {
    logout();
    navigate('/')
}

  return (
      <div
        style={{
          backgroundColor: "black",
          color: "black",
          position: "static",
        }}
      >
        <Toolbar>
      
            
            
            {isUserLogged ?<> 
                <Tooltip fontSize='small' title="Panel admin" arrow>
                    <Link to='/panel'>
                        <Button color="inherit">
                          <ManageAccountsIcon fontSize="large" color='default' />
                        </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip fontSize='small' title="pedidos" arrow>
                  <Link to='/pedidos'>
                      <Button color="inherit">
                        <FormatListNumberedIcon fontSize="large" color='default' />
                      </Button>
                  </Link>
                </Tooltip>
              </>
            : ''}
            {!isUserLogged ?
            <>
              <Tooltip fontSize='large' title="Home" arrow>
              <Link to="/">
                <IconButton aria-label="home">
                  <HomeIcon fontSize="large" sx={{color:"white"}} />
                </IconButton>
              </Link>
            </Tooltip>
                <Tooltip fontSize='small' title="Login administrador" arrow>
                  <Link to='/login'>
                      <Button >
                        <LoginIcon sx={{color:'white'}} />
                      </Button>
                  </Link>
                </Tooltip>
                </>
                :
                <Tooltip fontSize='small' title="Logout" arrow>
                  <Link to='/'>
                      <Button onClick={handleLogout} >
                        <LogoutIcon sx={{color:'white'}}/>
                      </Button>
                  </Link>
                </Tooltip>
               
          }
        <div style={{padding:'10px',color:'white',margin:'auto', fontFamily:'courier new', minWidth:'max-content'}}>
            <div style={{border:'1px solid white',padding:'0px 5px'}}>
              <h3 style={{margin:'15px 0px'}}>Lo De Billy</h3>
            </div>
          </div>
          {!isUserLogged ?
          <Tooltip title="Carrito" arrow>
              <Link to="/Cart">
                <IconButton aria-label="cart">
                  <IconCart/>
                </IconButton>
              </Link>
            </Tooltip>
          : ''}
        </Toolbar>
      </div>
  );
};
