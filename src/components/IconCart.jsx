import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import Badge from '@mui/material/Badge';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 28,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



export const IconCart = () => {
  
  const { setShowCart, showCart, cart } = useCart();

  const showHide = () => {
    if(showCart){
    setShowCart(false)
    } else {
      if(cart.length > 0){
      setShowCart(true)
    }}
  }

  
  

  return (<div>
    <IconButton onClick={showHide} aria-label="cart">
    <StyledBadge badgeContent={cart.length} color="secondary">
      <ShoppingCartIcon fontSize='large' sx={{color:'white'}} />
    </StyledBadge>
  </IconButton>
  </div>
  )
}