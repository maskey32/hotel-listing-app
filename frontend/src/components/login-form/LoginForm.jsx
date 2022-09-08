import React, { useRef, useState, useEffect, useContext } from "react";
import { Input, InputGroup, InputRightElement, Button, Stack } from '@chakra-ui/react';
import './LoginForm.css';
import { Account } from '../account';
import { Submit } from '../submit';
import api from '../../api/axios'
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = '/api/user/login';

export const  LoginForm = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const { loggedIn, login, token, name, userId } = useAuth();

    useEffect(() => {
        console.log("--- initial state", {
          name,
          userId,
          token,
          loggedIn,
        });
      }, []);

      useEffect(() => {
        if (loggedIn) {
          console.log("--- user loged in", {
            name,
            userId,
            token,
            loggedIn,
          });
          navigate("/dashboard", { replace: true });
        }
      }, [loggedIn]);

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = () => {
        const userDetails = {
            "email": email,
            "password": password
        };
        
        api.post(LOGIN_URL, userDetails)
        .then((res) => {
            if (res.status === 200) {
                const name = res.data.User.fullname;
                const userId = res.data.User.id;
                const token = res.data.token;
                console.log(name);
                console.log(userId);
                console.log(token);
                
                console.log(loggedIn);
                login(name, userId, token);



    
        console.log(login);
        console.log(loggedIn);

            }
        }).catch((err) => {
            if (err) {
                console.log('the err', err['response']['data']['message'])
                const theError = err['response']['data']['message']
                setErrMsg(theError);
            }

        })
        setEmail("");
        setPassword("");
    }

    const handleClear = () => {
        setEmail("");
        setPassword("");
    }
  
    return (
        <div id="login-wrapper">
            <div id="login-background">
            <Stack spacing={4}>
                <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={'email'}
                    placeholder='Enter email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </InputGroup>
                <InputGroup size='md'>
                    <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                    </InputRightElement>
                </InputGroup>
            </Stack> 
                    <Submit name="Log In" handler={handleLogin}/>
                    <Button onClick={handleClear}>Clear</Button>
            </div>
            <Account text="Don't have an account?" type="Sign up"/>
        </div>
    )
  }