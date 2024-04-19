import React, { useState } from "react";
import { Button, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as logUser } from '../api/products.api'; //renombramos para que no entre en conficto con el login del contexto

export const Login = ({ onLogin }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        try {
            const response = await logUser({ email: loginData.email, password: loginData.password });
            const { token } = response.data;

            // Guardamos en localstorage el token
            localStorage.setItem('token', token);

            // Notificar login correcto
            login(token)
            navigate('/panel')
        } catch (error) {
            if (error.response.status === 401) {
                alert("Login fallido, por favor intente nuevamente")
            } else {
                console.error('Login fallido por otros motivos', error);
                // Manejamos el error de login
            }
        }
    };

    return (
        <Container sx={{ marginTop: '20px' }}>
            <h4>Por favor, para acceder, identifíquese</h4>
            <form >
                <TextField fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                />
                <TextField fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    type='password'
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />
                <Button variant='contained' onClick={() => handleLogin()} sx={{ mt: 2 }}>
                    Login
                </Button>
            </form>
        </Container>
    );
};

