import React from "react";
import { Logo } from '../logo';
import './Banner.css';
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

export const Banner = () => {
    return (
        <div id="banner-container">
            <Logo />
            <Link to='/'>
                <Button colorScheme='teal' variant='solid'>
                    Home
                </Button>
            </Link>
        </div>
    );
}; 