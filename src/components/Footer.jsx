import React from 'react'
import Paper from '@mui/material/Paper';

export const Footer = () => {
  return (
    <Paper elevation={10} 
    sx={{
      marginTop: 'calc(10% + 60px)',
      position: 'fixed',
      bottom: 0,
      padding: 2,
      width: '100%',
      textAlign:'center',
      backgroundColor: 'black',
      
  }}>
  </Paper>
  )
}

