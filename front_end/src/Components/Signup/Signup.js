import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useContext, useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

import { authContext } from "../../App";
import axios from "axios"

export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);

    const { setAuth } = useContext(authContext);
    const navigate = useNavigate();



    const [signupError, setSignupError] = useState(null);



    const nav = () => {
        navigate("/"); // Omit optional second argument
    };

    useEffect(() => {
        // Check if a token is already stored in sessionStorage
        const token = sessionStorage.getItem("token");

        if (token) {
            // If a token exists, redirect the user to the dashboard
            nav('/');
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // setFormData({
        //     username: data.get('username'),
        //     password: data.get('password')
        // });

        if (!data.get('password') || !data.get('username')) {
            setSignupError('بعضی از فیلد ها خالی است');
            return;
        }

        try {

            const payload = JSON.stringify({
                password:data.get('password'),
                username:data.get('username'),
                email:data.get('email'),
                first_name:data.get('first-name'),
                last_name:data.get('last-name'),
            });
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:8000/auth/signup/', payload,customConfig);
            if (response.status === 200) {

                // sessionStorage.setItem("user", response.data.id);
                // sessionStorage.setItem("token", response.data.token);
                // console.log(sessionStorage.getItem('token'))
                // console.log('Login successful');
                // setAuth(true);
                nav();

            } else {
                // Handle authentication error
                setSignupError('نام کاربری یا کلمه عبور اشتباه است');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            // console.error('Login error:', error);
            setSignupError('نام کاربری یا کلمه عبور اشتباه است');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                {/*<Avatar sx={{m: 1, bgcolor: '232F34'}}>*/}
                {/*    <LockOutlinedIcon/>*/}
                {/*</Avatar>*/}
                <Typography component="h1" variant="h5">
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="first-name"
                        label="نام"
                        name="first-name"
                        autoComplete="first-name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="last-name"
                        label="نام خانوادگی"
                        name="last-name"
                        autoComplete="last-name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="ایمیل"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="نام کاربری"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="رمز عبور"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)} // Toggle the state
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            borderRadius: '20px',
                            color: 'white'
                        }}
                    >
                        ثبت نام
                    </Button>
                    {signupError && (
                        <Typography variant="body2" color="error" align="center">
                            {signupError}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
}