import React, { useEffect, useState} from "react";
import { Input, InputGroup, InputRightElement, Button, Stack } from '@chakra-ui/react';
import './Register.css';
import { Account } from '../account';
import { Submit } from '../submit';
import api from '../../api/axios'
import { useNavigate } from "react-router-dom";

export const  RegisterForm = () => {
    const navigate = useNavigate();

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [inputs, setInputs] = useState({
        fullname: "", email: "", phoneNumber: "", password: "", confirm_password: "" 
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }

    console.log(inputs);

    const handleClear = () => {
        setInputs("");
    }

    const handleSubmit = () => {
       api.post('/api/user/create', inputs)
       .then((res) => {
        console.log('yes ress' + res);
        if (res.status === 200) {
            navigate('/signin')
        }
       }).catch((err) => {
        console.log(err);
       })
       setInputs("")
    console.log('---submit clicked' + inputs);
    }
  
    return (
        
        <div id="register-wrapper">
            <div id="register-background">
            
            <Stack spacing={4}>
                <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={'text'}
                    placeholder='Enter name'
                    name='fullname'
                    value={inputs.fullname || ""}
                    onChange={handleInput}
                    required/>
                </InputGroup>
                <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={'email'}
                    placeholder='Enter email'
                    name='email'
                    value={inputs.email || ""}
                    onChange={handleInput}/>
                </InputGroup>
                <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={'tel'}
                    placeholder='Enter phone number'
                    name='phoneNumber'
                    value={inputs.phoneNumber || ""}
                    onChange={handleInput}/>
                </InputGroup>
                <InputGroup size='md'>
                    <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    name='password'
                    value={inputs.password || ""}
                    onChange={handleInput}/>
                    <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup size='md'>
                    <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Confirm password'
                    name='confirm_password'
                    value={inputs.confirm_password || ""}
                    onChange={handleInput}/>
                    <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                    <Submit name="Register" handler={handleSubmit}/>
                    <Button type="submit" onClick={handleClear}>Clear</Button>
            </Stack>
            </div>
            <Account text="Already have an account?" type="Sign in" id="account-section"/>
        </div>
    )
  }