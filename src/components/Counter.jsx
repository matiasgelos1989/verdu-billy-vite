import React from 'react'
import { useCart } from '../context/CartContext';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';


export const Counter = ( {cartItem}) => {

    const {  handleButtonCart } = useCart();
    
  return (  <div style={{display:'flex', textAlign:'center'}}>
  <RemoveCircleOutlinedIcon 
  sx={{cursor:'pointer'}} 
  color="error"
  onClick={(e)=>handleButtonCart(cartItem, -1)}
  fontSize='medium'
  />

   <label    
   style={{ 
     justifyContent:'center',
       display:'flex',
       width:'40px',
       fontWeight:'800',
       color: 'black',
       fontSize:'20px'
      }}>
         {cartItem.quantity}
       </label>
   
   <AddCircleOutlinedIcon 
   onClick={(e)=>handleButtonCart(cartItem, +1)}
   sx={{cursor:'pointer', size:'20px'}} 
   color="success"
   fontSize='medium'
   />

   </div>
  )
}
