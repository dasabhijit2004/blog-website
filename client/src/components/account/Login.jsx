import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
  padding: 10px 0;
  width: 400px;
  margin: auto;
  margin-top: 5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #f7f9fc;
`;

const Image = styled('img')({
    width: 80,
    display: 'flex',
    margin: '30px auto 10px'
});

const Wrapper = styled(Box)`
  padding: 30px;
  display: flex;
  flex-direction: column;
  & > div, & > button, & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #1976d2;
  color: #fff;
  height: 45px;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    background-color: #1565c0;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #1976d2;
  height: 45px;
  border-radius: 6px;
  font-weight: 600;
  border: 1px solid #1976d2;
  &:hover {
    background-color: #f0f7ff;
  }
`;

const Text = styled(Typography)`
  color: #666;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 12px;
  color: #ff6161;
  margin-top: -10px;
  font-weight: 600;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Invalid credentials! Please try again.');
        }
    };

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Signup failed! Try again.');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
        setShowPassword(false);
        showError('');
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="logo" />
                {account === 'login' ? (
                    <Wrapper>
                        <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 600 }}>Login</Typography>

                        <TextField
                            variant="standard"
                            value={login.username}
                            onChange={onValueChange}
                            name='username'
                            label='Enter Username'
                        />

                        <TextField
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            value={login.password}
                            onChange={onValueChange}
                            name='password'
                            label='Enter Password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {error && <Error>{error}</Error>}

                        <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 600 }}>Sign Up</Typography>

                        <TextField
                            variant="standard"
                            onChange={onInputChange}
                            name='name'
                            label='Enter Name'
                        />

                        <TextField
                            variant="standard"
                            onChange={onInputChange}
                            name='username'
                            label='Enter Username'
                        />

                        <TextField
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            onChange={onInputChange}
                            name='password'
                            label='Enter Password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {error && <Error>{error}</Error>}

                        <SignupButton onClick={signupUser}>Sign Up</SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant="contained" onClick={toggleSignup}>Already have an account</LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;
