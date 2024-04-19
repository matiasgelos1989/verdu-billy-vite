import React, { useState } from 'react'
import {register} from '../api/products.api'
import { Button, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const RegisterUser = () => {

    const [user,setUser] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate ();
    
    const createUser = () => {
        register(user).then((response) => {
            if (response.data) {
                alert(`Se ha creado el usuario con éxito ! email: ${user.email} y password: ${user.password} `);
                navigate('/');
            }
        }).catch((error) => {
            alert(error);
        });
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

  return (
    <Container sx={{ marginTop: '20px' }}>
    <h4>Por favor, ingrese los datos para crear un usuario</h4>
    <form >
        <TextField fullWidth
            label="Email"
            margin="normal"
            name="email"
            type='email'
            value={user.email}
            onChange={handleChange}
            required
        />
        <TextField fullWidth
            label="Password"
            margin="normal"
            name="password"
            type='password'
            value={user.password}
            onChange={handleChange}
            required
        />
        <Button variant='contained' onClick={() => createUser()} sx={{ mt: 2 }}>
            Registrar usuario nuevo
        </Button>
    </form>
</Container>
  )
}
