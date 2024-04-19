import React , {useEffect} from "react";
// import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { IconCart } from "./IconCart";

export const Header = () => {

  const { isUserLogged, logout, login } = useAuth();
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
    <div sx={{ flexGrow: 1, position:'sticky',width:'100%',top:0, zIndex:99}}>
      <div
        style={{
          backgroundColor: "black",
          color: "black",
          position: "static",
        }}
      >
        <Toolbar>
            <Typography variant="h3" component="div" sx={{ flexGrow: 0, display:'flex' }}>
            
            
          
            <Tooltip fontSize='small' title="Home" arrow>
              <Link to="/">
                <IconButton aria-label="home">
                  <HomeIcon fontSize="large" sx={{color:"white"}} />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip fontSize='small' title="Carrito" arrow>
              <Link to="/Cart">
                <IconButton aria-label="cart">
                  <IconCart fontSize="small" />
                </IconButton>
              </Link>
            </Tooltip>
            </Typography>
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
                <Tooltip fontSize='small' title="Login administrador" arrow>
                  <Link to='/login'>
                      <Button >
                        <LoginIcon sx={{color:'white'}} />
                      </Button>
                  </Link>
                </Tooltip>
                :
                <Tooltip fontSize='small' title="Logout" arrow>
                  <Link to='/'>
                      <Button onClick={handleLogout} >
                        <LogoutIcon sx={{color:'white'}}/>
                      </Button>
                  </Link>
                </Tooltip>
          }
        <div style={{padding:'10px',color:'white', margin:'auto', fontFamily:'courier new', fontSize:'16px'}}>
            <div style={{border:'1px solid white',padding:'0px 20px'}}>
              <h2>Lo De Billy</h2>
            </div>
          </div>
        </Toolbar>
      </div>
    </div>
  );
};
